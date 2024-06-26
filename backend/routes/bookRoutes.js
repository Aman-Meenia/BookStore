import { Router } from "express";
import {
  addBook,
  getBookByTitle,
  getBooks,
  getBooksAdmin,
  getBooksByGenre,
  getLatestBooks,
  getMostSellingBooks,
  searchBook,
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
router.get("/getbooksadmin", verifyJWT, adminAndUserAuth, getBooksAdmin);

// unprotected Routes
router.get("/getbooks", verifyJWT, getBooks);
router.get("/getbookbyid/:id", verifyJWT, getBookById);
router.get("/getbygenre/:genre", verifyJWT, getBooksByGenre);
router.get("/mostselling", verifyJWT, getMostSellingBooks);
router.get("/latest", verifyJWT, getLatestBooks);

router.post("/searchbook", verifyJWT, searchBook);

export default router;
