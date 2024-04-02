import React, { useContext, useEffect } from "react";

import Cards from "./home/Cards";
import { BooksContext } from "../store/books";
import { useGetNewArrival } from "../hooks/useGetNewArrival";
import { useGetGenreBook } from "../hooks/useGetGenreBook";

const NewArrivals = () => {
  const { books } = useContext(BooksContext);

  const { loading, getBooks } = useGetNewArrival();
  useEffect(() => {
    const fun = async () => {
      await getBooks();
    };
    fun();
  }, []);

  return <>{books && <Cards />}</>;
};

export default NewArrivals;
