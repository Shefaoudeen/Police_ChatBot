import React, { useEffect, useState } from "react";
import { chatBotImg, user } from "../assets";

const Conversion = () => {
  const modes = ["BNS", "IPC", "BNSS", "CRPC", "BSA", "IEA"];
  const [modeNo, setModeNo] = useState(1);
  const [mode2, setMode2] = useState(2);
  const [code, setCode] = useState("");

  const [lawDescripiton, setLawDescription] = useState(
    "Enter the Code in the above tab"
  );
  const [punishmentDescription, setPunishmentDescription] = useState(
    "Enter the Code in the above tab"
  );

  const [responses, SetResponse] = useState([]);

  const [submitted, SetSubmitted] = useState(false);

  useEffect(() => {
    console.log(modeNo);
    if (modeNo % 2 == 0) {
      setMode2(modeNo - 1);
    } else if (modeNo % 2 == 1) {
      setMode2(modeNo + 1);
    }
    console.log(mode2);
  }, [modeNo]);

  const handleSumbitButton = (que) => {
    if (code === "") {
      alert("Enter the Code Field");
      return;
    }
    SetSubmitted(true);
    console.log(submitted);
    SetResponse([
      ...responses,
      {
        question: que,
        currentMode: modes[modeNo - 1],
        nextMode: modes[mode2 - 1],
        alternative_code:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia dicta explicabo iusto aut ad nisi eaque deserunt corporis aperiam cum, repellat consequatur nostrum non nulla deleniti culpa ratione dolorum!",
        law: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia dicta explicabo iusto aut ad nisi eaque deserunt corporis aperiam cum, repellat consequatur nostrum non nulla deleniti culpa ratione dolorum!",
        punishment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia dicta explicabo iusto aut ad nisi eaque deserunt corporis aperiam cum, repellat consequatur nostrum non nulla deleniti culpa ratione dolorum!",
      },
    ]);
  };

  const swapMode = () => {
    setModeNo(mode2);
  };

  return (
    <div className="flex justify-center items-center w-full  relative py-10">
      <div className="absolute w-screen h-full">
        <div className="absolute right-10 bottom-10">
          <button
            className={`bg-green-400 p-2  rounded-lg ${
              submitted ? "" : "hidden"
            }`}
            onClick={() => {
              SetResponse([]);
              SetSubmitted(false);
              setModeNo(1);
              setCode("");
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-20 max-w-[50%] items-center">
        <div className="bg-[#171717] px-8 py-4 rounded-xl flex flex-col items-center gap-4 w-min sticky top-[50px]">
          <h1>Code Conversion</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-4 items-center">
              <label>Mode 1</label>
              <select
                name="code1"
                id="code1"
                className="text-black"
                value={modeNo}
                onChange={(e) => {
                  setModeNo(parseInt(e.target.value));
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
              onClick={() => handleSumbitButton(code, modeNo)}
            >
              Submit
            </button>
          </div>
        </div>
        {/*chat type */}
        {submitted === true
          ? responses.map((ele, ind) => (
              <div className="flex flex-col w-[50vw] gap-4">
                <div className="flex flex-col w-full gap-4">
                  <div className=" flex justify-end  gap-4 items-end ">
                    <div className="bg-[#171717] rounded-l-3xl rounded-tr-3xl p-4">
                      {ele.question} code in {ele.currentMode}
                    </div>
                    <img
                      src={user}
                      alt=""
                      className="max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] object-contain p-2 bg-[#4b4b4b] rounded-full overflow-hidden"
                    />{" "}
                  </div>
                  <div className="flex justify-start items-end gap-4 max-w-[80%]">
                    <img
                      src={chatBotImg}
                      alt=""
                      className="max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] object-contain p-2 bg-[#4b4b4b] rounded-full overflow-hidden"
                    />
                    <div className="bg-[#171717] rounded-r-3xl rounded-tl-3xl p-4 flex flex-col gap-2">
                      <h1>
                        Alternative code in {ele.nextMode} -{" "}
                        {ele.alternative_code}
                      </h1>
                      <h1>Description - {ele.law}</h1>
                      <h1>Punishmet - {ele.punishment}</h1>
                      <button className="bg-green-400 p-2 w-fit rounded-lg">
                        Know More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Conversion;
