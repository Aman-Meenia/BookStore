import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import DisplayInformation from "./DisplayInformation";
import { FiHeart } from "react-icons/fi";
import Reviews from "./Reviews";
import { BooksContext } from "../../store/books";
import { useGetBookById } from "../../hooks/useGetBookById";
import { useAddToCart } from "../../hooks/useAddToCart";
const Book = () => {
  const { singleBook, setSingleBook } = useContext(BooksContext);
  // console.log(singleBook);
  const { loading, getBookById } = useGetBookById();
  const { id } = useParams();

  useEffect(() => {
    // console.log(" Book details fetched ");
    getBookById({ id });
    // console.log(singleBook);
  }, []);

  const { loadingAddToCart, addToCart } = useAddToCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();

    await addToCart({ bookId: singleBook?._id });
  };

  return (
    <>
      {/* page to show the single book photo and its details */}
      <div></div>
      <div className="font-[sans-serif] bg-white">
        <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div className="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                <div className="flex justify-center">
                  <img
                    // className="max-w-full h-auto"
                    className="h-64 w-40 object-contain"
                    src={singleBook?.images}
                    alt="Product"
                  />
                </div>

                {/* Like button */}
                <button type="button" className="absolute top-4 right-4">
                  <FiHeart size={25} />
                </button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-[#333]">
                {singleBook?.title}
              </h2>
              <div className="flex flex-wrap gap-4 mt-6">
                <p className="text-[#333] text-4xl font-bold">
                  ${singleBook?.price}
                </p>
                <p className="text-gray-400 text-xl">
                  <strike>${singleBook?.price + 5}</strike>{" "}
                  <span className="text-sm ml-1">Tax included</span>
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                </div>
                <h4 className="text-[#333] text-base">500 Reviews</h4>
              </div>
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  type="button"
                  className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-bold rounded"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-bold rounded"
                  onClick={handleAddToCart}
                >
                  {loadingAddToCart ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Add to cart"
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Display product information */}
          <DisplayInformation />
        </div>
      </div>

      <Reviews />
    </>
  );
};

export default Book;
