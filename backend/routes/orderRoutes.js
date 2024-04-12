import React from "react";
import Router from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
  createRazorPayOrder,
  getDeliveredOrders,
  getOrdersById,
  getPendingOrShippedOrders,
  getUserWithOrders,
  makePaymentStatusPaid,
  updateOrderStatus,
  validateOrder,
} from "../controllers/orderController.js";
import { adminAndUserAuth } from "../middleware/authorization.js";

const router = Router();

router.post("/", verifyJWT, validateOrder);
router.get("/getordersforuser", verifyJWT, getOrdersById);

router.post("/create", verifyJWT, createRazorPayOrder);
router.post("/validatepayment", verifyJWT, makePaymentStatusPaid);

router.get("/ordersDetail", verifyJWT, getUserWithOrders);

router.get(
  "/getdeliveredorders",
  verifyJWT,
  adminAndUserAuth,
  getDeliveredOrders,
);

router.post(
  "/updatestatus/:id",
  verifyJWT,
  adminAndUserAuth,
  updateOrderStatus,
);

router.get(
  "/getpendingandshipped",
  verifyJWT,
  adminAndUserAuth,
  getPendingOrShippedOrders,
);
export default router;
