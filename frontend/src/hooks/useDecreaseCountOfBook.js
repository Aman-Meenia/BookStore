import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/cart";
export const useDecreaseCountOfBook = () => {
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const decreaseCountOfBook = async ({ bookId }) => {
    setLoading(true);
    await axios
      .get(`api/v1/cart/decreasequantity/${bookId}`)
      .then((response) => {
        toast.success(response.data.message);
        // console.log(response.data.cart);
        // setCart(response.data.cart);
        // const newCart = response.data.cart;
        const updatedCart = cart.map((book) => {
          if (book.bookId._id === bookId) {
            return { ...book, quantity: book.quantity - 1 };
          }
          return book;
        });
        // console.log("updated cart");
        // console.log(updatedCart);
        setCart(updatedCart);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { decreaseCountLoading: loading, decreaseCountOfBook };
};
