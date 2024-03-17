import React from "react";
import Router from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { orderBooks } from "../controllers/orderController.js";

const router = Router();

router.post("/", verifyJWT, orderBooks);
export default router;
