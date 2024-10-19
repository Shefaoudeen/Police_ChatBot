import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversion = () => {
  const modes = ["BNS", "IPC", "BNSS", "CRPC", "BSA", "IEA"];
  const [modeNo1, setModeNo1] = useState(1);
  const [mode2, setMode2] = useState(2);
  const [code, setCode] = useState("");
  const [responses, SetResponse] = useState([]);
  const [submitted, SetSubmitted] = useState(false);

  useEffect(() => {
    console.log(modeNo1);
    if (modeNo1 % 2 == 0) {
      setMode2(modeNo1 - 1);
    } else if (modeNo1 % 2 == 1) {
      setMode2(modeNo1 + 1);
    }
    console.log(mode2);
  }, [modeNo1]);

  const handleSumbitButton = () => {
    if (code === "") {
      alert("Enter the Code Field");
      return;
    }
    axios
      .get(
        `http://localhost:8000/mode-1/?section_id=${
          modes[modeNo1 - 1]
        }&sub_section_id=${code}`
      )
      .then((res) => {
        SetResponse([res.data, ...responses]);
      })
      .catch((err) => {
        console.log(err);
      });
    SetSubmitted(true);
    console.log(submitted);
  };

  const swapMode = () => {
    setModeNo1(mode2);
  };

  return (
    <div className="flex justify-center  w-full  relative py-10">
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
              responses?.map((ele, index) => (
                <tr
                  className={`text-center w-full ${
                    ele?.color === null ? "bg-[#5a5757]" : "bg-red-500"
                  }`}
                  key={index}
                >
                  <td className="">{ele?.mode1}</td>
                  <td className="">{ele?.mode2}</td>
                  <td className="">
                    {ele?.ipc_section}
                    {ele?.iea_section}
                    {ele?.crpc_section}
                  </td>
                  <td className="py-5">
                    {ele?.bns_section}
                    {ele?.bnss_section}
                    {ele?.bsa_section}
                  </td>
                  <td className="px-4 py-2 text-justify">
                    {ele?.crime_description}
                  </td>
                  <td className="px-4 py-2 text-justify">
                    <ul>
                      <li>
                        {ele?.ipc_punishment}
                        {ele?.iea_punishment}
                        {ele?.crpc_punishment}
                      </li>
                      <li>
                        {ele?.bns_punishment}
                        {ele?.bnss_punishment}
                        {ele?.bsa_punishment}
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
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
