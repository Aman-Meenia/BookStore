import axios from "axios";
import toast from "react-hot-toast";
import { BooksContext } from "../store/books";
import { useContext, useState } from "react";

export const useGetBookById = () => {
  const [loading, setLoading] = useState(false);
  const { setSingleBook } = useContext(BooksContext);
  const getBookById = async ({ id }) => {
    console.log("id is " + id);
    if (!id) {
      return;
    }
    setLoading(true);
    await axios
      .get(`/api/v1/book/getbookbyid/${id}`)
      .then((response) => {
        console.log("Book fetched successfully");
        console.log(response.data.data);

        setSingleBook(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log("Error while fetchign book details");
        toast.error("Error while fetching book details");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, getBookById };
};
