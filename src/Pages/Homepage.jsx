import React, { useState } from "react";

const Homepage = () => {
  const [mode, SetMode] = useState(null);
  const [modeButton, SetModeButton] = useState(false);

  const queries = [
    "Type your queries related to IPC and BNS and get answered",
    "Type your queries related to Instant Legal Aid and get answered",
    "Type your queries related to Comprehensive Legal Comparison and get answered",
  ];

  return (
    <div className="flex flex-col gap-4 text-center justify-center items-center w-screen">
      <h1 className="font-bold md:text-4xl text-2xl">How can I help you ?</h1>
      <h1 className="text-slate-200 max-md:text-xs max-md:w-[75%]">
        Hi I'm JAC. Your jucial companion. {mode == null ? "" : queries[mode]}
      </h1>
      <div className="flex max-w-[80%] md:gap-10 max-md:flex-col max-md:gap-5">
        <div
          className={` ${
            mode == 0 ? "border-4" : "border-2"
          } cursor-pointer p-5 flex flex-col gap-5 max-w-[30%] border-green-400 rounded-xl bg-[#292929] md:min-h-[275px] max-md:max-w-[100%] `}
          onClick={() => SetMode(0)}
        >
          <h1 className="font-bold md:text-2xl">IPC and BNS Conversion</h1>
          <p className="flex-1 text-justify max-md:text-xs">
            A concise guide comparing the Indian Penal Code (IPC) and the BNS,
            highlighting key laws, punishments, and legal provisions.
          </p>
          <div className={`flex ${mode == 0 ? "" : "hidden"}`}>
            <button className="bg-white text-[#292929] py-2 px-4 rounded-full">
              Know More
            </button>
          </div>
        </div>
        <div
          className={` ${
            mode == 1 ? "border-4" : "border-2"
          } cursor-pointer p-5 flex flex-col gap-5 max-w-[30%] border-green-400 rounded-xl bg-[#292929] max-md:max-w-[100%]`}
          onClick={() => SetMode(1)}
        >
          <h1 className="font-bold md:text-2xl">Instant Legal Aid</h1>
          <p className="flex-1 text-justify max-md:text-xs">
            A tool that identifies the closest and most relevant law based on
            user input, whether in text, voice, or image form. It provides
            immediate legal guidance tailored to your specific situation.
          </p>
          <div className={`flex ${mode == 1 ? "" : "hidden"}`}>
            <button className="bg-white text-[#292929] py-2 px-4 rounded-full">
              Know More
            </button>
          </div>
        </div>
        <div
          className={` ${
            mode == 2 ? "border-4" : "border-2"
          } cursor-pointer p-5 flex flex-col gap-5 max-w-[30%] border-green-400 rounded-xl bg-[#292929] max-md:max-w-[100%] `}
          onClick={() => SetMode(2)}
        >
          <h1 className="font-bold md:text-2xl">
            Comprehensive Legal Comparison
          </h1>
          <p className="flex-1 text-justify max-md:text-xs">
            A detailed comparison of BNS, BNSS, and BSA, listing laws,
            corresponding sections, and punishments in a structured table
            format.
          </p>
          <div className={`flex ${mode == 2 ? "" : "hidden"}`}>
            <button className="bg-white text-[#292929] py-2 px-4 rounded-full">
              Know More
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:w-[80%] mt-6 ${
          mode != null ? "bg-white" : "bg-[#292929]"
        } flex px-2 gap-4 py-2 rounded-2xl relative max-md:fixed max-md:bottom-2`}
      >
        <div
          className={`absolute h-full top-0 py-2 flex gap-5 ${
            modeButton ? "" : "hidden"
          } font-bold`}
        >
          <button
            className="h-full w-[50px] bg-green-600 rounded-xl hover:bg-green-500 duration-200 transition-all"
            onClick={() => {
              SetMode(0);
              SetModeButton(false);
            }}
          >
            1
          </button>
          <button
            className="h-full w-[50px] bg-green-600 hover:bg-green-500 duration-200 transition-all rounded-xl"
            onClick={() => {
              SetMode(1);
              SetModeButton(false);
            }}
          >
            2
          </button>
          <button
            className="h-full w-[50px] bg-green-600 rounded-xl hover:bg-green-500 duration-200 transition-all"
            onClick={() => {
              SetMode(2);
              SetModeButton(false);
            }}
          >
            3
          </button>
        </div>
        <button
          className="bg-green-400 px-4 rounded-xl"
          onClick={() => {
            SetMode(null);
            SetModeButton(true);
          }}
        >
          M
        </button>
        <input
          type="text"
          className={`flex-1 p-3 ${
            mode != null ? "bg-white" : "bg-white/5"
          } text-black`}
          placeholder="Type your prompt here"
          disabled={mode == null ? true : false}
        />
        <button className="bg-green-400 px-2 rounded-xl">Submit</button>
      </div>
    </div>
  );
};

export default Homepage;
