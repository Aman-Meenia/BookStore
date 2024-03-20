import { Router } from "express";
import {
  forgetPassword,
  forgetPasswordRequest,
  getProfileDetails,
  loginUser,
  logoutUser,
  signupUser,
  updateDetail,
  updateProfilePic,
} from "../controllers/userController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { upload } from "../middleware/multer.js";

const router = Router();
// Unsecure Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgetpassword", forgetPasswordRequest);
router.post("/forgetpassword/:unHashedToken", forgetPassword);

// Secure Routes
router.get("/logout", verifyJWT, logoutUser);
router.post("/updatedetail", verifyJWT, updateDetail);
router.post(
  "/updateprofilepic",
  verifyJWT,
  upload.single("file"),
  updateProfilePic,
);
router.get("/getdetail", verifyJWT, getProfileDetails);

export default router;
