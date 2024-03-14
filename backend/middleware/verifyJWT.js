import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { generateAccessTokenForRefreshing } from "../utils/generateAccessAndRefreshToken.js";
export const verifyJWT = async (req, res, next) => {
  try {
    const token = await req.cookies?.accessToken;

    // if token is not present

    if (!token) {
      console.log("NO ACCESS TOKEN (VERIFY JWT)");

      return res.status(401).json({
        status: false,
        message: "Unauthorized request",
      });
    }

    // if token present verify it

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken",
    );

    // if user not find (Invalid token)
    if (!user) {
      console.log("INVALID ACCESS TOKEN (VERIFY JWT)");
      return res.status(401).json({
        status: false,
        message: "Invalid Acces Token ",
      });
    }
    req.user = user;

    next();
  } catch (err) {
    // if refresh token present refresh the accessToken

    try {
      const token = await req.cookies?.refreshToken;

      // if refresh token not present
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized request",
        });
      }

      // if refresh token present verify it
      const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken",
      );

      if (!user) {
        return res.status(401).json({
          status: false,
          message: "Invalid Refresh Token  ",
        });
      }

      // refresh token in valid  refresh the accessToken

      const { accessToken } = await generateAccessTokenForRefreshing(user._id);
      if (!accessToken) {
        return res.status(500).json({
          status: false,
          message: "Internal sever error while generating access token",
        });
      }

      const options = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("accessToken", accessToken, options);
      console.log(" NEW TOKENS ARE GENERATED SUCCESSFULLY");

      req.user = user;
      next();
    } catch (err) {
      console.log("Error in verifyJWT " + err);
      return res.status(401).json({
        status: false,
        message: "RefreshToken in expired",
      });
    }
  }
};
