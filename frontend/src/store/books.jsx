import React, { useState } from "react";
export const BooksContext = React.createContext();

const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [singleBook, setSingleBook] = useState({});
  const [adminBooks, setAdminBooks] = useState({});
  const [bookDetailAll, setBookDetailAll] = useState({});
  const [searchBook, setSearchBook] = useState({});

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        singleBook,
        setSingleBook,
        adminBooks,
        setAdminBooks,
        bookDetailAll,
        setBookDetailAll,
        searchBook,
        setSearchBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
