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
