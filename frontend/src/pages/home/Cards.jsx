import React, { useContext } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { BooksContext } from "../../store/books";

const Cards = () => {
  const { books, setBooks } = useContext(BooksContext);
  return (
    <>
      <div className="font-[sans-serif] bg-gray-100">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            Premium Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
