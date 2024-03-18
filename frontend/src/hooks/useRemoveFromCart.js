import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../store/cart";

export const useRemoveFromCart = () => {
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const removeFromCart = async ({ bookId }) => {
    setLoading(true);
    await axios
      .delete(`/api/v1/cart/removebooks/${bookId}`)
      .then((response) => {
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        // console.log(cart);
        const newCart = cart.filter((book) => book.bookId._id !== bookId);
        // console.log("New cart");
        // console.log(newCart);
        setCart(newCart);
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

  return { loading, removeFromCart };
};
