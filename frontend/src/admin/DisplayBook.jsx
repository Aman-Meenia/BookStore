import React, { useContext, useEffect } from "react";
import { BooksContext } from "../store/books";
import { Link } from "react-router-dom";

const DisplayBook = ({ book }) => {
  // console.log("BOOk is ");
  console.log(book?.author);
  return (
    <>
      <div className="lg:col-span-2 py-3 px-6 bg-white overflow-x-auto">
        <div className="bg-white divide-y">
          <div className="grid md:grid-cols-3 items-center gap-8 py-6 border p-6 border-gray-200">
            <div className="md:col-span-2 flex items-center gap-6">
              <div className="w-24 h-28 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] p-4">
                <img
                  className="w-full h-full object-contain rounded-md"
                  src={book?.images}
                />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#333] break-words">
                  {/* title */}
                  {book?.title}
                </h3>
                <h6 className="text-md text-gray-500 mt-2">
                  <strong className="ml-2">
                    {/* {order.books.bookDetails[0].author} */}
                    {book?.author}
                  </strong>
                </h6>
              </div>
            </div>
            <div className="flex ">
              <div className="flex items-center ">
                <h4 className="text-lg font-bold text-[#333]">
                  {/* ${order.books.bookDetails[0].price} */}₹{book?.price}
                </h4>
              </div>
              <div className="flex items-center ml-auto ">
                <h4 className="text-lg font-bold text-[#333]">
                  {/* {order.status} */}
                  Sold: {book?.sold}
                </h4>
              </div>
              <div className="flex items-center ml-auto ">
                <h4 className="text-lg font-bold text-[#333]">
                  {/* {order.status} */}
                  Stock: {book?.quantity}
                </h4>
              </div>
              <div className="flex items-center ml-auto ">
                <Link
                  to={`update-book/${book?.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn btn-sm m-1"> Update </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayBook;
