import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import User from "@/models/userModel";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    const user = await User.findById(decodedToken.id).select("_id isAdmin");
    if (!user) throw new Error("User not found");

    return { _id: user._id.toString(), isAdmin: user.isAdmin };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
