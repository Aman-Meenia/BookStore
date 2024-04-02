import React, { useCallback, useContext, useEffect, useMemo } from "react";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";
import { CartContext } from "../../store/cart";
import { userGetCart } from "../../hooks/useGetCart";
import { useStockCheck } from "../../hooks/useStockCheck";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const { loading, getCart } = userGetCart();
  const { navBarCart, setNavBarCart } = useContext(CartContext);

  // cart product list
  useMemo(() => {
    const fun = async () => {
      await getCart();
    };
    fun();
  }, []);

  const { checkStock, checkStockLoading } = useStockCheck();

  const handleCheckStock = async (e) => {
    e.preventDefault();
    await checkStock();
  };
  //
  return (
    <>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="font-[sans-serif]">
        <div className="grid lg:grid-cols-3">
          <div className="lg:col-span-2 p-10 bg-white overflow-x-auto">
            {!cart || !cart.length ? (
              <h1 className="text-3xl font-extrabold text-[#333]">
                No items in cart
              </h1>
            ) : (
              <h2 className="text-3xl font-extrabold text-[#333]">
                Shopping Cart
              </h2>
            )}

            {cart &&
              cart.length > 0 &&
              cart.map((book, index) => (
                <CartProduct key={index} book={book} />
              ))}
          </div>
          <div className="bg-gray-50 p-10">
            <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">
              Order Summary
            </h3>
            <ul className="text-[#333] divide-y mt-6">
              <li className="flex flex-wrap gap-4 text-md py-4">
                Subtotal{" "}
                <span className="ml-auto font-bold">${navBarCart.bill}</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-4">
                Shipping <span className="ml-auto font-bold">$0.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-4">
                Tax <span className="ml-auto font-bold">$0.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-4 font-bold">
                Total <span className="ml-auto">${navBarCart.bill}</span>
              </li>
            </ul>

            <button
              onClick={handleCheckStock}
              type="button"
              className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
