import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Conversion = () => {
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

  const EnterDetails = async (data) => {
    console.log(data);
    await SetResponse([
      ...responses,
      { type: modeNo1 % 2, mode1: modeNo1, mode2: mode2, result: data },
    ]);
    await console.log(responses);
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
      <div className="flex flex-col gap-4 max-w-[80%] min-w-[80%] items-center">
        <div className="bg-[#171717] px-8 py-2 rounded-xl flex flex-col items-center gap-4 w-full sticky top-[50px]">
          <h1 className="text-xl font-bold">Code Conversion</h1>
          <div className="flex items-center gap-8">
            <div className="flex gap-4 items-center">
              <label>Mode 1</label>
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
              <label>Mode 2</label>
              <div className="bg-white text-black px-2 rounded">
                {modes[mode2 - 1]}
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

        <div className="flex flex-1 flex-col w-full">
          <table
            className={`text-center ${submitted ? "border-separate" : ""}`}
          >
            <tr className="bg-[#2b2b2b] text-sm">
              <th className="w-[7.5%]">Mode 1</th>
              <th className="w-[7.5%]">Mode 2</th>
              <th className="w-[7.5%]">Code</th>
              <th className="w-[7.5%]">Alternative Code</th>
              <th className="w-[35%]">Crime Description </th>
              <th className="w-[35%]">Punishment</th>
            </tr>
            {submitted ? (
              responses?.map((ele, index) =>
                ele?.result?.responses?.map((subele) => (
                  <tr
                    className={`text-center w-full ${
                      subele?.color === null ? "bg-[#5a5757]" : "bg-red-500"
                    }`}
                    key={index}
                  >
                    <td className="">{modes[ele?.mode1 - 1]}</td>
                    <td className="">{modes[ele?.mode2 - 1]}</td>
                    <td className="">
                      {ele?.type == 1
                        ? subele?.bns_section ||
                          subele?.bnss_section ||
                          subele?.bsa_section
                        : subele?.ipc_section ||
                          subele?.iea_section ||
                          subele?.crpc_section}
                    </td>
                    <td className="py-5">
                      {ele?.type == 1
                        ? subele?.ipc_section ||
                          subele?.iea_section ||
                          subele?.crpc_section
                        : subele?.bns_section ||
                          subele?.bnss_section ||
                          subele?.bsa_section}
                    </td>

                    <td className="px-4 py-2 text-justify">
                      {subele?.crime_description}
                    </td>
                    <td className="px-4 py-2 text-justify">
                      <ul>
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
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr className="bg-[#5a5757]">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="py-5">--- No Records ---</td>
                <td></td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Conversion;
