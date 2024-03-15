import { Router } from "express";
import {
  addBookToCart,
  getBooksFromCart,
  removeBookFromCart,
} from "../controllers/cartController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/addbooks", verifyJWT, addBookToCart);
router.get("/getbooks", verifyJWT, getBooksFromCart);
router.post("/removebooks", verifyJWT, removeBookFromCart);
// router.post("/removefromcart", removeFromCart);
// router.post("/updatecart", updateCart);

export default router;
