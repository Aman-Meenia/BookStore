import mongoose from "mongoose";
import crypto from "crypto";

import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import { validate } from "email-validator";
import instance from "../index.js";
import Book from "../models/bookModel.js";

// <-----------------------------------------Order Books ---------------------------------->

const phoneNumberPattern = /^\d{10}$/;

function validatePhoneNumber(phoneNumber) {
  return phoneNumberPattern.test(phoneNumber);
}
const pinCodePattern = /^\d{6}$/;

function validatePIN(pin) {
  return pinCodePattern.test(pin);
}

export const validateOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      address,
      state,
      city,
      pincode,
    } = req.body?.detail;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNo ||
      !address ||
      !state ||
      !city ||
      !pincode
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const id = req.user.id;

    const userCart = await Cart.findOne({ userId: id }).populate(
      "books.bookId",
    );

    if (!userCart) {
      return res.status(400).json({
        status: false,
        message: "Please select atleast one book to order",
      });
    }

    // validate phone number

    if (!validatePhoneNumber(phoneNo)) {
      return res.status(400).json({
        status: false,
        message: "Invalid phone number",
      });
    }

    // validate pincode

    if (!validatePIN(pincode)) {
      return res.status(400).json({
        status: false,
        message: "Invalid pincode",
      });
    }

    // validate email

    if (!validate(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email",
      });
    }
    const totalPrice = userCart.books.reduce((acc, book) => {
      return acc + book.bookId.price * book.quantity;
    }, 0);

    // make new order and save it in database
    const order = new Order({
      userId: id,
      books: userCart.books,
      firstName,
      lastName,
      email,
      phoneNo,
      address,
      state,
      city,
      pincode,
      total: totalPrice,
      status: "pending",
      payment: "pending",
    });

    // remove the previouse order from database if any payment pending is present

    const prevOrder = await Order.findOne({
      $and: [{ userId: id, payment: "pending" }],
    });
    if (prevOrder) {
      await Order.findByIdAndDelete(prevOrder._id);
    }

    //
    // as order is done successfully now empty the cart

    // const cartDelete = await Cart.findByIdAndDelete(userCart._id);
    // console.log(cartDelete);

    console.log("saving");
    await order.save();
    return res.status(200).json({
      status: true,
      message: "Order placed successfully",
    });
  } catch (err) {
    console.log("error in order controller " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//  <--------------------------------Create New Order--------------------------------->

export const createRazorPayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const key = process.env.RAZORPAY_KEY_ID;
    if (!amount) {
      return res.status(400).json({
        status: false,
        message: "Amount is required",
      });
    }
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      status: true,
      message: "Order created successfully",
      order,
      key,
    });
  } catch (err) {
    console.log("Error in create order controller ");
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <---------------------------------- Make Payment Status Paid and Save Orders-------------------------------->

export const makePaymentStatusPaid = async (req, res) => {
  try {
    // const { order } = req.body;
    const { id: userId } = req.user;
    console.log(userId);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body?.body;
    console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature);

    // console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature);
    const generated_signature = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(generated_signature)
      .digest("hex");

    if (expectedSignature == razorpay_signature) {
      console.log("Valid signature");
    } else {
      console.log("Invalid signature");
      return res.status(400).json({
        status: false,
        message: "Invalid signature",
      });
    }

    const paymentPending = await Order.findOneAndUpdate(
      { $and: [{ userId }, { payment: "pending" }] },
      { payment: "paid" },
      { new: true },
    );

    const userCart = await Cart.findOne({ userId });

    for (let i = 0; i < userCart.books.length; i++) {
      const book = await Book.findById(userCart.books[i].bookId);
      book.quantity = book.quantity - userCart.books[i].quantity;
      book.sold = book.sold + userCart.books[i].quantity;
      await book.save();
    }

    const cartDelete = await Cart.findByIdAndDelete(userCart._id);

    return res.status(200).json({
      status: true,
      message: "Payment status updated successfully",
      paymentDetail: paymentPending,
    });
  } catch (err) {
    console.log("Error in make payment status paid controller " + err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      err: err,
    });
  }
};

