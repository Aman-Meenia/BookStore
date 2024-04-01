import React from "react";
import Router from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
  createRazorPayOrder,
  getOrdersById,
  getUserWithOrders,
  makePaymentStatusPaid,
  validateOrder,
} from "../controllers/orderController.js";

const router = Router();

router.post("/", verifyJWT, validateOrder);
router.get("/getordersforuser", verifyJWT, getOrdersById);

router.post("/create", verifyJWT, createRazorPayOrder);
router.post("/validatepayment", verifyJWT, makePaymentStatusPaid);

router.get("/ordersDetail", verifyJWT, getUserWithOrders);
export default router;
