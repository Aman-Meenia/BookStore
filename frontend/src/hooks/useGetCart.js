import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../store/cart";
import { useContext } from "react";
import { useState } from "react";

export const userGetCart = () => {
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const getCart = async () => {
    setLoading(true);

    await axios
      .get("/api/v1/cart/getbooks")
      .then((response) => {
        console.log("response ");
        console.log(response);
        console.log("user Get cart first");

        setCart(response.data.cart);
      })
      .catch((err) => {
        return;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, getCart };
};
