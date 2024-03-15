import axios from "axios";
import toast from "react-hot-toast";
import { BooksContext } from "../store/books";
import { useContext, useState } from "react";

export const useGetBookById = () => {
  const [loading, setLoading] = useState(false);
  const { setSingleBook } = useContext(BooksContext);
  const getBookById = async ({ id }) => {
    if (!id) {
      return;
    }
    setLoading(true);
    await axios
      .get(`/api/v1/book/getbookbyid/${id}`)
      .then((response) => {
        setSingleBook(response.data.data);
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

  return { loading, getBookById };
};
