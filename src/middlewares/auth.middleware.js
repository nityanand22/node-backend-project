import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../modals/user.modal";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken || req.headers?.Authorization?.split(" ")[1];
    if (!accessToken) {
      return res.json(
        new ApiResponse(401, null, "Unauthorized: No token provided")
      );
    }
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.json(
        new ApiResponse(401, null, "Unauthorized: User not found")
      );
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized: Invalid token");
  }
});
