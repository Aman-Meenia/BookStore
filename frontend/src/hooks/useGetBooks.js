import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BooksContext } from "../store/books";
import { useContext } from "react";

export const useGetBooks = () => {
  const [loading, setLoading] = useState(false);
  const { books, setBooks } = useContext(BooksContext);

  const getBooks = async () => {
    setLoading(true);
    console.log("Get books called");
    await axios
      .get("/api/v1/book/getbooks")
      .then((response) => {
        // console.log(response);
        setBooks(response.data.data);
      })
      .catch((err) => {
        console.log("Error in get Books Controller " + err);
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
