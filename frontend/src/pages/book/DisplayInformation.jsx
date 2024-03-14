import React from "react";

const DisplayInformation = () => {
  return (
    <>
      <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
        <h3 className="text-lg font-bold text-[#333]">Product information</h3>
        <ul className="mt-6 space-y-6 text-[#333]">
          <li className="text-sm">
            TITLE<span className="ml-4 float-right">LAPTOP</span>
          </li>
          <li className="text-sm">
            AUTHOR <span className="ml-4 float-right">16 BG</span>
          </li>
          <li className="text-sm">
            PUBLISHER <span className="ml-4 float-right">1000 BG</span>
          </li>
          <li className="text-sm">
            GENRE
            <span className="ml-4 float-right">INTEL CORE I7-12700H</span>
          </li>
          <li className="text-sm">
            PUBLISHED ON
            <span className="ml-4 float-right">2.3 - 4.7 GHz</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DisplayInformation;
