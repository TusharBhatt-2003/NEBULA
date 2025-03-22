import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import User from "@/models/userModel";

interface DecodedToken extends JwtPayload {
  id: string;
}

interface UserData {
  _id: string;
  isAdmin: boolean;
}

export const getDataFromToken = async (
  request: NextRequest,
): Promise<UserData> => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!,
    ) as DecodedToken;

    const user = await User.findById(decodedToken.id).select("_id isAdmin");
    if (!user) {
      throw new Error("User not found");
    }

    return { _id: user._id.toString(), isAdmin: user.isAdmin };
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "Token verification failed");
  }
};
