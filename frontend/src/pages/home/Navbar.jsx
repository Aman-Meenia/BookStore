import React, { useContext, useEffect } from "react";
import Links from "./Links";
import { useNavBarCart } from "../../hooks/useNavBarCart";
import { CartContext } from "../../store/cart";
import { Link } from "react-router-dom";
import { userGetCart } from "../../hooks/useGetCart";
import { useGetInfo } from "../../hooks/useGetInfo";
import { ProfileContext } from "../../store/profile";
import { useLogout } from "../../hooks/useLogout";
const Navbar = () => {
  const { navBarCart, setNavBarCart } = useContext(CartContext);

  const { getbillNavBar } = useNavBarCart();
  const { loading, getCart } = userGetCart();
  const { cart, setCart } = useContext(CartContext);
  const { profile, setProfile } = useContext(ProfileContext);

  const { getInfoLoading, getInfo } = useGetInfo();

  // Also change when cart is updated
  useEffect(() => {
    const fun = async () => {
      await getbillNavBar();
      await getInfo();
    };
    fun();
  }, [cart, setCart]);

  const handleOpenCart = async () => {
    await getCart();
  };

  // Logout user
  const { logoutLoading, logout } = useLogout();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Book Store
          </Link>
        </div>

        {/* search bar  */}
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>

        {/* Cart  */}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {navBarCart.quantity}
                </span>
              </div>
            </div>

            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  Items: {navBarCart.quantity}
                </span>
                <span className="text-info">Subtotal: ₹{navBarCart.bill}</span>
                <Link to="/Cart">
                  <div className="card-actions">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleOpenCart}
                    >
                      Cart
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* profile  */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Profile Pic" src={profile?.profilePic} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
