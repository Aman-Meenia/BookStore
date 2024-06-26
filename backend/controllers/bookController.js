import Book from "../models/bookModel.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import fs from "fs";

// <----------------------------------Add Book ------------------------------>

const unlinkFile = (filePath) => {
  if (!filePath) return;
  fs.unlinkSync(filePath);
};

export const addBook = async (req, res) => {
  console.log("Add book function called");
  try {
    const {
      title,
      author,
      genre,
      price,
      quantity,
      publisher,
      publishedOn,
      description,
    } = req.body;
    if (
      !title ||
      !author ||
      !genre ||
      !price ||
      !quantity ||
      !publisher ||
      !publishedOn ||
      !description
    ) {
      unlinkFile(req?.file?.path);
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // check if book already exists
    const book = await Book.findOne({ title });
    if (book) {
      unlinkFile(req?.file?.path);

      return res.status(400).json({
        status: false,
        message: "Book with same title already exists",
      });
    }

    // upload image to cloudinary
    const url = await uploadOnCloudinary(req?.file?.path);

    if (!url) {
      return res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }

    const newBook = await Book.create({
      title,
      author,
      genre,
      price,
      quantity,
      publisher,
      publishedOn,
      description,
      images: url.url,
    });
    await newBook.save();
    return res.status(200).json({
      status: true,
      message: "Book added successfully",
    });
  } catch (err) {
    unlinkFile(req?.file?.path);

    // console.log("Error in Adding book controller " + err);
    if (err.name === "ValidationError") {
      // console.log("validation error", err);
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <----------------------------------Get Book Detail By Title -------------------------------->

export const getBookByTitle = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        status: false,
        message: "Book title is required",
      });
    }

    const book = await Book.findOne(
      { title },
      {
        _id: 1,
        title: 1,
        author: 1,
        genre: 1,
        price: 1,
        quantity: 1,
        publisher: 1,
        publishedOn: 1,
        description: 1,
        images: 1,
      },
    );

    if (!book) {
      return res.status(400).json({
        status: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Book detail fetched successfully",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <---------------------------Update Book Detail By Title -------------------------------->

export const updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      price,
      quantity,
      publisher,
      publishedOn,
      description,
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !price ||
      !quantity ||
      !publisher ||
      !publishedOn ||
      !description
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const findBook = await Book.findOne({ title });

    if (!findBook) {
      return res.status(400).json({
        status: false,
        message: "Book not found",
      });
    }

    const updatedBook = await Book.findOneAndUpdate(
      { title },
      { author, genre, price, quantity, publisher, publishedOn, description },
      { new: true },
    );
    return res.status(200).json({
      status: true,
      message: "Book updated successfully",
    });
  } catch (err) {
    console.log("Error in update Book Controller " + err);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <--------------------------- Get All Books -------------------------------->
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      status: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log("Error in get Books Controller " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <--------------------------- Get All Books Admin -------------------------------->
export const getBooksAdmin = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      status: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log("Error in get Books Controller " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
// <----------------------------Get book by Id ------------------------------>

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate if it is a vlaid mongo id

    const validMongoId = mongoose.Types.ObjectId.isValid(id);
    if (!validMongoId) {
      return res.status(400).json({
        status: false,
        message: "Invalid book id",
      });
    }

    const book = await Book.findById({ _id: id });
    if (!book) {
      return res.status(400).json({
        status: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (err) {
    console.log("Error in get Book By Id Controller " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <------------------------------------------------Get Book by Genre------------------------------------>

export const getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const books = await Book.find({ genre: { $in: [genre] } });
    return res.status(200).json({
      status: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log("Error in get Books By Genre Controller " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <------------------------------------------------Most selling books------------------------------------>

export const getMostSellingBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ sold: -1 });
    return res.status(200).json({
      status: true,
      message: "Most selling books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log("Error in get Most selling Books Controller " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <----------------------------------------Latest Books------------------------------------>

export const getLatestBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: true,
      message: "Latest books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log("Error in get Latest Books Controller " + err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <--------------------------------Search Book  --------------------------->

export const searchBook = async (req, res) => {
  try {
    const { name } = req.body;

    const regex = new RegExp(name, "i");

    const books = await Book.find({ title: { $regex: regex } });

    return res.status(200).json({
      status: true,
      message: "Book fetched successfully",
      data: books,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.message,
    });
  }
};
