import React, { useState } from "react";
import { arrow } from "../assets";
import { Link } from "react-router-dom";
import { BNS } from "../Data/BNS";

const KnowAll = () => {
  const modesName = [
    "BHARATIYA NYAYA SANHITA (BNS)",
    "BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS)",
    "BASIC SHIKSHA ADHIKARI (BSA)",
  ];

  const [modeSeleted, setModeSelected] = useState(1);

  return (
    <div className="flex justify-center items-center w-full py-10">
      <div className="flex flex-col items-center gap-8 ">
        <h1 className="text-3xl poppins-regular">Important Sections</h1>
        <div className="flex gap-8">
          <button
            className={`${
              modeSeleted === 1 ? "bg-green-400" : "bg-[#171717]"
            } text-white px-8 py-3 rounded-2xl`}
            onClick={() => setModeSelected(1)}
          >
            BNS
          </button>
          <button
            className={`${
              modeSeleted === 2 ? "bg-green-400" : "bg-[#171717]"
            } text-white px-8 py-3 rounded-2xl`}
            onClick={() => setModeSelected(2)}
          >
            BNSS
          </button>
          <button
            className={`${
              modeSeleted === 3 ? "bg-green-400" : "bg-[#171717]"
            } text-white px-8 py-3 rounded-2xl`}
            onClick={() => setModeSelected(3)}
          >
            BSA
          </button>
        </div>
        <div className="text-center">
          <h1>
            <h1 className="font-bold text-xl pb-10">
              {modesName[modeSeleted - 1]}
            </h1>
          </h1>
          <div className="grid grid-cols-3 gap-10  max-md:w-[90%] pb-10 px-[100px]">
            {BNS.map((ele, ind) => (
              <div
                key={ind}
                className="bg-[#292929] text-md max-md:text-sm p-4 transition-all duration-200
          rounded-3xl flex gap-4 justify-between  items-center border hover:border-green-400"
              >
                <h1 className="text-justify">{ele.Section}</h1>
                <div className="bg-white hover:bg-green-400 cursor-pointer transition-all duration-200 rounded-full w-[30px] h-[30px] text-[#292929] flex justify-center items-center font-extrabold">
                  <Link to={`/bnsDetails/${ele.Section_id}`}>
                    <img src={arrow} className="min-w-[30px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowAll;
