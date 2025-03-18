import { NextApiRequest, NextApiResponse } from "next";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res
      .status(400)
      .json({ safe: false, error: "No image URL provided" });
  }

  try {
    // Extract base64 content
    const base64Data = imageUrl.split(",")[1]; // After "data:image/png;base64,..."
    const buffer = Buffer.from(base64Data, "base64");

    const [result] = await client.safeSearchDetection({
      image: { content: buffer },
    });
    const detection = result.safeSearchAnnotation;

    const isSafe =
      detection?.adult !== "LIKELY" &&
      detection?.adult !== "VERY_LIKELY" &&
      detection?.violence !== "VERY_LIKELY" &&
      detection?.racy !== "VERY_LIKELY";

    res.status(200).json({ safe: isSafe });
  } catch (error) {
    console.error("Moderation Error:", error);
    res.status(500).json({ safe: false, error: "Moderation failed" });
  }
}
