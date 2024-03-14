import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BookDetailContext } from "../store/fetchForUpdate";
export const UseGetBookByIdForUpdate = () => {
  const [loadingFetch, setLoading] = useState(false);

  const { bookDetail, setBookDetail } = useContext(BookDetailContext);

  const getData = async (title) => {
    setBookDetail({
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
    title = title.trim();
    if (!title) {
      toast.error("Title is required", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setLoading(true);
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

        setBookDetail({
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
  };
  return { loadingFetch, getData };
};
