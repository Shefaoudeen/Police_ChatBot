import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [mode, SetMode] = useState(null);
  const [sectionId, SetSectionId] = useState(null);
  const [modeButton, SetModeButton] = useState(false);
  const [inputField, SetInputField] = useState(false);
  const [propts, Setpropts] = useState([]);
  const [inputPropts, SetInputPropts] = useState("");
  const [displayHome, SetDisplayHome] = useState(true);

  const chumma = [
    {
      section_number: "421",
      alternatives: ["421 in BNS ~ 421 in IPC", "421 in IPC ~ 320 in BNS"],
    },
    {
      section_number: "421",
      alternatives: ["421 in BNS ~ 421 in IPC", "421 in IPC ~ 320 in BNS"],
    },
    {
      section_number: "421",
      alternatives: ["421 in BNS ~ 421 in IPC", "421 in IPC ~ 320 in BNS"],
    },
  ];

  const text_template = [
    "BNS in Other BNSS and IPC.",
    "BNSS in Other BNS and BSA.",
    "BNA in Other BNS and BNSS.",
  ];

  const queries = [
    "Type your queries related to IPC and BNS and get answered",
    "Type your queries related to Instant Legal Aid and get answered",
    "Type your queries related to Comprehensive Legal Comparison and get answered",
  ];

  const handleSubmit = async () => {
    console.log(mode, sectionId, inputPropts);
    if (mode == "" || sectionId == "" || inputPropts == "") {
      return;
    }
    if (mode == 1) {
      await axios
        .get(
          `http://localhost:8000/mode-${mode}?section_id=${sectionId}&section_number=${inputPropts}`
        )
        .then((res) => {
          Setpropts([...propts, res.data]);
          SetInputPropts("");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4 text-center justify-center items-center w-screen py-5">
      {displayHome ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="font-bold md:text-4xl text-2xl">
            How can I help you ?
          </h1>
          <h1 className="text-slate-200 max-md:text-xs max-md:w-[75%]">
            Hi I'm JAC. Your jucial companion.{" "}
            {mode == null ? "" : queries[mode]}
          </h1>
          <div className="flex justify-center max-w-[80%] md:gap-10 max-md:flex-col max-md:gap-5">
            <div
              className={` ${
                mode == 1 ? "border-4" : "border-2"
              } cursor-pointer p-5 flex flex-col gap-5 max-w-[30%] border-green-400 rounded-xl bg-[#292929] md:min-h-[275px] max-md:max-w-[100%] `}
              onClick={() => {
                SetMode(1);
              }}
            >
              <h1 className="font-bold md:text-2xl">IPC and BNS Conversion</h1>
              <p className="flex-1 text-justify max-md:text-xs">
                A concise guide comparing the Indian Penal Code (IPC) and the
                BNS, highlighting key laws, punishments, and legal provisions.
              </p>
              <div className={`flex gap-4 ${mode == 1 ? "" : "hidden"}`}>
                <button
                  className="bg-white text-[#292929] py-2 px-4 rounded-full"
                  onClick={() => {
                    SetSectionId(1);
                    SetSectionId(1);
                    SetInputField(true);
                  }}
                >
                  BNS
                </button>
                <button
                  className="bg-white text-[#292929] py-2 px-4 rounded-full"
                  onClick={() => {
                    SetSectionId(2);
                    SetInputField(true);
                  }}
                >
                  BNSS
                </button>
                <button
                  className="bg-white text-[#292929] py-2 px-4 rounded-full"
                  onClick={() => {
                    SetSectionId(3);
                    SetInputField(true);
                  }}
                >
                  BSA
                </button>
              </div>
            </div>
            <div
              className={` ${
                mode == 2 ? "border-4" : "border-2"
              } cursor-pointer p-5 flex flex-col gap-5 max-w-[30%] border-green-400 rounded-xl bg-[#292929] max-md:max-w-[100%]`}
              onClick={() => {
                SetMode(2);
                SetInputField(false);
              }}
            >
              <h1 className="font-bold md:text-2xl">Instant Legal Aid</h1>
              <p className="flex-1 text-justify max-md:text-xs">
                A tool that identifies the closest and most relevant law based
                on user input, whether in text, voice, or image form. It
                provides immediate legal guidance tailored to your specific
                situation.
              </p>
              <div className={`flex ${mode == 2 ? "" : "hidden"}`}>
                <button className="bg-white text-[#292929] py-2 px-4 rounded-full">
                  Know More
                </button>
              </div>
            </div>
            <div
              className={` ${
                mode == 3 ? "border-4" : "border-2"
              } cursor-pointer p-5 flex flex-col gap-5 max-w-[30%] border-green-400 rounded-xl bg-[#292929] max-md:max-w-[100%] `}
              onClick={() => {
                SetMode(3);
              }}
            >
              <h1 className="font-bold md:text-2xl">
                Comprehensive Legal Comparison
              </h1>
              <p className="flex-1 text-justify max-md:text-xs">
                A detailed comparison of BNS, BNSS, and BSA, listing laws,
                corresponding sections, and punishments in a structured table
                format.
              </p>
              <div className={`flex gap-4 ${mode == 3 ? "" : "hidden"}`}>
                <Link to="/bnsDetails">
                  <button
                    className="bg-white text-[#292929] py-2 px-4 rounded-full"
                    onClick={() => {
                      SetSectionId("1");
                      SetInputField(true);
                    }}
                  >
                    BNS
                  </button>
                </Link>
                <Link to="/bnssDetails">
                  <button
                    className="bg-white text-[#292929] py-2 px-4 rounded-full"
                    onClick={() => {
                      SetSectionId("2");
                      SetInputField(true);
                    }}
                  >
                    BNSS
                  </button>
                </Link>
                <Link to="/bsaDetails">
                  <button
                    className="bg-white text-[#292929] py-2 px-4 rounded-full"
                    onClick={() => {
                      SetSectionId("3");
                      SetInputField(true);
                    }}
                  >
                    BSA
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center min-h-[50%]">
          <div className="flex flex-col gap-4 w-[50%]">
            {propts.map((ele, ind) => (
              <div className=" p-4 flex flex-col gap-4 text-start rounded-2xl">
                <h1 className="font-bold bg-[#292929] w-fit p-5 rounded-r-2xl rounded-t-2xl">
                  {ele.section_number} {text_template[sectionId - 1]}
                </h1>
                <div className="flex justify-end">
                  <ul className="text-gray-300 text-end bg-[#292929] w-fit p-5 rounded-l-2xl rounded-t-2xl">
                    {ele?.alternatives?.map((subele, subind) => (
                      <li>{subele}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className={`md:w-[80%]  mt-6 ${
          inputField ? "bg-white" : "bg-[#292929]"
        } flex px-2 gap-4 py-2 rounded-2xl relative max-md:fixed max-md:bottom-12 max-md:scale-90`}
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
            inputField ? "bg-white" : "bg-white/5"
          } text-black`}
          placeholder={inputField ? "Type your prompt here" : "Select any Mode"}
          value={inputPropts}
          onChange={(e) => SetInputPropts(e.target.value)}
          disabled={!inputField}
        />
        <button
          className="bg-green-400 px-2 rounded-xl"
          onClick={() => {
            handleSubmit();
            SetDisplayHome(false);
          }}
          disabled={!inputField}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Homepage;
