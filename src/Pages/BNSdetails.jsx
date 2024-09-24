import React from "react";
import { BNS } from "../Data/BNS";
import { Link } from "react-router-dom";
import { arrow } from "../assets";

const BNSdetails = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen py-10">
      <h1 className="font-bold text-xl pb-10">BHARATIYA NYAYA SANHITA (BNS)</h1>
      <div className="flex flex-col gap-5 w-[50%] max-md:w-[90%]">
        {BNS.map((ele, ind) => (
          <div
            key={ind}
            className="bg-[#292929] text-xl max-md:text-sm p-5 transition-all duration-200
          rounded-3xl flex justify-between items-center border hover:border-green-400"
          >
            <h1>{ele.Section}</h1>
            <div className="bg-white hover:bg-green-400 cursor-pointer transition-all duration-200 rounded-full w-[30px] h-[30px] text-[#292929] flex justify-center items-center font-extrabold">
              <Link to={`/bnsDetails/${ele.Section_id}`}>
                <img src={arrow} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BNSdetails;
