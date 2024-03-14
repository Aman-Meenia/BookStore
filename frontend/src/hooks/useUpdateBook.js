import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

export const useUpdateBook = () => {
  const [loading, setLoading] = useState(false);

  const updateBook = async ({
    title,
    author,
    quantity,
    price,
    publisher,
    publishedOn,
    genre,
    description,
  }) => {
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

    await axios
      .post("/api/v1/book/updatebook", {
        title,
        author,
        quantity,
        price,
        publisher,
        publishedOn,
        genre,
        description,
      })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, updateBook };
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
  title = title.trim();
  author = author.trim();
  publisher = publisher.trim();
  publishedOn = publishedOn.trim();
  genre = genre.trim();
  description = description.trim();

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
    toast.error("All fields are required");
    return false;
  }
  return true;
};
