import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminHome = () => {
  return (
    <>
      <div className="flex bg-white">
        {/* Sidebar */}
        <Sidebar />

        <Outlet />
      </div>
    </>
  );
};

export default AdminHome;
