import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useGetGenreBook } from "../hooks/useGetGenreBook";
import { BooksContext } from "../store/books";
import Cards from "./home/Cards";
const FictionBook = () => {
  const { books } = useContext(BooksContext);
  const { getGenreBooks, loading } = useGetGenreBook();
  useEffect(() => {
    // console.log("Hello aman");
    const fun = async () => {
      await getGenreBooks("Fiction");
    };
    fun();
  }, []);

  return <>{books && <Cards />}</>;
};

export default FictionBook;
