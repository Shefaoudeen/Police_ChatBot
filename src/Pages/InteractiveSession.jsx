import React, { useEffect, useState } from "react";
import { chatBotImg, user } from "../assets";
import axios from "axios";

const ChatTemplate = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-end gap-5">
        <div className="bg-white rounded-full">
          <img src={user} className="w-[40px] p-2" />
        </div>
        <div className="bg-[#171717] p-4 px-4 rounded-r-2xl rounded-tl-2xl max-w-[60%]">
          <h1>{props.question}</h1>
        </div>
      </div>
      <div className="flex justify-end items-end gap-5">
        <div className="bg-[#171717] p-4 px-4 rounded-l-2xl rounded-tr-2xl max-w-[60%]">
          <h1 className="text-justify">{props.answer}</h1>
        </div>
        <div className="bg-white rounded-full">
          <img src={chatBotImg} className="w-[40px] p-2" />
        </div>
      </div>
    </div>
  );
};

const InteractiveSession = () => {
  const [responses, setResponses] = useState([]);
  const [question, SetQuestion] = useState("");

  const addTheResponse = async (res) => {
    console.log("hi");
    console.log(res);
    await setResponses([...responses, res]);
    console.log(responses);
  };

  const handleSumbitButton = () => {
    const template = question;
    template.replace(" ", "%");

    axios
      .get(`http://localhost:8000/mode-2/?input_recent_text=${template}`)
      .then((res) => {
        addTheResponse({ question: question, responses: res.data });
        console.log(responses);
      })
      .catch((err) => {
        console.log(err);
      });
    SetQuestion("");
  };

  const handleChange = async (e) => {
    await SetQuestion(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen relative">
      <div className="w-[75%] relative min-h-[50vh]">
        <div className="py-5 flex flex-col gap-6">
          {responses.map((ele, index) => (
            <div className="flex flex-col gap-4">
              <div className="flex justify-start items-end gap-5">
                <div className="bg-white rounded-full">
                  <img src={user} className="w-[40px] p-2" />
                </div>
                <div className="bg-[#171717] p-4 px-4 rounded-r-2xl rounded-tl-2xl max-w-[60%]">
                  <h1>{ele?.question}</h1>
                </div>
              </div>
              <div className="flex justify-end items-end gap-5">
                <div className="bg-[#171717] p-4 px-4 rounded-l-2xl rounded-tr-2xl max-w-[60%]">
                  <h1 className="text-justify">{ele?.responses?.response}</h1>
                </div>
                <div className="bg-white rounded-full">
                  <img src={chatBotImg} className="w-[40px] p-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-[100px] bg-opacity-50 w-[75%] max-md:w-[90%]">
        <div className="px-5 py-4 flex gap-8 bg-[#171717]/65 rounded-xl">
          <input
            type="text"
            value={question}
            onChange={handleChange}
            className="w-full py-2 rounded-xl text-black px-2"
          />
          <button
            className="bg-green-400 p-2  rounded-lg"
            onClick={() => handleSumbitButton()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSession;
