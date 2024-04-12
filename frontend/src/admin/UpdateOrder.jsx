import React, { useState } from "react";
import { useUpdateOrder } from "../hooks/useUpdateOrder";

const UpdateOrder = ({ order }) => {
  console.log(order?.profilePic[0]);

  const mongoDate = new Date(order.createdAt);

  // Get the day, month, and year from the MongoDB date
  const day = mongoDate.getDate();
  const month = mongoDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = mongoDate.getFullYear();

  // Create a simple date string in the format DD/MM/YYYY
  const simpleDate = `${day}/${month}/${year}`;
  const user = {};
  console.log(order.status);

  const [newStatus, setNewStatus] = useState(order.status);
  console.log("new status ", newStatus);
  const { updateLoading, updateOrder } = useUpdateOrder();

  const handleUpdate = async (e) => {
    e.preventDefault();

    updateOrder({ status: newStatus, id: order._id });
  };

  return (
    <>
      <div className="lg:col-span-2 py-3 px-6 bg-white overflow-x-auto">
        <div className="bg-white divide-y">
          <div className="flex  items-center gap-8 py-2  border px-6  border-gray-200">
            {/*     <div className="md:col-span-2 flex items-center gap-6"> */}

            <img
              className="  rounded-full w-32 h-32 max-w-full shadow-lg"
              // src="http://res.cloudinary.com/dlvslvw2m/image/upload/v1710442693/Library/hvbimfnajy6ph5ikrh1t.webp"
              src={order?.profilePic[0]}
              // src={user?.user[0]?.profilePic}
            />
            <div>
              <h6 className="text-md text-gray-500 mt-2">
                <strong className="ml-2">{order?.userName}</strong>
              </h6>
            </div>

            <div className="flex w-full justify-end gap-10  ">
              <div className="flex p-2">
                <h4 className="text-lg font-bold text-[#333]">
                  {" "}
                  Book: {order.title}
                </h4>
              </div>{" "}
              <div className="flex p-2">
                <h4 className="text-lg font-bold text-[#333]">
                  {" "}
                  Qnt: {order.quantity}
                </h4>
              </div>{" "}
              <div className="flex p-2 ">
                <h4 className="text-lg font-bold text-[#333]">{simpleDate}</h4>{" "}
              </div>
              <div className="flex">
                <select
                  id="selection"
                  className="text-lg font-bold text-[#333] bg-white"
                  name="selection"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  {/* enum: ["pending", "shipped", "completed", "cancelled"], */}
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex">
                <button onClick={handleUpdate} className="btn  btn-info">
                  Update
                </button>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
