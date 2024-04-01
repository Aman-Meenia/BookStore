import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import BooksContextProvider from "./store/books.jsx";
import BookDetailContextProvider from "./store/fetchForUpdate.jsx";
import CartContextProvider from "./store/cart.jsx";
import OrderContextProvider from "./store/order.jsx";
import ProfileContextProvider from "./store/profile.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   createRoutesFromElements,
// } from "react-router-dom";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import SendEmail from "./pages/SendEmailForgetPassword.jsx";
// import ResetPassword from "./pages/ResetPassword.jsx";
// import { Toaster } from "react-hot-toast";
// import Home from "./pages/home/Home.jsx";
// import BooksContextProvider from "./store/books.jsx";
// import Book from "./pages/book/Book.jsx";
// import Layout from "./pages/Layout.jsx";
// import Cart from "./pages/cart/Cart.jsx";
// import WishList from "./pages/wishList/WishList.jsx";
// import Checkout from "./pages/checkout/Checkout.jsx";
// import AdminHome from "./admin/AdminHome.jsx";
// import AddProduct from "./admin/AddProduct.jsx";
// import UpdateProduct from "./admin/UpdateProduct.jsx";
// import BookDetailContextProvider from "./store/fetchForUpdate.jsx";
// import ContactPage from "./pages/contact/ContactPage.jsx";
// import UserProfile from "./pages/profile/UserProfile.jsx";
// import CartContextProvider from "./store/cart.jsx";
// import Orders from "./pages/order/Orders.jsx";
// import OrderContextProvider from "./store/order.jsx";
// import ProfileContextProvider from "./store/profile.jsx";
// import AllBooks from "./admin/AllBooks.jsx";
// import UpdateBookAll from "./admin/UpdateBookAll.jsx";
// import UserDetails from "./admin/UserDetails.jsx";
//
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <BooksContextProvider>
    <BookDetailContextProvider>
      <CartContextProvider>
        <OrderContextProvider>
          <ProfileContextProvider>
            <BrowserRouter>
              <Toaster />
              <App />
            </BrowserRouter>
          </ProfileContextProvider>
        </OrderContextProvider>
      </CartContextProvider>
    </BookDetailContextProvider>
  </BooksContextProvider>,
);
