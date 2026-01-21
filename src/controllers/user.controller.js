import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../modals/user.modal.js";
import { uploadImage } from "../utils/cloudinery.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (user) {
    throw new ApiError(409, "User aleady exists.");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar field is required.");
  }

  const avatar = await uploadImage(avatarLocalPath);
  const coverImage = await uploadImage(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const newUser = await User.create({
    fullName,
    avatar: avatar.secure_url,
    coverImage: coverImage?.secure_url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something Went Wrong");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created Successfully"));
});

export { registerUser };
