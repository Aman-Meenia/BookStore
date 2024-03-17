import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { userGetCart } from "./useGetCart";

export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);

  const { cart, setCart } = userGetCart();

  const addToCart = async ({ bookId }) => {
    setLoading(true);

    await axios
      .post("/api/v1/cart/addbooks", { bookId })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);

        // setCart(newCart);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { loadingAddToCart: loading, addToCart };
};
