import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useStockCheck = () => {
  const [loading, setLoading] = useState(false);

  const checkStock = async () => {
    setLoading(true);

    await axios
      .get("api/v1/cart/checkbookavailable")
      .then((response) => {
        window.location.href = "/checkout";
      })
      .catch((err) => {
        const message = err.response.data.unavailableBooks;
        toast.error(message + " is out of stock", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        console.log(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { checkStockLoading: loading, checkStock };
};
