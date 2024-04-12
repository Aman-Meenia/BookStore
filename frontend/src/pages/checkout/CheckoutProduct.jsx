import React, { useContext } from "react";
import { CartContext } from "../../store/cart";

const CheckoutProduct = ({ book }) => {
  const { navBarCart, setNavBarCart } = useContext(CartContext);

  return (
    <>
      {/* <div className="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0"> */}
      {/*   <div className="relative h-full"> */}
      {/*     <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]"> */}

      <div className="space-y-6 mt-10 p-1">
        <div className="grid sm:grid-cols-2 items-start gap-6">
          {/* <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md"> */}
          {/*   <img src={book.bookId.images} className="w-full object-contain" /> */}
          {/* </div> */}

          <div className="w-32 h-22 shrink-0 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] p-4">
            <img
              src={book.bookId.images}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div>
            <h3 className="text-base text-white"> {book.bookId.title}</h3>
            <ul className="text-xs text-white space-y-3 mt-4">
              <li className="flex flex-wrap gap-4">
                Author<span className="ml-auto">{book.bookId.author}</span>
              </li>
              <li className="flex flex-wrap gap-4">
                Quantity <span className="ml-auto">{book.quantity}</span>
              </li>
              <li className="flex flex-wrap gap-4">
                Total Price{" "}
                <span className="ml-auto">
                  ₹{book.bookId.price * book.quantity}
                </span>
              </li>
            </ul>
          </div>

          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
          <div className="absolute left-0 bottom-0 bg-[#444] w-full p-4">
            <h4 className="flex flex-wrap gap-4 text-base text-white">
              Total <span className="ml-auto">₹{navBarCart.bill}</span>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutProduct;
