import React, { useContext, useEffect } from "react";
import DeliveredOrder from "./DeliveredOrder";

import { OrderContext } from "../store/order";
import { useGetDeliveredOrder } from "../hooks/useGetDeliveredOrder";

const DeliveredOrders = () => {
  const { loading, getDeliveredOrder } = useGetDeliveredOrder();
  const { deliveredOrder, setDeliveredOrder } = useContext(OrderContext);

  useEffect(() => {
    const fun = async () => {
      await getDeliveredOrder();
    };
    fun();
  }, []);
  console.log("Hello Aman Meenia");
  console.log(deliveredOrder);

  return (
    <>
      <div className="font-[sans-serif] w-full md:w-full lg:w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 flex justify-center mt-4">
          Orders Delivered
        </h1>
        <div className="grid">
          {deliveredOrder &&
            deliveredOrder.length > 0 &&
            deliveredOrder.map((order, index) => (
              <DeliveredOrder key={index} order={order} />
            ))}
        </div>
      </div>
    </>
  );
};

export default DeliveredOrders;
