import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export const useAddBook = () => {
  const [loading, setLoading] = useState(false);

  const addBook = async (
    {
      title,
      author,
      quantity,
      price,
      publisher,
      publishedOn,
      genre,
      description,
    },
    file,
  ) => {
    const validation = checkValidation({
      title,
      author,
      quantity,
      price,
      publisher,
      publishedOn,
      genre,
      description,
    });

    if (!validation) return;
    setLoading(true);

    // sending form data along with file
    const formData = new FormData();
    formData.append("file", file);

    formData.append("title", title);
    formData.append("author", author);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("publisher", publisher);
    formData.append("publishedOn", publishedOn);
    formData.append("genre", genre);
    formData.append("description", description);

    await axios
      .post("/api/v1/book/addbook", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });

    setLoading(false);
  };

  return { loading, addBook };
};

const checkValidation = ({
  title,
  author,
  quantity,
  price,
  publisher,
  publishedOn,
  genre,
  description,
}) => {
  if (
    !title ||
    !author ||
    !quantity ||
    !price ||
    !publisher ||
    !publishedOn ||
    !genre ||
    !description
  ) {
    // console.log("title " + title);
    // console.log("author " + author);
    // console.log("quantity " + quantity);
    // console.log("price " + price);
    // console.log("publisher " + publisher);
    // console.log("publishedOn " + publishedOn);
    // console.log("genre " + genre);
    // console.log("description " + description);
    //
    toast.error("All fields are required");
    return false;
  }
  return true;
};
