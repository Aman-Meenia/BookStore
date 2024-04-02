import { useContext, useState } from "react";
import { BooksContext } from "../store/books";
import axios from "axios";
import toast from "react-hot-toast";

export const useGetGenreBook = () => {
  const [loading, setLoading] = useState(true);
  const { books, setBooks } = useContext(BooksContext);

  const getGenreBooks = async (genre) => {
    setLoading(true);
    console.log(genre);
    await axios
      .get(`/api/v1/book/getbygenre/${genre}`)
      .then((response) => {
        console.log(response.data.data);
        setBooks(response.data.data);
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
  return { loading, getGenreBooks };
};
