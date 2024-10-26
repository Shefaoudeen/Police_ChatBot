import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const GetSectionDetails = () => {
  let navigation = useNavigate();
  const [dataLoaded, SetDataLoaded] = useState(false);
  const { id } = useParams();
  const [datas, SetDatas] = useState({});
  const [section_id, SetSection_id] = useState();
  const [sub_section_id, setSub_section_id] = useState();
  const modesName = [
    "BHARATIYA NYAYA SANHITA (BNS)",
    "BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS)",
    "BASIC SHIKSHA ADHIKARI (BSA)",
  ];
  /*
  useGSAP(() => {
    gsap.to(".msgBox", {
      opacity: "100%",
      repeat: -1,
      duration: 1.5,
      yoyo: 1,
    });
  });
  */
  const chumma = [
    {
      serial_number: "",
      crime_description: "",
      ipc_section: "",
      bns_section: "",
      bns_punishment: "",
    },
  ];
  useEffect(() => {
    console.log(id);
    let ids = id.toString().split("_");
    SetSection_id(ids[0]);
    setSub_section_id(ids[1]);
    console.log(section_id);
    console.log(sub_section_id);
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/mode-3/?section_id=${section_id}&sub_section_id=${sub_section_id}`
      )
      .then((res) => {
        SetDatas(res.data);
        SetDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sub_section_id]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen relative">
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
      <h1 className="font-medium text-2xl">
        {modesName[Number(section_id) - 1]} - Sub Section{" "}
        {datas?.sub_section_id}
      </h1>
      {dataLoaded ? (
        <div className=" w-[50%] p-8 rounded-xl flex flex-col gap-5 items-center justify-center py-[50px]">
          <div className="w-full py-5">
            <div className="flex flex-col gap-4">
              {datas?.sections.map((ele, ind) => (
                <div
                  className="bg-[#292929] text-xl max-md:text-sm p-5
              rounded-3xl flex flex-col border gap-3 hover:border-green-400"
                  key={ind}
                >
                  <h1>
                    <span
                      className={
                        ele?.color === null ? "text-green-400" : "text-red-500"
                      }
                    >
                      Serial Number :
                    </span>{" "}
                    {ele?.serial_number}
                  </h1>
                  <h1>
                    <span
                      className={
                        ele?.color === null ? "text-green-400" : "text-red-500"
                      }
                    >
                      Crime Description :
                    </span>{" "}
                    {ele?.crime_description}
                    {ele?.part}
                  </h1>
                  <h1
                    className={`${
                      ele?.provision_highlight || ele?.bns_punishment
                        ? null
                        : "hidden"
                    }`}
                  >
                    <span
                      className={
                        ele?.color === null ? "text-green-400" : "text-red-500"
                      }
                    >
                      {section_id == 1
                        ? "BNS Punishment :"
                        : "Prvision Highlight :"}
                    </span>
                    {ele?.bns_punishment}
                    {ele?.provision_highlight}
                  </h1>
                  <div className="flex justify-evenly gap-5">
                    <div>
                      <h1>
                        <span
                          className={
                            ele?.color === null
                              ? "text-green-400"
                              : "text-red-500"
                          }
                        >
                          {section_id === 1 ? "IPC Section :" : "CRPC Section "}
                        </span>{" "}
                        {ele?.ipc_section}
                        {ele?.crpc_section}
                      </h1>
                    </div>
                    <div>
                      <h1>
                        <span
                          className={
                            ele?.color === null
                              ? "text-green-400"
                              : "text-red-500"
                          }
                        >
                          {section_id === 1 ? "BNS Section :" : "BNSS Section "}
                        </span>{" "}
                        {ele?.bns_section}
                        {ele?.bnss_section}
                      </h1>
                    </div>
                  </div>
                  {section_id === 2 ? (
                    sub_section_id > 4 ? (
                      <div className="flex justify-evenly gap-5">
                        <div>
                          <h1>
                            <span
                              className={
                                ele?.color === null
                                  ? "text-green-400"
                                  : "text-red-500"
                              }
                            >
                              CRPC timeline
                            </span>{" "}
                            {ele?.crpc_timeline}
                          </h1>
                        </div>
                        <div>
                          <h1>
                            <span
                              className={
                                ele?.color === null
                                  ? "text-green-400"
                                  : "text-red-500"
                              }
                            >
                              BNSS timeline
                            </span>{" "}
                            {ele?.bnss_timeline}
                          </h1>
                        </div>
                      </div>
                    ) : null
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#292929] w-[50%] p-8 text-xl rounded-xl flex flex-col gap-5 ">
          <div className="bg-[#8f8f8f] min-w-[20%] max-w-[20%] min-h-[30px] rounded-xl msgBox" />
          <div className="flex flex-col gap-5 items-end">
            <div className="bg-[#8f8f8f] min-w-[90%] max-w-[90%] min-h-[30px] rounded-xl msgBox" />
            <div className="bg-[#8f8f8f] min-w-[90%] max-w-[90%] min-h-[30px] rounded-xl msgBox" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetSectionDetails;
