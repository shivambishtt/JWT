import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async function (userId) {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      "Something went wrong while generating the refresh and access token",
      500
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (
    [fullname, email, password].some((field) => {
      field.trim() === "";
    })
  ) {
    throw new apiError("All fields are required", 401);
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    // return res
    //   .status(401)
    //   .json(new apiError("User with this email is already registered"));
    throw new apiError("User with this email is already registered", 401);
  }
  const user = await User.create({
    fullname,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new apiResponse("User successfully registered", 200, createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required to login ");
  }
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new apiError("User does not exist please register first", 404);
  }
  const isPasswordValid = await userExist.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError("Invalid credentials", 401);
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(userExist._id);

  const loggedinUser = await User.findById(userExist._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse("User successfully logged in", 200, loggedinUser));
});
export { registerUser, loginUser };
