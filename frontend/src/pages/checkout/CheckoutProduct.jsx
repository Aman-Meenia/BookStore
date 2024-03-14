import React from "react";

const CheckoutProduct = () => {
  return (
    <>
      {/* <div className="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0"> */}
      {/*   <div className="relative h-full"> */}
      {/*     <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]"> */}

      <div className="space-y-6 mt-10">
        <div className="grid sm:grid-cols-2 items-start gap-6">
          <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md">
            <img
              src="https://readymadeui.com/images/product10.webp"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base text-white">Naruto: Split Sneakers</h3>
            <ul className="text-xs text-white space-y-3 mt-4">
              <li className="flex flex-wrap gap-4">
                Size <span className="ml-auto">37</span>
              </li>
              <li className="flex flex-wrap gap-4">
                Quantity <span className="ml-auto">2</span>
              </li>
              <li className="flex flex-wrap gap-4">
                Total Price <span className="ml-auto">$40</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 items-start gap-6">
          <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md">
            <img
              src="https://readymadeui.com/images/product11.webp"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base text-white">VelvetGlide Boots</h3>
            <ul className="text-xs text-white space-y-3 mt-4">
              <li>
                Size <span className="float-right">37</span>
              </li>
              <li>
                Quantity <span className="float-right">2</span>
              </li>
              <li>
                Total Price <span className="float-right">$40</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 items-start gap-6">
          <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md">
            <img
              src="https://readymadeui.com/images/product14.webp"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base text-white">Echo Elegance</h3>
            <ul className="text-xs text-white space-y-3 mt-4">
              <li>
                Size <span className="float-right">37</span>
              </li>
              <li>
                Quantity <span className="float-right">2</span>
              </li>
              <li>
                Total Price <span className="float-right">$40</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 items-start gap-6">
          <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md">
            <img
              src="https://readymadeui.com/images/product13.webp"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base text-white">Pumps</h3>
            <ul className="text-xs text-white space-y-3 mt-4">
              <li>
                Size <span className="float-right">37</span>
              </li>
              <li>
                Quantity <span className="float-right">2</span>
              </li>
              <li>
                Total Price <span className="float-right">$40</span>
              </li>
            </ul>
          </div>
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
          <div className="absolute left-0 bottom-0 bg-[#444] w-full p-4">
            <h4 className="flex flex-wrap gap-4 text-base text-white">
              Total <span className="ml-auto">$84.00</span>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutProduct;
