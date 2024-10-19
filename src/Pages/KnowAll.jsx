import React, { useState } from "react";
import { arrow } from "../assets";
import { Link } from "react-router-dom";
import { BNS } from "../Data/BNS";
import { BNSS } from "../Data/BNSS";

const KnowAll = () => {
  const modesName = [
    "BHARATIYA NYAYA SANHITA (BNS)",
    "BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS)",
    "BASIC SHIKSHA ADHIKARI (BSA)",
  ];
  const modesSection = [BNS, BNSS, BNS];

  const [modeSeleted, setModeSelected] = useState(1);

  return (
    <div className="flex justify-center  w-full py-10">
      <div className="flex flex-col w-[75%] items-center gap-8 ">
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
        <div className="text-center w-[75%]">
          <h1>
            <h1 className="font-bold text-xl pb-10">
              {modesName[modeSeleted - 1]}
            </h1>
          </h1>
          <div className="flex flex-col gap-5 w-full max-md:w-[90%]">
            {modesSection[modeSeleted - 1].map((ele, ind) => (
              <div
                key={ind}
                className="bg-[#292929] text-xl max-md:text-sm p-5 transition-all duration-200
          rounded-3xl flex justify-between items-center border hover:border-green-400"
              >
                <h1>{ele.Section}</h1>
                <div className="bg-white hover:bg-green-400 cursor-pointer transition-all duration-200 rounded-full w-[30px] h-[30px] text-[#292929] flex justify-center items-center font-extrabold">
                  <Link to={`/bnsDetails/${modeSeleted}_${ele.Section_id}`}>
                    <img src={arrow} />
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
