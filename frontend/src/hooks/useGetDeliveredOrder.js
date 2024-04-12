import { useContext, useState } from "react";
import { OrderContext } from "../store/order";
import axios from "axios";
import toast from "react-hot-toast";

export const useGetDeliveredOrder = () => {
  const [loading, setLoading] = useState(false);
  const { deliveredOrder, setDeliveredOrder } = useContext(OrderContext);

  const getDeliveredOrder = async () => {
    setLoading(true);

    await axios
      .get("/api/v1/order/getdeliveredorders")
      .then((response) => {
        // console.log(response.data);
        setDeliveredOrder(response.data.data);
      })
      .catch((err) => {
        // console.log(err);
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

  return { loading, getDeliveredOrder };
};
