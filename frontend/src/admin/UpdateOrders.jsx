import React, { useContext, useEffect } from "react";

import UpdateOrder from "./UpdateOrder";
import { useGetAllPendingAndShipped } from "../hooks/useGetAllPendingAndShipped";
import { OrderContext } from "../store/order";

const UpdateOrders = () => {
  const { loading, getAllPendingAndShipped } = useGetAllPendingAndShipped();
  const { pendingAndShipped } = useContext(OrderContext);

  useEffect(() => {
    const fun = () => {
      getAllPendingAndShipped();
    };

    fun();
  }, []);

  return (
    <>
      <div className="font-[sans-serif] w-full md:w-full lg:w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 flex justify-center mt-4">
          {" "}
          Update Orders
        </h1>
        <div className="grid">
          {pendingAndShipped &&
            pendingAndShipped.length > 0 &&
            pendingAndShipped.map((order, index) => (
              <UpdateOrder key={index} order={order} />
            ))}
        </div>
      </div>
    </>
  );
};

export default UpdateOrders;
