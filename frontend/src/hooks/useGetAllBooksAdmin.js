import toast from "react-hot-toast";
import { BooksContext } from "../store/books";
import { useContext, useState } from "react";
import axios from "axios";
export const useGetAllBooksAdmin = () => {
  const [loading, setLoading] = useState(false);

  const { adminBooks, setAdminBooks } = useContext(BooksContext);

  const getAllBooksAdmin = async () => {
    setLoading(true);
    await axios
      .get("/api/v1/book/getbooksadmin")
      .then((response) => {
        setAdminBooks(response.data.data);
        console.log(response.data.data);
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

  return { loading, getAllBooksAdmin };
};
