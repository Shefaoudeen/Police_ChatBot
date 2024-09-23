import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen text-white">
      <Navbar />
      <div
        className="flex flex-1 bg-gradient-to-tr from-black
    via-green-900
    to-black animated-background"
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
