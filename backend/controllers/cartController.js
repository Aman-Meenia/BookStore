import Book from "../models/bookModel.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import mongoose from "mongoose";

// <---------------------------Add Book To Cart -------------------------------->

export const addBookToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const { id: userId } = req.user;
    // if bookId or userIs is missing
    if (!userId || !bookId) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // If BookId or UserId is not valid
    const validMongoId = mongoose.Types.ObjectId.isValid(bookId);
    if (!validMongoId) {
      return res.status(400).json({
        status: false,
        message: "Invalid book id",
      });
    }

    const validMongoId2 = mongoose.Types.ObjectId.isValid(userId);
    if (!validMongoId2) {
      return res.status(400).json({
        status: false,
        message: "Invalid user id",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(400).json({
        status: false,
        message: "Book not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    if (book.quantity < 1) {
      return res.status(400).json({
        status: false,
        message: "Book is not available",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      const cart = await Cart.create({
        userId,
        books: [
          {
            bookId,
            quantity: 1,
          },
        ],
      });
      return res.status(200).json({
        status: true,
        message: "Book added to cart successfully",
        cart,
      });
    } else {
      //  If book arlready present in cart increase its value by One

      const FindBookInCart = cart.books.find(
        (book) => book.bookId.toString() === bookId.toString(),
      );
      if (FindBookInCart) {
        if (FindBookInCart.quantity === 5) {
          return res.status(400).json({
            status: false,
            message: "Cannot add more than 5 books of same type to cart",
          });
        }
        FindBookInCart.quantity = FindBookInCart.quantity + 1;
      } else {
        cart.books.push({
          bookId,
          quantity: 1,
        });
      }
      await cart.save();

      return res.status(200).json({
        status: true,
        message: "Book added to cart successfully",
        cart,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <----------------------------------Get All Books In Cart ------------------------->

export const getBooksFromCart = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User id is  required",
      });
    }

    const validMongoId = mongoose.Types.ObjectId.isValid(userId);
    if (!validMongoId) {
      return res.status(400).json({
        status: false,
        message: "Invalid user id",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "books.bookId",
      select: "title author price images",
    });

    if (!cart) {
      return res.status(400).json({
        status: false,
        message: "Cart empty",
      });
    }

    const books = cart.books;
    return res.status(200).json({
      status: true,
      message: "Cart fetched successfully",
      cart: books,
    });
  } catch (err) {
    console.log("Error in get book from cart " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <----------------------------------Remove Book From Cart ------------------------->

export const removeBookFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { id: userId } = req.user;

    if (!bookId) {
      return res.status(400).json({
        status: false,
        message: "Book id is required",
      });
    }

    const validMongoId = mongoose.Types.ObjectId.isValid(bookId);
    if (!validMongoId) {
      return res.status(400).json({
        status: false,
        message: "Invalid book id",
      });
    }

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(400).json({
        status: false,
        message: "Cart already empty",
      });
    }

    const bookPresent = userCart.books.find(
      (book) => book.bookId.toString() === bookId.toString(),
    );

    if (!bookPresent) {
      return res.status(400).json({
        status: false,
        message: "Book not found in cart",
      });
    }

    userCart.books = userCart.books.filter(
      (book) => book.bookId.toString() !== bookId.toString(),
    );
    console.log(userCart);

    // if cart is empty then remove cart
    if (userCart.books.length === 0) {
      await Cart.findByIdAndDelete(userCart._id);
      return res.status(200).json({
        status: true,
        message: "Book removed from cart successfully",
      });
    }

    await userCart.save();
    return res.status(200).json({
      status: true,
      message: "Book removed from cart successfully",
    });
  } catch (err) {
    console.log("Error in remove book from cart " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <--------------------------------Decrease the count of book in cart ------------------------->

export const decreaseBookCount = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { id: userId } = req.user;

    if (!bookId) {
      return res.status(400).json({
        status: false,
        message: "Book id is required",
      });
    }

    const validMongoId = mongoose.Types.ObjectId.isValid(bookId);
    if (!validMongoId) {
      return res.status(400).json({
        status: false,
        message: "Invalid book id",
      });
    }

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(400).json({
        status: false,
        message: "Cart already empty",
      });
    }

    const bookPresent = userCart.books.find(
      (book) => book.bookId.toString() === bookId.toString(),
    );

    if (!bookPresent) {
      return res.status(400).json({
        status: false,
        message: "Book not found in cart",
      });
    }

    // if book present decrease its count by one but if the count is zero than do nothing

    if (bookPresent.quantity > 1) {
      bookPresent.quantity = bookPresent.quantity - 1;
      await userCart.save();
      return res.status(200).json({
        status: true,
        message: "Book count decreased successfully",
        cart: userCart,
      });
    }

    return res.status(400).json({
      status: false,
      message: "Book count cannot be zero",
    });
  } catch (err) {
    console.log("Error in decrease book count " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <---------------------------------Get Cart Total Price ------------------------->

export const getCartTotalPrice = async (req, res) => {
  try {
    const { id: userId } = req.user;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User id is required",
      });
    }

    const userCart = await Cart.findOne({ userId }).populate("books.bookId");

    if (!userCart) {
      return res.status(200).json({
        status: false,
        message: "Cart empty",
        bill: 0,
        quantity: 0,
      });
    }

    const totalPrice = userCart.books.reduce((acc, book) => {
      return acc + book.bookId.price * book.quantity;
    }, 0);

    const totalQuantity = userCart.books.reduce((acc, book) => {
      return acc + book.quantity;
    }, 0);

    return res.status(200).json({
      status: true,
      message: "Cart total price fetched successfully",
      bill: totalPrice,
      quantity: totalQuantity,
    });
  } catch (err) {
    console.log("Error in get cart total price " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <---------------------------Increase the count of book in cart ------------------------->

export const increaseCountOfBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { id: userId } = req.user;

    const validMongoId = mongoose.Types.ObjectId.isValid(bookId);

    if (!validMongoId) {
      return res.status(400).json({
        status: false,
        message: "Invalid book id",
      });
    }

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(400).json({
        status: false,
        message: "Cart not found",
      });
    }

    const bookPresent = userCart.books.find(
      (book) => book.bookId.toString() === bookId.toString(),
    );

    if (!bookPresent) {
      return res.status(400).json({
        status: false,
        message: "Book not found in cart",
      });
    }
    if (bookPresent.quantity === 5) {
      return res.status(400).json({
        status: false,
        message: "Cannot add more than 5 books of same type",
      });
    }
    bookPresent.quantity = bookPresent.quantity + 1;
    await userCart.save();
    return res.status(200).json({
      status: true,
      message: "Book count increased successfully",
      cart: userCart,
    });
  } catch (err) {
    console.log("Error in increase book count " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
