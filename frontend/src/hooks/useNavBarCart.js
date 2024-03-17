import axios from "axios";
import toast from "react-hot-toast";
import { BooksContext } from "../store/books";
import { useContext, useState } from "react";
import { CartContext } from "../store/cart";

export const useNavBarCart = () => {
  const { navBarCart, setNavBarCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const getbillNavBar = async () => {
    setLoading(true);

    await axios
      .get("/api/v1/cart/bill")
      .then((response) => {
        setNavBarCart({
          bill: response.data.bill,
          quantity: response.data.quantity,
        });
      })
      .catch((err) => {
        console.log(err.response);
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

  return { loading, getbillNavBar };
};
