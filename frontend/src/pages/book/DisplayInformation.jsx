import React, { useContext } from "react";
import { BooksContext } from "../../store/books";

const DisplayInformation = () => {
  const { singleBook, setSingleBook } = useContext(BooksContext);

  const date = new Date(singleBook?.publishedOn);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
        <h3 className="text-lg font-bold text-[#333]">Product information</h3>
        <ul className="mt-6 space-y-6 text-[#333]">
          <li className="text-sm">
            TITLE<span className="ml-4 float-right">{singleBook?.title}</span>
          </li>
          <li className="text-sm">
            AUTHOR{" "}
            <span className="ml-4 float-right">{singleBook?.author}</span>
          </li>
          <li className="text-sm">
            PUBLISHER{" "}
            <span className="ml-4 float-right">{singleBook?.publisher}</span>
          </li>
          <li className="text-sm">
            GENRE
            <span className="ml-4 float-right">{singleBook?.genre}</span>
          </li>
          <li className="text-sm">
            PUBLISHED ON
            <span className="ml-4 float-right">{formattedDate}</span>
          </li>
          {/* <li className="text-sm"> */}
          {/*   DESCRIPTION */}
          {/*   <span className="ml-4 float-right">{singleBook?.description}</span> */}
          {/* </li> */}
        </ul>
      </div>
    </>
  );
};

export default DisplayInformation;
