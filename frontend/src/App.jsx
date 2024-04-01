import { useContext, useEffect, useState } from "react";
import "./App.css";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   createRoutesFromElements,
// } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SendEmail from "./pages/SendEmailForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home.jsx";
import BooksContextProvider from "./store/books.jsx";
import Book from "./pages/book/Book.jsx";
import Layout from "./pages/Layout.jsx";
import Cart from "./pages/cart/Cart.jsx";
import WishList from "./pages/wishList/WishList.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import AdminHome from "./admin/AdminHome.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import UpdateProduct from "./admin/UpdateProduct.jsx";
import BookDetailContextProvider from "./store/fetchForUpdate.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import UserProfile from "./pages/profile/UserProfile.jsx";
import CartContextProvider from "./store/cart.jsx";
import Orders from "./pages/order/Orders.jsx";
import OrderContextProvider from "./store/order.jsx";
import ProfileContextProvider, { ProfileContext } from "./store/profile.jsx";
import AllBooks from "./admin/AllBooks.jsx";
import UpdateBookAll from "./admin/UpdateBookAll.jsx";
import UserDetails from "./admin/UserDetails.jsx";
import { useCheckUserAlreadyLogin } from "./hooks/useCheckUserAlreadyLogin.js";
import { Navigate, Route, Routes } from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/sendmail" element={<SendEmail />} />
//       <Route path="/forgetpassword/:id" element={<ResetPassword />} />
//       <Route path="/*" element={<Signup />} />
//       <Route path="/" element={<Layout />}>
//         <Route path="" element={<Home />} />
//         <Route path="/book/:id" element={<Book />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/wishlist" element={<WishList />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/profile" element={<UserProfile />} />
//         <Route path="/orders" element={<Orders />} />
//       </Route>
//
//       <Route path="/contact" element={<ContactPage />} />
//
//       {/* protected routes */}
//       <Route path="/admin/" element={<AdminHome />}>
//         <Route path="addbook" element={<AddProduct />} />
//         <Route path="updatebook" element={<UpdateProduct />} />
//         <Route path="allbooks" element={<AllBooks />} />
//         <Route path="allbooks/update-book/:title" element={<UpdateBookAll />} />
//         <Route path="usersdetails" element={<UserDetails />} />
//       </Route>
//     </Route>,
//   ),
// );

function App() {
  const { alreadyLoginUser, loading } = useCheckUserAlreadyLogin();
  const { alreadyLogin, setAlreadyLogin, adminLogin } =
    useContext(ProfileContext);

  useEffect(() => {
    const fun = async () => {
      await alreadyLoginUser();
    };
    fun();
  });
  // console.log("Already login user ", alreadyLoginUser);
  // console.log("Amdin login ", adminLogin);
  return (
    <>
      {loading && <div className="loader"></div>}
      <Routes>
        <Route
          path="/login"
          element={alreadyLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={alreadyLogin ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/sendmail" element={<SendEmail />} />
        <Route path="/forgetpassword/:id" element={<ResetPassword />} />
        <Route path="/*" element={<Signup />} />
        {alreadyLogin && (
          <Route path="/" element=<Layout />>
            <Route
              path=""
              element={alreadyLogin ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/book/:id"
              element={alreadyLogin ? <Book /> : <Navigate to="/login" />}
            />
            <Route
              path="/cart"
              element={alreadyLogin ? <Cart /> : <Navigate to="/login" />}
              // element={alreadyLogin ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="/wishlist"
              element={alreadyLogin ? <WishList /> : <Navigate to="/login" />}
            />
            <Route
              path="/checkout"
              element={alreadyLogin ? <Checkout /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={
                alreadyLogin ? <UserProfile /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/orders"
              element={alreadyLogin ? <Orders /> : <Navigate to="/login" />}
            />
          </Route>
        )}
        {/* <Route path="/contact" element={<ContactPage />} /> */}

        {/* protected routes */}

        {adminLogin && (
          <Route path="/admin/" element={<AdminHome />}>
            <Route
              path="addbook"
              element={adminLogin ? <AddProduct /> : <Navigate to="/login" />}
            />
            <Route
              path="updatebook"
              element={
                adminLogin ? <UpdateProduct /> : <Navigate to="/login" />
              }
            />
            <Route
              path="allbooks"
              element={adminLogin ? <AllBooks /> : <Navigate to="/login" />}
            />

            <Route
              path="allbooks/update-book/:title"
              element={
                adminLogin ? <UpdateBookAll /> : <Navigate to="/login" />
              }
            />
            <Route
              path="usersdetails"
              element={adminLogin ? <UserDetails /> : <Navigate to="/login" />}
            />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
