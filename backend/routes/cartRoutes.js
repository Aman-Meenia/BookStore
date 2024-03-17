import { Router } from "express";
import {
  addBookToCart,
  decreaseBookCount,
  getBooksFromCart,
  getCartTotalPrice,
  removeBookFromCart,
} from "../controllers/cartController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/addbooks", verifyJWT, addBookToCart);
router.get("/getbooks", verifyJWT, getBooksFromCart);
router.delete("/removebooks/:bookId", verifyJWT, removeBookFromCart);
router.post("/decreasequantity", verifyJWT, decreaseBookCount);
router.get("/bill", verifyJWT, getCartTotalPrice);

export default router;
