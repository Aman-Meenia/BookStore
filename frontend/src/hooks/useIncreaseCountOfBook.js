import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CartContext } from "../store/cart";

export const useIncreaseCountOfBook = () => {
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const increaseCountOfBook = async ({ bookId }) => {
    setLoading(true);
    await axios
      .get(`api/v1/cart/increasequantity/${bookId}`)
      .then((response) => {
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setLoading(false);

        const updateCart = cart.map((book) => {
          if (book.bookId._id === bookId) {
            return { ...book, quantity: book.quantity + 1 };
          }
          return book;
        });

        setCart(updateCart);
      })
      .catch((err) => {
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

  return { increaseCountOfBook, increseCountLoading: loading };
};
