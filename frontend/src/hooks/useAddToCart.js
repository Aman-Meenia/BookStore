import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { userGetCart } from "./useGetCart";
import { CartContext } from "../store/cart";

export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);

  const { cart, setCart } = useContext(CartContext);

  const addToCart = async ({ bookId }) => {
    setLoading(true);

    await axios
      .post("/api/v1/cart/addbooks", { bookId })
      .then((response) => {
        // console.log(response.data);
        setCart(response.data.cart);
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
  return { loadingAddToCart: loading, addToCart };
};
