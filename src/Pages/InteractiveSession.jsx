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

  const handleSumbitButton = () => {
    /*
    axios
      .get("")
      .then((res) => {
        responses([...responses, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
      */
    const chumma = {
      question: question,
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis ullam perferendis dignissimos eum numquam, esse dolor maxime consequatur ratione aut repellendus est quas fugiat odit consectetur ea atque iste sequi!",
    };
    setResponses([chumma, ...responses]);
    SetQuestion("");
  };

  const handleChange = async (e) => {
    await SetQuestion(e.target.value);
  };

  useEffect(() => {
    console.log(question);
  }, [question]);

  return (
    <div className="flex flex-col justify-center items-center w-full relative ">
      <div className="w-[75%] relative">
        <div className="py-5 flex flex-col gap-6">
          {responses.map((ele, index) => (
            <ChatTemplate question={ele.question} answer={ele.answer} />
          ))}
        </div>
        <div className="bottom-[200px]">
          <div className="px-5 py-4 flex gap-8 bg-[#171717] rounded-xl">
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
    </div>
  );
};

export default InteractiveSession;
