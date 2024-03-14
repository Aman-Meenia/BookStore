import React, { useState } from "react";

export const BookDetailContext = React.createContext();

export const BookDetailContextProvider = ({ children }) => {
  const [bookDetail, setBookDetail] = useState({
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
  return (
    <BookDetailContext.Provider value={{ bookDetail, setBookDetail }}>
      {children}
    </BookDetailContext.Provider>
  );
};

export default BookDetailContextProvider;
