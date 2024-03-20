import React from "react";
import Router from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { getOrdersById, orderBooks } from "../controllers/orderController.js";

const router = Router();

router.post("/", verifyJWT, orderBooks);
router.get("/getordersforuser", verifyJWT, getOrdersById);
export default router;
