import React from "react";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <div className="font-[sans-serif]">
        <div className="grid lg:grid-cols-3">
          <div className="lg:col-span-2 p-10 bg-white overflow-x-auto">
            {/* <div className="font-[sans-serif] bg-white"> */}
            {/*   <div className="grid lg:grid-cols-3 gap-12 p-6"> */}
            {
              <>
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
              </>
            }
          </div>
          <div className="bg-gray-50 p-10">
            <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">
              Order Summary
            </h3>
            <ul className="text-[#333] divide-y mt-6">
              <li className="flex flex-wrap gap-4 text-md py-4">
                Subtotal <span className="ml-auto font-bold">$37.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-4">
                Shipping <span className="ml-auto font-bold">$4.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-4">
                Tax <span className="ml-auto font-bold">$4.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-4 font-bold">
                Total <span className="ml-auto">$45.00</span>
              </li>
            </ul>
            <Link to="/checkout">
              <button
                type="button"
                className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Check out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
