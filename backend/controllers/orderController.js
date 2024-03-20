import mongoose from "mongoose";

import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import { validate } from "email-validator";

// <-----------------------------------------Order Books ---------------------------------->

const phoneNumberPattern = /^\d{10}$/;

function validatePhoneNumber(phoneNumber) {
  return phoneNumberPattern.test(phoneNumber);
}
const pinCodePattern = /^\d{6}$/;

function validatePIN(pin) {
  return pinCodePattern.test(pin);
}

export const orderBooks = async (req, res) => {
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
    } = req.body;

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
    });

    await order.save();
    // as order is done successfully now empty the cart

    await Cart.findByIdAndDelete(userCart._id);

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
