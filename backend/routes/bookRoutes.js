import { Router } from "express";
import {
  addBook,
  getBookByTitle,
  getBooks,
  updateBook,
} from "../controllers/bookController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { adminAndUserAuth } from "../middleware/authorization.js";
import { upload } from "../middleware/multer.js";
import { getBookById } from "../controllers/bookController.js";
const router = Router();

// Protected ROuted
router.post(
  "/addbook",
  verifyJWT,
  adminAndUserAuth,
  upload.single("file"),
  addBook,
);
router.post("/getbookdetail", verifyJWT, adminAndUserAuth, getBookByTitle);
router.post("/updatebook", verifyJWT, adminAndUserAuth, updateBook);

// unprotected Routes
router.get("/getbooks", verifyJWT, getBooks);
router.get("/getbookbyid/:id", verifyJWT, getBookById);

export default router;
