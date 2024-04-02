import React from "react";

const Order = ({ order }) => {
  // console.log(order);
  const mongoDate = new Date(order.books.createdAt);

  // Get the day, month, and year from the MongoDB date
  const day = mongoDate.getDate();
  const month = mongoDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = mongoDate.getFullYear();

  // Create a simple date string in the format DD/MM/YYYY
  const simpleDate = `${day}/${month}/${year}`;
  // console.log("Order funciton called");
  // console.log(order.books.bookDetails[0].title);
  return (
    <div className="lg:col-span-2 py-3 px-6 bg-white overflow-x-auto">
      <div className="bg-white divide-y">
        <div className="grid md:grid-cols-3 items-center gap-8 py-6 border p-6 border-gray-200">
          <div className="md:col-span-2 flex items-center gap-6">
            <div className="w-24 h-28 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] p-4">
              <img
                // src="http://res.cloudinary.com/dlvslvw2m/image/upload/v1710442693/Library/hvbimfnajy6ph5ikrh1t.webp"
                src={order.books.bookDetails[0].images}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#333] break-words">
                {order.books.bookDetails[0].title}
              </h3>
              <h6 className="text-md text-gray-500 mt-2">
                <strong className="ml-2">
                  {order.books.bookDetails[0].author}
                </strong>
              </h6>
            </div>
          </div>
          <div className="flex ">
            <div className="flex items-center ">
              <h4 className="text-lg font-bold text-[#333]">
                <span className="ml-2 text-gray-500"> ₹</span>

                {order.books.bookDetails[0].price}
              </h4>
            </div>
            <div className="flex items-center ml-auto ">
              <h4 className="text-lg font-bold text-[#333]">
                <span className="ml-2 text-gray-500"> Qty:</span>

                {order.books.quantity}
              </h4>
            </div>
            <div className="flex items-center ml-auto ">
              <h4 className="text-lg font-bold text-[#333]">{simpleDate}</h4>
            </div>
            <div className="flex items-center ml-auto ">
              <h4 className="text-lg font-bold text-[#333]">
                <span className="ml-2 text-gray-500"> status:</span>

                {order.status}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
