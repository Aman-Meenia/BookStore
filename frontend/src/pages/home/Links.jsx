import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetMostSelling } from "../../hooks/useGetMostSelling";

const Links = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBestSelling = async () => {
    window.location.href = "/books/bestselling";
  };
  const handleNewArrival = async () => {
    window.location.href = "/books/newarrival";
  };
  const handleRomanceBook = async () => {
    window.location.href = "/books/romance";
  };
  const handleSelfHelp = async () => {
    window.location.href = "/books/selfhelp";
  };
  const handleFiction = async () => {
    window.location.href = "/books/fiction";
  };
  return (
    <>
      <div className="flex flex-wrap items-start px-10 py-3.5 relative  bg-base-100 border-white">
        <div className="flex ml-auto lg:order-1 lg:hidden">
          <button id="toggle" className="ml-7" onClick={toogleMenu}>
            <svg
              className="w-7 h-7 fill-white-500"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <ul
          className={`${isMenuOpen ? "block" : "hidden"} lg:!flex justify-center lg:space-x-0 max-lg:space-y-2  w-full `}
        >
          <div className="flex items-center">
            <li className="max-lg:border-b border-white-200 max-lg:py-2">
              <button
                onClick={handleBestSelling}
                className="lg:hover:text-white-600  text-white-500 text-[15px] block hover:font-bold"
              >
                Best Selling
              </button>
            </li>
            <span className="text-red-500 text-2xl p-3">|</span>
          </div>
          <div className="flex items-center">
            <li className="max-lg:border-b border-white-200 max-lg:py-2">
              <button
                onClick={handleNewArrival}
                className="lg:hover:text-white-600  text-white-500 text-[15px] block hover:font-bold"
              >
                New Arrivals
              </button>
            </li>
            <span className="text-red-500 text-2xl p-3">|</span>
          </div>

          <div className="flex items-center">
            <li className="max-lg:border-b border-white-200 max-lg:py-2">
              <button
                onClick={handleRomanceBook}
                className="lg:hover:text-white-600  text-white-500 text-[15px] block hover:font-bold"
              >
                Rommance
              </button>
            </li>
            <span className="text-red-500 text-2xl p-3">|</span>
          </div>
          <div className="flex items-center">
            <li className="max-lg:border-b border-white-200 max-lg:py-2">
              <button
                onClick={handleSelfHelp}
                className="lg:hover:text-white-600  text-white-500 text-[15px] block hover:font-bold"
              >
                Self-Help
              </button>
            </li>
            <span className="text-red-500 text-2xl p-3">|</span>
          </div>
          <div className="flex items-center">
            <li className="max-lg:border-b border-white-200 max-lg:py-2">
              <button
                onClick={handleFiction}
                className="lg:hover:text-white-600  text-white-500 text-[15px] block hover:font-bold"
              >
                Fiction
              </button>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Links;
