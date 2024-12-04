import React, { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-slate-200 max-md:text-sm max-md:pt-10 max-md:w-[75%]">
          Hi I'm JAC. Your jucial companion.{" "}
        </h1>
        <h1 className="text-6xl text-center leading-12 tracking-tight poppins-medium max-md:text-2xl">
          Get answers. Find Justice.
          <br /> Be more responsible.
        </h1>
        <h1 className="text-xl poppins-extralight max-md:text-sm max-md:px-5">
          This system designed to support legal professionals, courts, or
          individuals in handling judicial processes
        </h1>

        <div className="flex flex-col items-center gap-4  p-6 rounded-2xl max-w-[80%] max-md:max-w-[90%] text-justify ">
          <div className="flex  gap-8 flex-row max-md:flex-col">
            <div className="bg-[#292929]  text-xl rounded-xl  cursor-pointer hover:bg-black duration-200 transition-all flex-1 border border-green-400 hover:border-2 ease-linear">
              <Link
                to={"/conversion"}
                className="flex flex-col gap-6 px-8 py-4"
              >
                <h1 className="text-center text-lg font-bold">
                  Code Conversion
                </h1>
                <p className="text-sm">
                  A concise guide comparing the Indian Penal Code (IPC) and the
                  BNS and other codes, highlighting key laws, punishments, and
                  legal provisions.
                </p>
              </Link>
            </div>
            <div className="bg-[#292929]  text-xl rounded-xl  cursor-pointer hover:bg-black duration-200 transition-all flex-1 border border-green-400">
              <Link
                to={"/interactive"}
                className="flex flex-col gap-6 px-8 py-4"
              >
                <h1 className="text-center text-lg font-bold">
                  Instant Legal Aid
                </h1>
                <p className="text-sm">
                  A tool that identifies the closest and most relevant law based
                  on user input, whether in text, voice, or image form. It
                  provides immediate legal guidance tailored to your specific
                  situation.
                </p>
              </Link>
            </div>
            <div className="bg-[#292929]  text-xl rounded-xl  cursor-pointer hover:bg-black duration-200 transition-all flex-1 border border-green-400">
              <Link
                to={"/knowAll"}
                className="flex flex-col gap-6 px-8 py-4 h-full"
              >
                <h1 className="text-center text-lg font-bold">
                  Comprehensive Legal Comparison
                </h1>
                <p className="text-sm">
                  A detailed comparison of BNS, BNSS, and BSA, listing laws,
                  corresponding sections, and punishments in a structured table
                  format.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
