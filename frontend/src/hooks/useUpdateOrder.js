import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useUpdateOrder = () => {
  const [loading, setLoading] = useState(false);
  const updateOrder = async ({ status, id }) => {
    setLoading(true);

    axios
      .post(`/api/v1/order/updatestatus/${id}`, {
        status,
      })
      .then((response) => {
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  return { updateLoading: loading, updateOrder };
};
