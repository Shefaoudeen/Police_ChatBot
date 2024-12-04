import React, { useEffect, useState } from "react";
import { Home } from "../assets";
import { Link, useLocation, useParams } from "react-router-dom";

const Navbar = () => {
  const loc = useLocation();
  const { id } = useParams();
  const [isHome, SetisHome] = useState(true);

  useEffect(() => {
    if (loc.pathname != "/") SetisHome(false);
    else SetisHome(true);
    if (loc.pathname == `/bnsDetails/${id}`) console.log("hi");
  }, [loc.pathname]);

  return (
    <div className="bg-[#171717] flex justify-center  items-center relative">
      <div
        className={`bg-white p-2 rounded-full absolute left-5 ${
          isHome ? "hidden" : ""
        }`}
      >
        <Link to="/">
          <img src={Home} className="max-w-[30px] max-md:max-w-[20px]" alt="" />
        </Link>
      </div>
      <h1 className="text-2xl font-semibold  tracking-widest p-5 max-md:text-xl">
        <span className="text-3xl max-md:text-2xl">P</span>UDUCHERRY{" "}
        <span className="text-3xl max-md:text-2xl">P</span>OLICE
      </h1>
    </div>
  );
};

export default Navbar;
