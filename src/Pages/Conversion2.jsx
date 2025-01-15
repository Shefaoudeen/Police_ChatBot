import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Conversion2 = () => {
  let navigation = useNavigate();
  const modes = ["BNS", "IPC", "BNSS", "CRPC", "BSA", "IEA"];
  const [modeNo1, setModeNo1] = useState(1);
  const [mode2, setMode2] = useState(2);
  const [code, setCode] = useState("");
  const [responses, SetResponse] = useState([]);
  const [submitted, SetSubmitted] = useState(false);
  const [template, setTemplate] = useState();

  useEffect(() => {
    if (modeNo1 % 2 == 0) {
      setMode2(modeNo1 - 1);
    } else if (modeNo1 % 2 == 1) {
      setMode2(modeNo1 + 1);
    }
  }, [modeNo1]);

  const EnterDetails = (data) => {
    SetResponse((prevResponses) => [
      ...prevResponses,
      data?.message === "No matching section found"
        ? {
            type: modeNo1 % 2,
            mode1: modeNo1,
            mode2: mode2,
            code: code,
            result: { message: "No matching Section found" },
          }
        : {
            type: modeNo1 % 2,
            mode1: modeNo1,
            mode2: mode2,
            code: code,
            result: data,
          },
    ]);
  };

  const handleSumbitButton = async () => {
    if (code === "") {
      alert("Enter the Code Field");
      return;
    }
    await axios
      .get(
        `http://localhost:8000/mode-1/?section=${
          modes[modeNo1 - 1]
        }&section_number=${code}`
      )
      .then((res) => {
        EnterDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setCode("");

    SetSubmitted(true);
    console.log(responses);
  };

  const swapMode = () => {
    setModeNo1(mode2);
  };

  return (
    <div className="flex justify-center  w-full  relative py-10">
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
      <div className="absolute w-screen h-full">
        <div className="absolute right-20 bottom-20">
          <button
            className={`bg-green-400 p-2  rounded-lg ${
              submitted ? "" : "hidden"
            }`}
            onClick={() => {
              SetResponse([]);
              SetSubmitted(false);
              setModeNo1(1);
              setCode("");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-[80%] min-w-[80%] items-center max-md:pt-10 max-md:min-w-[90%]">
        <div className="bg-[#171717] px-8 py-2 rounded-xl flex flex-col items-center gap-4 w-full sticky top-[50px]">
          <h1 className="text-xl font-bold">Code Conversion</h1>
          <div className="flex gap-4 items-center max-md:flex-col">
            <div className="flex items-center gap-8 max-md:text-sm">
              <div className="flex gap-4 items-center">
                <label className="w-max">Mode 1</label>
                <select
                  name="code1"
                  id="code1"
                  className="text-black"
                  value={modeNo1}
                  onChange={(e) => {
                    setModeNo1(parseInt(e.target.value));
                  }}
                >
                  <option value="1">BNS</option>
                  <option value="2">IPC</option>
                  <option value="3">BNSS</option>
                  <option value="4">CRPC</option>
                  <option value="5">BSA</option>
                  <option value="6">IEA</option>
                </select>
              </div>
              <div className="flex items-center hover:text-green-400 cursor-pointer">
                <h1 className="text-3xl" onClick={() => swapMode()}>
                  ⇌
                </h1>
              </div>
              <div className="flex gap-4 items-center">
                <label className="w-max">Mode 2</label>
                <div className="bg-white text-black px-2 rounded">
                  {modes[mode2 - 1]}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                placeholder="Enter the Code"
                className="p-2 rounded-lg text-black"
              />
              <button
                className="bg-green-400 p-2  rounded-lg"
                onClick={() => handleSumbitButton()}
              >
                Convert
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="bg-[#222222] flex flex-col gap-4 p-2 text-sm md:text-xl rounded-xl w-[50%] max-md:w-[100%]">
            <div className="bg-[#222222] flex flex-col gap-4 p-2 text-sm rounded-xl md:text-xl w-[100%]">
              {submitted ? (
                responses?.map((ele, index) =>
                  ele?.result?.message === "No matching Section found" ? (
                    <div className="bg-[#2b2b2b] p-2 flex flex-col gap-2 rounded-lg">
                      <h1 className="text-center text-green-500">
                        {modes[ele?.mode1 - 1]} ⇌ {modes[ele?.mode2 - 1]}
                      </h1>
                      <h1>
                        <strong>Code :</strong> {ele?.code}
                      </h1>
                      <h1 className="text-red-500">Invalid Code</h1>
                    </div>
                  ) : (
                    ele?.result?.responses?.map((subele) => (
                      <div
                        className={`p-2 flex flex-col gap-2 rounded-lg ${
                          subele?.color === null ? "bg-[#5a5757]" : "bg-red-500"
                        } w-[100%]`}
                      >
                        <h1 className="text-center text-green-500">
                          {modes[ele?.mode1 - 1]} ⇌ {modes[ele?.mode2 - 1]}
                        </h1>
                        <h1>
                          <strong>Code :</strong>{" "}
                          {ele?.type == 1
                            ? subele?.bns_section ||
                              subele?.bnss_section ||
                              subele?.bsa_section
                            : subele?.ipc_section ||
                              subele?.iea_section ||
                              subele?.crpc_section}
                        </h1>
                        <h1>
                          <strong>Alternative Code :</strong>{" "}
                          {ele?.type == 1
                            ? subele?.ipc_section ||
                              subele?.iea_section ||
                              subele?.crpc_section
                            : subele?.bns_section ||
                              subele?.bnss_section ||
                              subele?.bsa_section}
                        </h1>
                        <h1>
                          <strong>Crime Description :</strong>{" "}
                          {subele?.crime_description}
                        </h1>
                        <h1 className={`${ele?.mode1 < 3 ? "" : "hidden"}`}>
                          <strong>Punishment :</strong>{" "}
                          <ul className="pl-5">
                            <li>
                              {subele?.ipc_punishment}
                              {subele?.iea_punishment}
                              {subele?.crpc_punishment}
                            </li>
                            <li>
                              {subele?.bns_punishment}
                              {subele?.bnss_punishment}
                              {subele?.bsa_punishment}
                            </li>
                          </ul>
                        </h1>
                        <h1
                          className={`${
                            ele?.mode1 > 2 && ele?.mode1 < 5 ? "" : "hidden"
                          }`}
                        >
                          <strong>CRPC Timeline :</strong>{" "}
                          {subele?.crpc_timeline || "--NONE--"}
                        </h1>
                        <h1
                          className={`${
                            ele?.mode1 > 2 && ele?.mode1 < 5 ? "" : "hidden"
                          }`}
                        >
                          <strong>BNSS Timeline :</strong>{" "}
                          {subele?.bnss_timeline || "--NONE--"}
                        </h1>
                      </div>
                    ))
                  )
                )
              ) : (
                <div className="bg-[#2b2b2b] p-2 flex flex-col gap-2 rounded-lg">
                  <h1 className="text-center">Mode 1 ⇌ Mode 2</h1>
                  <h1>Code : --No Details--</h1>
                  <h1>Alternative Code : --No Details--</h1>
                  <h1>Crime Description : --No Details--</h1>
                  <h1>Punishment : --No Details--</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversion2;
