import React, { useContext, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import PlaceOrder from "./PlaceOrder";
import { CartContext } from "../../store/cart";
import { userGetCart } from "../../hooks/useGetCart";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  // console.log("cart", cart);
  const { loading, getCart } = userGetCart();
  // cart product list
  useEffect(() => {
    const fun = async () => {
      await getCart();
    };
    fun();
  }, []);

  // Check if the current link is active or not
  const location = useLocation();

  useEffect(() => {
    // Call your function when the component mounts or when the location changes
    handleActiveLink();
  }, [location.pathname]); // Dependency array ensures this effect runs when location.pathname changes

  const handleActiveLink = () => {
    // Your function to call when the link is active
    console.log("Link is active!");
  };

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
      <div className="font-[sans-serif] bg-gray-50">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
          <div className="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0">
            <div className="relative h-full">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>

                {cart &&
                  cart.length > 0 &&
                  cart.map((book, index) => (
                    <CheckoutProduct key={index} book={book} />
                  ))}
              </div>
            </div>
          </div>
          {/* Place your order  */}
          <PlaceOrder />
        </div>
      </div>
    </>
  );
};

export default Checkout;
