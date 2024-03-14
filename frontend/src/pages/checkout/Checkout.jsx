import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import PlaceOrder from "./PlaceOrder";

const Checkout = () => {
  return (
    <>
      <div className="font-[sans-serif] bg-gray-50">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
          <div className="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0">
            <div className="relative h-full">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                <CheckoutProduct />
                <CheckoutProduct />
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
