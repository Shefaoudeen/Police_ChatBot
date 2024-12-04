import React, { useEffect, useState } from "react";
import { arrow } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { BNS } from "../Data/BNS";
import { BNSS } from "../Data/BNSS";
import axios from "axios";

const KnowAll = () => {
  let navigation = useNavigate();
  const modesName = [
    "BHARATIYA NYAYA SANHITA (BNS)",
    "BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS)",
    "BASIC SHIKSHA ADHIKARI (BSA)",
  ];
  const [BSA, setBSA] = useState({});
  const modesSection = [BNS, BNSS, BNS];

  const [modeSeleted, setModeSelected] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/mode-3/?section_id=3&sub_section_id=0`)
      .then((res) => {
        setBSA(res.data);
        console.log(BSA);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center  w-full py-10 relative">
      <div className="absolute top-5 left-5">
        <button
          className="bg-green-400 px-4 py-1 rounded-full"
          onClick={() => {
            navigation(-1);
          }}
        >
          {" "}
          {"<Back />"}
        </button>
      </div>
      <div className="flex flex-col w-[75%] max-md:w-[100%] items-center gap-8 max-md:gap-5 max-md:pt-8">
        <h1 className="text-3xl poppins-regular">Important Sections</h1>
        <div className="flex gap-8 max-md:gap-5">
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
            onClick={() => {
              setModeSelected(3);
            }}
          >
            BSA
          </button>
        </div>
        <div className="text-center w-[75%] max-md:w-[100%] flex flex-col items-center justify-center">
          <h1>
            <h1 className="font-bold text-xl pb-10">
              {modesName[modeSeleted - 1]}
            </h1>
          </h1>
          <div className="flex flex-col gap-5 w-full max-md:w-[95%]">
            {modeSeleted === 3
              ? BSA?.sections?.map((ele, ind) => (
                  <div
                    className="bg-[#292929] text-xl max-md:text-sm p-5
              rounded-3xl flex flex-col items-start border gap-3 hover:border-green-400"
                    key={ind}
                  >
                    <h1>
                      <span
                        className={
                          ele?.color === null
                            ? "text-green-400"
                            : "text-red-500"
                        }
                      >
                        Serial Number :
                      </span>{" "}
                      {ele?.serial_number}
                    </h1>
                    <h1>
                      <span
                        className={
                          ele?.color === null
                            ? "text-green-400"
                            : "text-red-500"
                        }
                      >
                        Crime Description :
                      </span>{" "}
                      {ele?.crime_description}
                      {ele?.part}
                    </h1>

                    <div className="flex justify-evenly gap-5 w-full text-start">
                      <div className="w-full">
                        <h1>
                          <span
                            className={
                              ele?.color === null
                                ? "text-green-400"
                                : "text-red-500"
                            }
                          >
                            IEA Section :
                          </span>{" "}
                          {ele?.iea_section}
                        </h1>
                      </div>
                      <div className="w-full">
                        <h1>
                          <span
                            className={
                              ele?.color === null
                                ? "text-green-400"
                                : "text-red-500"
                            }
                          >
                            BSA Section :
                          </span>{" "}
                          {ele?.bsa_section}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))
              : modesSection[modeSeleted - 1].map((ele, ind) => {
                  return (
                    <div
                      key={ind}
                      className="bg-[#292929] text-xl max-md:text-sm p-5 transition-all duration-200
          rounded-3xl flex justify-between items-center border gap-4 hover:border-green-400"
                    >
                      <h1 className="text-start">{ele.Section}</h1>
                      <div className="bg-white hover:bg-green-400 cursor-pointer transition-all duration-200 rounded-full w-[30px] h-[30px] text-[#292929] flex justify-center items-center font-extrabold">
                        <Link
                          to={`/knowAllDetail/${modeSeleted}_${ele.Section_id}`}
                        >
                          <img src={arrow} className="min-w-[30px]" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowAll;
