import User from "../models/userModel.js";
import crypto from "crypto";

// <-------------- Generate Access Token And Refresh Token --------------->

export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generate_Access_Token();
    const refreshToken = await user.generate_Refresh_Token();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    console.log("Error while generating refresh and access token " + err);
    return "Something went wrong while generating refresh and access token ";
  }
};

// <------------------ Generate Access token for refreshing ------------------------->

export const generateAccessTokenForRefreshing = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generate_Access_Token();
    user.accessToken = accessToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (err) {
    console.log("Error while generating  access token " + err);
    return "Something went wrong while generating  access token ";
  }
};

// <---------------- Generate Temporary token for email verification --------------------->
export const generateTemporaryToken = () => {
  // This token should be client facing
  // for example: for email verification unHashedToken should go into the user's mail
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  // This is the expiry time for the token (20 minutes)
  const tokenExpiry = Date.now() + 20 * 60 * 1000;

  return { unHashedToken, hashedToken, tokenExpiry };
};
