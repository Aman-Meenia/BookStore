import React, { useContext } from "react";
import Cards from "./Cards";
import Links from "./Links";
import { useEffect } from "react";
import { useGetBooks } from "../../hooks/useGetBooks";
import { BooksContext } from "../../store/books";

const Home = () => {
  const { loading, getBooks } = useGetBooks();
  const { books, setBooks } = useContext(BooksContext);
  useEffect(() => {
    const getBooksFun = async () => {
      await getBooks();
    };

    getBooksFun();
  }, []);
  return (
    <>
      <Links />

      {books && <Cards />}
    </>
  );
};

export default Home;
