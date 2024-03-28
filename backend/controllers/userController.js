import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import { generateAccessAndRefreshToken } from "../utils/generateAccessAndRefreshToken.js";
import { sendEmailToUser } from "../utils/mail.js";
import crypto from "crypto";
import validator from "validator";
//<----------------------------------- SIGNUP USER ------------------------------------->
export const signupUser = async (req, res) => {
  try {
    const {
      userName,
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      role,
    } = req.body;

    // check field is empty
    if (
      !userName ||
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // compare password not match confirm password

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Password not match confirmPassword",
      });
    }

    // check if email or userName alreday used

    const existedUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existedUser) {
      return res.status(409).json({
        status: false,
        message: "User with email or username already exists",
      });
    }

    // profile pic set
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // create User
    const newUser = new User({
      fullName,
      userName,
      email,
      gender,
      password,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
      role,
    });

    // Save user
    await newUser.save();

    return res.status(200).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

//<----------------------------------- LOGIN USER ------------------------------------->

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid user credentials",
      });
    }

    // compare password

    const match_password = await user.comparePassword(password);

    if (!match_password) {
      return res.status(401).json({
        status: false,
        message: "Invalid user credentials",
      });
    }

    // As the user is login successfully now we have to generate
    // access and refresh token and send it in the form of cookies to the user

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.id,
    );

    if (!accessToken || !refreshToken) {
      return res.status(500).json({
        status: false,
        message: "Server Error while generating access and refresh token",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken ",
    );
    console.log("Cookies send successfully");
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        status: true,
        message: "User login successfully",
        loggedInUser,
      });
  } catch (err) {
    console.log("Error in login controller " + err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

//<----------------------------------- LOGOUT USER------------------------------------->

export const logoutUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.refreshToken = undefined;

  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };
  console.log("User logout successfully");
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      status: true,
      message: "User Logout successfully",
    });
};

//<------------------------------FORGET PASSWORD------------------------------------->

export const forgetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User does not exists",
      });
    }
    const userId = user._id;
    const value = await sendEmailToUser({ email, userId });
    if (value === false) {
      return res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Email send",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    let { password, confirmPassword } = req.body;
    const { unHashedToken } = req.params;

    // console.log(hashval);
    confirmPassword = confirmPassword.trim();
    if (!password || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Confirm password not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must be of length 6",
      });
    }

    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(unHashedToken)
      .digest("hex");

    const user = await User.findOne({
      forgotPasswordToken,
      // forgotPasswordExpiry: { $gt: Date.now() },
      // forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Link not valid",
      });
    }
    if (user.forgotPasswordTokenExpiry < Date.now()) {
      return res.status(400).json({
        status: false,
        message: "Link is expired",
      });
    }
    user.forgotPasswordTokenExpiry = undefined;
    user.forgotPasswordToken = undefined;
    user.password = password;
    // user.password = await bcrypt.hash(password, 10);

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      status: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <-------------------------------UPDATE PROFILE PIC  --------------------------->

export const updateProfilePic = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }
  const url = await uploadOnCloudinary(req?.file?.path);
  if (!url) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
  return res.status(200).json({
    status: true,
    message: "File upload successfully ",
  });
};

// <---------------------------UPDATE DETAILS------------------------------------>

export const updateDetail = async (req, res) => {
  try {
    let { userName, fullName, email, gender } = req.body;
    userName = userName.trim();
    fullName = fullName.trim();
    email = email.trim();
    if (!userName || !fullName || !email || !gender) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }
    console.log(req.user._id);
    // check userName already present
    const userNameCheck = await User.findOne({ userName });
    if (
      userNameCheck &&
      userNameCheck._id.toString() !== req.user._id.toString()
    ) {
      return res.status(400).json({
        status: false,
        message: "User name already exists",
      });
    }

    // check email already use

    const emailCheck = await User.findOne({ email });
    console.log(emailCheck);
    if (emailCheck && emailCheck._id.toString() !== req.user._id.toString()) {
      console.log(emailCheck._id, req.user._id);
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    if (gender !== "male" && gender !== "female" && gender !== "other") {
      return res.status(400).json({
        status: false,
        message: "Gender is not valid",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: false,
        message: "Email is not valid",
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      userName,
      fullName,
      email,
      gender,
    });
    return res.status(200).json({
      status: true,
      message: "User details updated successfully",
    });
  } catch (err) {
    console.log("Error while updateing detials" + err.message);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// <---------------------------Get Profile Details------------------------------------>

export const getProfileDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id, {
      fullName: 1,
      userName: 1,
      email: 1,
      gender: 1,
      profilePic: 1,
    });
    console.log("get Detail called ");
    console.log(user);
    return res.status(200).json({
      status: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
