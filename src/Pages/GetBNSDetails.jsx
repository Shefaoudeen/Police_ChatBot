import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BNS } from "../Data/BNS";

const GetBNSDetails = () => {
  const [dataLoaded, SetDataLoaded] = useState(true);
  const { id } = useParams();
  const [datas, SetDatas] = useState();

  useGSAP(() => {
    gsap.to(".msgBox", {
      opacity: "100%",
      repeat: -1,
      duration: 1.5,
      yoyo: 1,
    });
  });

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
    axios
      .get(`http://localhost:8000/mode-3?section_id=1&sub_section_id=${id}`)
      .then((res) => {
        SetDatas(res.data);
        SetDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen">
      <h1 className="font-medium text-2xl">
        {BNS[Number(id) - 1].Section} - Sub Section {datas?.sub_section_id}
      </h1>
      {dataLoaded ? (
        <div className=" w-[50%] p-8 rounded-xl flex flex-col gap-5 items-center justify-center py-[50px]">
          <div className="w-full py-5">
            <div className="flex flex-col gap-4">
              {chumma.map((ele, ind) => (
                <div
                  className="bg-[#292929] text-xl max-md:text-sm p-5 transition-all duration-200
              rounded-3xl flex flex-col border gap-3 hover:border-green-400"
                >
                  <h1>
                    <span className="text-green-400">Serial Number :</span>{" "}
                    {ele?.serial_number}
                  </h1>
                  <h1>
                    <span className="text-green-400">Crime Description :</span>{" "}
                    {ele?.crime_description}
                  </h1>
                  <h1>
                    <span className="text-green-400">BNS punishments :</span>
                    {ele?.bns_punishment}
                  </h1>
                  <div className="flex justify-evenly gap-5">
                    <div>
                      <h1>
                        <span className="text-green-400">IPC Section :</span>{" "}
                        {ele?.ipc_section}
                      </h1>
                    </div>
                    <div>
                      <h1>
                        <span className="text-green-400">BNS Section :</span>{" "}
                        {ele?.bns_section}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#292929] w-[50%] p-8 text-xl rounded-xl flex flex-col gap-5">
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

export default GetBNSDetails;
