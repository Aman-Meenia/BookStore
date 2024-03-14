import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Links = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="flex flex-wrap items-start px-10 py-3.5 relative">
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
          // id="collapseMenu"
          className={`${isMenuOpen ? "block" : "hidden"} lg:!flex justify-center lg:space-x-8 max-lg:space-y-2  w-full `}
        >
          <li className="max-lg:border-b border-white-200 max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-white-600 font-bold text-white-500 text-[15px] block"
            >
              New Arrivals
            </a>
          </li>
          <li className="max-lg:border-b border-white-200 max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-white-600 font-bold text-white-500 text-[15px] block"
            >
              Best Sellers
            </a>
          </li>
          <li className="max-lg:border-b border-white-200 max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-white-600 font-bold text-white-500 text-[15px] block"
            >
              Genre
            </a>
          </li>
          <li className="max-lg:border-b border-white-200 max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-white-600 font-bold text-white-500 text-[15px] block"
            >
              Genre
            </a>
          </li>
          <li className="max-lg:border-b border-white-200 max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-white-600 font-bold text-white-500 text-[15px] block"
            >
              Genre
            </a>
          </li>
          <li className="max-lg:border-b border-white-200 max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-white-600 font-bold text-white-500 text-[15px] block"
            >
              Genre
            </a>
          </li>
          <li className="max-lg:border-b border-white-200 max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-white-600 font-bold text-white-500 text-[15px] block"
            >
              Genre
            </a>
          </li>
          <li className="max-lg:border-b border-white-200 max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-white-600 font-bold text-white-500 text-[15px] block"
            >
              Genre
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Links;
