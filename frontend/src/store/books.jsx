import React, { useState } from "react";
export const BooksContext = React.createContext();

const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [singleBook, setSingleBook] = useState({});

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        singleBook,
        setSingleBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
