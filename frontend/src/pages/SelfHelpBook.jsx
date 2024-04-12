import React, { useContext, useEffect } from "react";
import Cards from "./home/Cards";
import { BooksContext } from "../store/books";
import { useGetGenreBook } from "../hooks/useGetGenreBook";

const SelfHelpBook = () => {
  const { books } = useContext(BooksContext);
  const { getGenreBooks, loading } = useGetGenreBook();
  useEffect(() => {
    // console.log("Hello aman");
    const fun = async () => {
      await getGenreBooks("Self-help book");
    };
    fun();
  }, []);

  return <>{books && <Cards type="Self-Help" />}</>;
};

export default SelfHelpBook;
