"use client";
import React, { useState } from "react";
import { LiaComments } from "react-icons/lia";
const All = () => (
  <div className="flex flex-col bg-orange-100 justify-center items-center gap-1 h-[70vh] md:h-[30vh] mt-2 rounded-lg shadow-none md:shadow-2xl">
    <LiaComments className="text-orange-600" size={100} />
    <p className="font-bold text-[1.4em]">No Data Found! </p>
    <p className="text-[1em] text-gray-600 font-semibold">
      No data found about Learning Tips
    </p>
  </div>
);

const Unread = () => (
  <div className="flex flex-col bg-orange-100 justify-center items-center gap-1 h-[70vh] md:h-[30vh] mt-2 rounded-lg shadow-none md:shadow-2xl">
    <LiaComments className="text-orange-400" size={100} />
    <p className="font-bold text-[1.4em]">No Data Found! </p>
    <p className="text-[1em] text-gray-600 font-semibold">
      No data found about any information
    </p>
  </div>
);

const Read = () => (
  <div className="flex flex-col bg-orange-100 justify-center items-center gap-1 h-[70vh] md:h-[30vh] mt-2 rounded-lg shadow-none md:shadow-2xl">
    <LiaComments className="text-orange-200" size={100} />
    <p className="font-bold text-[1.4em]">No Data Found! </p>
    <p className="text-[1em] text-gray-600 font-semibold">
      No data found at this moment{" "}
    </p>
  </div>
);

const Notification = () => {
  const [active4, setActive4] = useState("All");
  return (
    <div>
      <div>
        <div className="px-8">
          <div className="flex gap-5 text-[.8em] mt-4">
            <button
              className={`tab-button ${
                active4 === "All"
                  ? "active bg-orange-500 rounded-full text-white p-2"
                  : "text-black"
              }`}
              onClick={() => setActive4("All")}
            >
              All
            </button>
            <button
              className={`tab-button ${
                active4 === "Unread"
                  ? "active bg-orange-500 rounded-full p-2 text-white"
                  : "text-black"
              }`}
              onClick={() => setActive4("Unread")}
            >
              Unread
            </button>
            <button
              className={`tab-button ${
                active4 === "Read"
                  ? "active bg-orange-500 rounded-full p-2 text-white"
                  : "text-black"
              }`}
              onClick={() => setActive4("Read")}
            >
              Read
            </button>
          </div>
        </div>
      </div>
      <div>
        {active4 === "All" && <All />}
        {active4 === "Unread" && <Unread />}
        {active4 === "Read" && <Read />}
      </div>
    </div>
  );
};

export default Notification;
