import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BooksContext } from "../store/books";

export const useGetMostSelling = () => {
  const [loading, setLoading] = useState(false);
  const { books, setBooks } = useContext(BooksContext);

  const getMostSelling = async () => {
    setLoading(true);
    await axios
      .get("/api/v1/book/mostselling")
      .then((response) => {
        setBooks(response.data.data);
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

  return { loadingMostSelling: loading, getMostSelling };
};
