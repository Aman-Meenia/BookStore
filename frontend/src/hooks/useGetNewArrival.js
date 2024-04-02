import { useContext, useState } from "react";
import { BooksContext } from "../store/books";
import toast from "react-hot-toast";
import axios from "axios";

export const useGetNewArrival = () => {
  const [loading, setLoading] = useState();

  const { books, setBooks } = useContext(BooksContext);
  const getBooks = async () => {
    setLoading(true);
    await axios
      .get("/api/v1/book/latest")
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

  return { loading, getBooks };
};
