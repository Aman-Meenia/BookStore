import Cart from "../models/Cart";
import Book from "../models/Book";
import User from "../models/User";
// <---------------------------Add Book To Cart -------------------------------->

export const addBookToCart = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

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
      const cart = await Cart.findOneAndUpdate(
        { userId },
        {
          $push: {
            books: {
              bookId,
              quantity: 1,
            },
          },
        },
        { new: true },
      );
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

// <----------------------------------Remove Book From Cart ------------------------->

export const removeBookFromCart = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
  } catch (err) {}
};
