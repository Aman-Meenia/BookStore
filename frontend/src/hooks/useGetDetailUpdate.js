import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BookDetailContext } from "../store/fetchForUpdate";
import { BooksContext } from "../store/books";
export const UseGetDetailUpdate = () => {
  const [loadingFetch, setLoading] = useState(false);
  const [present, setPresent] = useState(false);

  const { bookDetailAll, setBookDetailAll } = useContext(BooksContext);

  const getDataAll = async (title) => {
    console.log("works");
    setBookDetailAll({
      title: "",
      author: "",
      quantity: "",
      price: "",
      publisher: "",
      publishedOn: "",
      genre: "",
      description: "",
      images: "",
    });
    console.log("title is " + title);
    setLoading(true);
    console.log("Hello");

    await axios
      .post("/api/v1/book/getbookdetail", { title })
      .then((response) => {
        console.log(response.data.data);
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setPresent(true);
        console.log(response.data.data.description);
        setBookDetailAll({
          title: response.data.data.title,
          author: response.data.data.author,
          quantity: response.data.data.quantity,
          price: response.data.data.price,
          genre: response.data.data.genre,
          publisher: response.data.data.publisher,
          publishedOn: response.data.data.publishedOn,
          description: response.data.data.description,
          images: response.data.data.images,
        });
        console.log(bookDetailAll);
        console.log("Data fetched successfully");
      })
      .catch((err) => {
        console.log(err.response.data.message);
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

    console.log("Hello Aman Meenia");
  };
  return { loadingFetch, getDataAll, present };
};
