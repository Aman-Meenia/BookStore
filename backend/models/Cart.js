import mongoose from "mongoose";

const cartModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    books: [
      {
        bookId: {
          type: String,
          required: true,
          index: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model("Cart", cartModel);

export default Cart;
