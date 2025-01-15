import React, { useEffect, useState } from "react";
import { BotDance, BotVideo, chatBotImg, user } from "../assets";
import axios from "axios";
import { Link } from "react-router-dom";

const TypingEffect = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let typingIndex = 0;
    let typingInterval;

    // Reset and start typing effect
    setDisplayedText("");

    if (text) {
      typingInterval = setInterval(() => {
        if (typingIndex < text.length) {
          setDisplayedText((prev) => prev + text.charAt(typingIndex));
          typingIndex++;
        } else {
          clearInterval(typingInterval); // Stop when complete
        }
      }, speed);
    }

    return () => clearInterval(typingInterval); // Cleanup when unmounting or text changes
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

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
  const [queried, setQueried] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");
  const [lastResponse, setLastResponse] = useState("Waiting for response...");
  const [responses, setResponses] = useState([]);
  const [question, setQuestion] = useState("");

  const handleSumbitButton = () => {
    const template = question;
    setLastQuestion(template); // Update the question immediately
    setLastResponse("Waiting for response..."); // Placeholder for response
    setQueried(true);

    axios
      .get(`http://localhost:8000/mode-2/?query=${template}`)
      .then((res) => {
        console.log(res);
        const responseText = res.data || "No response available";
        setResponses((prev) => [
          ...prev,
          { question: template, responses: { response: responseText } },
        ]);
        setLastResponse(responseText); // Set final response
        setQueried(false); // Typing done
      })
      .catch((err) => {
        console.error(err);
        setLastResponse("Error occurred while fetching response.");
      });

    setQuestion(""); // Clear input
  };

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen relative max-sm:text-xs">
      <div className="absolute top-5 left-5">
        <Link to={"/"}>
          <button className="bg-green-400 px-4 py-1 rounded-full">
            {"<Back />"}
          </button>
        </Link>
      </div>
      {lastQuestion === "" ? (
        <div className="absolute flex justify-center items-center w-screen mb-32 h-screen gap-4">
          <div className="flex justify-center">
            <div className="flex justify-center">
              <img src={BotVideo} alt="Bot Dance" className="w-1/2 h-auto" />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="w-[75%] max-sm:w-[90%] relative min-h-[50vh]">
        <div className="py-5 flex flex-col gap-6">
          {/* Render all previous responses */}
          {responses.map((ele, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex justify-end items-end gap-5">
                <div className="bg-[#171717] p-4 px-4 rounded-l-2xl rounded-tr-2xl max-w-[60%] max-sm:max-w-[75%]">
                  <h1>{ele?.question}</h1>
                </div>
                <div className="bg-white rounded-full">
                  <img src={user} className="w-[40px] p-2" />
                </div>
              </div>
              <div className="flex justify-start items-end gap-5">
                <div className="bg-white rounded-full">
                  <img src={chatBotImg} className="w-[40px] p-2" />
                </div>
                <div className="bg-[#171717] p-4 px-4 rounded-r-2xl rounded-tl-2xl max-w-[60%] max-sm:max-w-[75%]">
                  <h1 className="text-justify">{ele?.responses?.response}</h1>
                </div>
              </div>
            </div>
          ))}

          {/* Render current question and response */}
          {queried && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-end items-end gap-5">
                <div className="bg-[#171717] p-4 px-4 rounded-l-2xl rounded-tr-2xl max-w-[60%]">
                  <h1>{lastQuestion}</h1>
                </div>
                <div className="bg-white rounded-full">
                  <img src={user} className="w-[40px] p-2" />
                </div>
              </div>
              <div className="flex justify-start items-end gap-5">
                <div className="bg-white rounded-full">
                  <img src={chatBotImg} className="w-[40px] p-2" />
                </div>
                <div className="bg-[#171717] p-4 px-4 rounded-r-2xl rounded-tl-2xl max-w-[60%]">
                  {/* Use TypingEffect here */}
                  <h1 className="text-justify">
                    {lastResponse === "Waiting for response..." ? (
                      <span>Waiting for response...</span>
                    ) : (
                      <TypingEffect text={lastResponse || ""} />
                    )}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-[50px] bg-opacity-50 w-[75%] max-md:w-[90%]">
        <div className="px-5 py-4 flex gap-8 bg-[#171717]/65 rounded-xl">
          <input
            type="text"
            value={question}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSumbitButton(); // Call the submit function when Enter is pressed
              }
            }}
            className="w-full py-2 rounded-xl text-black px-2"
          />
          <button
            className="bg-green-400 p-2  rounded-lg"
            onClick={handleSumbitButton}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSession;
