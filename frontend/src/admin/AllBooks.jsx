import React, { useContext } from "react";
import DisplayBook from "./DisplayBook";
import { useGetAllBooksAdmin } from "../hooks/useGetAllBooksAdmin";
import { useEffect } from "react";
import { BooksContext } from "../store/books";

const AllBooks = () => {
  const { loading, getAllBooksAdmin } = useGetAllBooksAdmin();
  const { adminBooks, setAdminBooks } = useContext(BooksContext);
  useEffect(() => {
    const fun = async () => {
      await getAllBooksAdmin();
    };
    fun();
  }, []);

  // console.log(adminBooks);

  return (
    <>
      <div className="font-[sans-serif] w-full md:w-full lg:w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 flex justify-center mt-4">
          {" "}
          All Books{" "}
        </h1>
        <div className="grid ">
          {/* <div className="lg:col-span-2 p-10 bg-white overflow-x-auto width-full "> */}

          {adminBooks &&
            adminBooks.length > 0 &&
            adminBooks.map((book, index) => (
              <DisplayBook key={index} book={book} />
            ))}

          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default AllBooks;
