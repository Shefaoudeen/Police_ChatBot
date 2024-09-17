import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen text-white">
      <Navbar />
      <div className="flex flex-1 bg-black">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