// <----------------------------------Update Order Status-------------------------------->

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Status is required",
      });
    }

    const validateId = mongoose.Types.ObjectId.isValid(id);
    if (!validateId) {
      return res.status(400).json({
        status: false,
        message: "Invalid order id",
      });
    }
    const validateStatus = ["pending", "processing", "shipped", "delivered"];
    if (!validateStatus.includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(400).json({
        status: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (err) {
    console.log("Error in update Order Status Controller " + err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <-------------------------------Get Pending Orders---------------------------------->

export const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" });
    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    console.log("Error in get Pending Orders Controller " + err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <-------------------------------Get Shipped Orders---------------------------------->

export const getShippedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "shipped" });
    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    console.log("Error in get Shipped Orders Controller " + err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <-------------------------------Get Delivered Orders---------------------------------->

export const getDeliveredOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "delivered" });
    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    console.log("Error in get Delivered Orders Controller " + err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <----------------------------Cancel Order-------------------------------->

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId: _id } = req.user._id;

    if (!orderId) {
      return res.status(400).json({
        status: false,
        message: "Order id is required",
      });
    }

    const validateId = mongoose.Types.ObjectId.isValid(orderId);
    if (!validateId) {
      return res.status(400).json({
        status: false,
        message: "Invalid order id",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({
        status: false,
        message: "Order not found",
      });
    }

    const UpdateOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "cancelled" },
      { new: true },
    );

    return res.status(200).json({
      status: true,
      message: "Order cancelled successfully",
      data: UpdateOrder,
    });
  } catch (err) {
    console.log("Error in cancel Order Controller " + err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <-----------------------------------------Get All Orders By User Id ---------------------------------->

export const getOrdersById = async (req, res) => {
  try {
    const orders = await Order.find(
      { userId: req.user._id },
      {
        books: 1,
        createdAt: 1,
        status: 1,
        totalPrice: 1,
      },
    );

    const orderList = await Order.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.user._id) },
      },
      { $unwind: "$books" },
      {
        $lookup: {
          from: "books", // Assuming the name of the collection where books are stored is "books"
          localField: "books.bookId",
          foreignField: "_id",
          as: "books.bookDetails",
        },
      },

      {
        $addFields: {
          "books.createdAt": "$createdAt",
          "books.details": { $arrayElemAt: ["$books.bookDetails", 0] },
        },
      },

      {
        $project: {
          status: 1,
          "books.createdAt": 1,
          "books.quantity": 1,
          "books.bookId": 1,
          "books.author": 1,
          "books.bookDetails.title": 1,

          "books.bookDetails.price": 1,
          "books.bookDetails.images": 1,
          "books.bookDetails.author": 1,
        },
      },
    ]);

    // const orderList = await Order.aggregate([
    //   {
    //     $unwind: "$books",
    //   },
    //   {
    //     $addFields: {
    //       "books.createdAt": "$createdAt",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       "books.createdAt": "$createdAt",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       books: { $push: "$books" },
    //     },
    //   },
    //
    // ]);

    console.log(orders);
    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orderList,
    });
  } catch (err) {
    console.log("Error in get Orders Controller " + err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <-----------------------------Get user with orders only (To show detail of product buy Admin)  ------------------------------------->

export const getUserWithOrders = async (req, res) => {
  try {
    const orderList = await Order.aggregate([
      {
        $unwind: "$books",
      },
      {
        $lookup: {
          from: "books",
          localField: "books.bookId",
          foreignField: "_id",
          as: "books.bookDetails",
        },
      },

      {
        $unwind: "$books.bookDetails", // Unwind the bookDetails array
      },
      {
        $lookup: {
          from: "users", // Assuming the name of the collection where users are stored is "users"
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $group: {
          _id: "$userId",
          user: { $first: "$user" },

          totalPrice: { $sum: "$books.bookDetails.price" },

          totalQuantity: { $sum: "$books.quantity" },
          totalPrice: {
            $sum: {
              $multiply: ["$books.bookDetails.price", "$books.quantity"],
            },
          },
        },
      },
      {
        $addFields: {
          actualPrice: { $divide: ["$totalPrice", "$totalProduct"] },
        },
      },
      {
        $project: {
          totalPrice: 1,
          totalQuantity: 1,
          user: {
            fullName: 1,
            userName: 1,
            email: 1,
            profilePic: 1,
          },
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orderList,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
