import { useContext, useState } from "react";
import { BooksContext } from "../store/books";
import toast from "react-hot-toast";
import axios from "axios";

export const useSearchBook = () => {
  const [loading, setLoading] = useState(false);
  const { searchBook, setSearchBook } = useContext(BooksContext);
  const searchBookFun = async () => {
    setLoading(true);

    await axios
      .get("/api/v1/book/searchbook")
      .then((response) => {
        setSearchBook(response.data.data);
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

  return {
    loading,
    searchBookFun,
  };
};
