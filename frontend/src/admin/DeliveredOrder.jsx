import React from "react";

const DeliveredOrder = ({ order }) => {
  // console.log(order.updatedAt);
  const mongoDate = new Date(order.updatedAt);
  // console.log(order.bookDetails[0].title);
  console.log(order);

  // Get the day, month, and year from the MongoDB date
  const day = mongoDate.getDate();
  const month = mongoDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = mongoDate.getFullYear();

  // Create a simple date string in the format DD/MM/YYYY
  const simpleDate = `${day}/${month}/${year}`;
  return (
    <>
      <div className="lg:col-span-2 py-3 px-6 bg-white overflow-x-auto">
        <div className="bg-white divide-y">
          <div className="flex  items-center gap-8 py-2  border px-6  border-gray-200">
            {/*     <div className="md:col-span-2 flex items-center gap-6"> */}

            <img
              className="  rounded-full w-32 h-32 max-w-full shadow-lg"
              // src="http://res.cloudinary.com/dlvslvw2m/image/upload/v1710442693/Library/hvbimfnajy6ph5ikrh1t.webp"
              src={order?.User[0]?.profilePic}
            />
            <div>
              <h6 className="text-md text-gray-500 mt-2">
                <strong className="ml-2">{order?.User[0]?.userName}</strong>
              </h6>
            </div>

            <div className="flex w-full justify-end gap-10  ">
              <div className="flex p-2">
                <h4 className="text-lg font-bold text-[#333]">
                  Book: {order?.bookDetails[0]?.title}
                </h4>
              </div>
              <div className="flex p-2">
                <h4 className="text-lg font-bold text-[#333]">
                  Qnt: {order?.books?.quantity}
                </h4>
              </div>{" "}
              <div className="flex p-2 ">
                <h4 className="text-lg font-bold text-[#333]">{simpleDate}</h4>{" "}
              </div>
              <div className="flex p-2">
                <h4 className="text-lg font-bold text-[#333]"> Delivered</h4>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveredOrder;
