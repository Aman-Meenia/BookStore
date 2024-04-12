import axios from "axios";
import { useContext, useState } from "react";
import { OrderContext } from "../store/order";
import toast from "react-hot-toast";

export const useGetAllPendingAndShipped = () => {
  const [loading, setLoading] = useState(false);
  const { pendingAndShipped, setPendingAndShipped } = useContext(OrderContext);

  const getAllPendingAndShipped = async () => {
    setLoading(true);

    await axios
      .get("/api/v1/order/getpendingandshipped")
      .then((response) => {
        // console.log(response.data);
        setPendingAndShipped(response.data.data);
      })
      .catch((err) => {
        toast.error(err.response.message.data, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  return { loading, getAllPendingAndShipped };
};
