import { Router } from "express";
import {
  forgetPassword,
  forgetPasswordRequest,
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
router.post("/updateprofilepic", upload.single("file"), updateProfilePic);

// Secure Routes
router.post("/logout", verifyJWT, logoutUser);
router.post("/updatedetail", verifyJWT, updateDetail);

export default router;
