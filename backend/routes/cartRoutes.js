import { Router } from "express";
import { addBookToCart } from "../controllers/cartController";

const router = Router();

router.post("/addtocart", addBookToCart);
// router.post("/removefromcart", removeFromCart);
// router.post("/updatecart", updateCart);

export default router;
