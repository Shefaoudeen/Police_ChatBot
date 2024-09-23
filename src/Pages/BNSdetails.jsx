import React from "react";
import { BNS } from "../Data/BNS";

const BNSdetails = () => {
  return (
    <div className="flex justify-center items-center w-screen">
      <div>
        {BNS.map((ele, ind) => (
          <div></div>
        ))}
      </div>
    </div>
  );
};

export default BNSdetails;
