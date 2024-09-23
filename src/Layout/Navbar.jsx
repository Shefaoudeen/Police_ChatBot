import React, { useEffect, useState } from "react";
import { Home } from "../assets";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const id = useLocation();
  const [isHome, SetisHome] = useState(true);

  useEffect(() => {
    if (id.pathname != "/") SetisHome(false);
    else SetisHome(true);
  }, [id.pathname]);

  return (
    <div className="bg-[#171717] flex justify-center  items-center relative">
      <div
        className={`bg-white p-2 rounded-full absolute left-5 ${
          isHome ? "hidden" : ""
        }`}
      >
        <Link to="/">
          <img src={Home} className="max-w-[30px]" alt="" />
        </Link>
      </div>
      <h1 className="text-2xl font-semibold  tracking-widest p-5">
        <span className="text-3xl">P</span>UDUCHERRY{" "}
        <span className="text-3xl">P</span>OLICE
      </h1>
    </div>
  );
};

export default Navbar;
