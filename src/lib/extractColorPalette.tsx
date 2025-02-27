export async function extractColorPalette(
  imageSrc: string,
  colorCount: number = 5,
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Ensure CORS is handled
    img.src = imageSrc;

    img.onload = () => {
      console.log("Image loaded successfully");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Failed to get canvas context");
        reject("Failed to get canvas context");
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      console.log("Image data extracted:", imageData.length);

      const colorMap: { [key: string]: number } = {};

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const color = `rgb(${r},${g},${b})`;
        colorMap[color] = (colorMap[color] || 0) + 1;
      }

      const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, colorCount)
        .map(([color]) => color);

      console.log("Extracted colors:", sortedColors);
      resolve(sortedColors);
    };

    img.onerror = () => {
      console.error("Failed to load image");
      reject("Failed to load image");
    };
  });
}
