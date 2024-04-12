import React, { useContext, useEffect } from "react";
import Cards from "./home/Cards";
import { useGetMostSelling } from "../hooks/useGetMostSelling";
import { BooksContext } from "../store/books";

const BestSelling = () => {
  const { loadingMostSelling, getMostSelling } = useGetMostSelling();
  const { books } = useContext(BooksContext);
  useEffect(() => {
    const fun = async () => {
      await getMostSelling();
    };
    fun();
  }, []);
  return <>{books && <Cards type={"Best Selling"} />}</>;
};

export default BestSelling;
