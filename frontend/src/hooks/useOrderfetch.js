import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { OrderContext } from "../store/order";

export const useOrderfetch = () => {
  const [loading, setLoading] = useState();
  const { setOrder } = useContext(OrderContext);

  const getOrders = async () => {
    setLoading(true);
    await axios
      .get("api/v1/order/getordersforuser")
      .then((response) => {
        setOrder(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { orderLoading: loading, getOrders };
};
