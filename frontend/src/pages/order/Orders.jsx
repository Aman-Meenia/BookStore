import React, { useContext, useEffect } from "react";
import Order from "./Order";
import { useOrderfetch } from "../../hooks/useOrderfetch";
import { OrderContext } from "../../store/order";

const Orders = () => {
  const { orderLoading, getOrders } = useOrderfetch();

  const { order } = useContext(OrderContext);

  useEffect(() => {
    const fun = async () => {
      await getOrders();
    };
    fun();
  }, []);
  console.log("ORDER FUNCITON CALLED");
  // console.log("Order is");
  // console.log(order);
  return (
    <>
      {orderLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="font-sans w-full">
        <div>
          {!order || !order.length ? (
            <div className=" bg-white w-full h-screen items-center">
              <h1 className="text-2xl font-bold bg-white text-black p-4 w-full ">
                No Orders{" "}
              </h1>
            </div>
          ) : (
            <h2 className="text-2xl font-bold bg-white text-black p-4">
              Order History
            </h2>
          )}

          {/* <h1 className="> */}
          {/*   {" "} */}
          {/*   Order History */}
          {/* </h1> */}
        </div>
        {/*  Order */}

        {order &&
          order.length > 0 &&
          order.map((order, index) => <Order key={index} order={order} />)}
      </div>
    </>
  );
};

export default Orders;
