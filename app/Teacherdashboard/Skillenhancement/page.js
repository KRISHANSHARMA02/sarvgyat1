"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Class from "@/public/Classroom-removebg-preview.png"; // Adjust the import path
import BoyThink from "@/public/Boythinking.png";
import { IoCloseOutline } from "react-icons/io5";
import { LiaComments } from "react-icons/lia";
import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
const Skillenhancement = () => {
  const [isTestPopupVisible, setIsTestPopupVisible] = useState(false);
  const [active3, setActive3] = useState("LearningTips");
  const classtestclick = () => {
    setIsTestPopupVisible(true);
  };

  const TestClosePopup = () => {
    setIsTestPopupVisible(false);
  };
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);
  const LearningTips = () => (
    <div className="flex flex-col bg-orange-100 justify-center items-center gap-1 h-[70vh] md:h-[30vh] mt-8 rounded-lg shadow-none md:shadow-2xl">
      <LiaComments className="text-orange-600" size={200} />
      <p className="font-bold text-[1.4em]">No Data Found! </p>
      <p className="text-[1em] text-gray-600 font-semibold">
        No data found about Learning Tips
      </p>
    </div>
  );

  const Informative = () => (
    <div className="flex flex-col bg-orange-100 justify-center items-center gap-1 h-[70vh] md:h-[30vh] mt-8 rounded-lg shadow-none md:shadow-2xl">
      <LiaComments className="text-orange-400" size={200} />
      <p className="font-bold text-[1.4em]">No Data Found! </p>
      <p className="text-[1em] text-gray-600 font-semibold">
        No data found about any information
      </p>
    </div>
  );

  const Parenting = () => (
    <div className="flex flex-col bg-orange-100 justify-center items-center gap-1 h-[70vh] md:h-[30vh] mt-8 rounded-lg shadow-none md:shadow-2xl">
      <LiaComments className="text-orange-200" size={200} />
      <p className="font-bold text-[1.4em]">No Data Found! </p>
      <p className="text-[1em] text-gray-600 font-semibold">
        No data found at this moment{" "}
      </p>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="bg-orange-200 p-2 md:p-6 mx-2 md:mx-8 rounded-xl h-auto xl:h-[38vh] 2xl:h-[30vh] mt-9 w-full md:w-[65%] flex justify-between">
          <div className=" md:p-2">
            <p className="mt-6 px-2 md:px-8 font-bold text-[.9em] md:text-[1.4em] w-auto md:w-96">
              Take Your Skill Assessment Test Now
            </p>
            <Link href="/Teacherdashboard/SkillTest">
              <button className="bg-white mx-2 md:mx-10 mt-4 md:mt-10 border-2xl text-orange-600 font-semibold p-3 rounded-lg text-[.8em]">
                Take Skill Test
              </button>
            </Link>
          </div>
          <div className="p-2 mt-2 mb-2">
            <Image
              className="h-32 md:h-52 w-32 md:w-52"
              src={Class}
              alt="Classroom Image"
            />
          </div>
        </div>

        {/* Right Section with Requests and Upcoming Classes */}
        <div className="flex flex-col gap-4 w-full md:w-[35%]">
          <div>
            <p className="font-bold text-[1.2em]  mx-2 xl:mx-0 2xl:mx-10">
              Respond to Request
            </p>
            <div className="mt-2 flex bg-orange-100 mx-2 xl:mx-0 2xl:mx-8 justify-between p-4 rounded-xl">
              <div className="flex flex-col gap-2 p-3">
                <p className="font-semibold text-[1.1em]">Class Request</p>
                <p className="font-bold text-[.8em] md:text-[1em]">
                  You have no request yet!
                </p>
              </div>
              <div>
                <Image
                  className="h-24 w-24"
                  src={BoyThink}
                  alt="Boy Thinking Image"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="font-bold text-[1.2em] mx-2 xl:mx-0 2xl:mx-8">
              Upcoming Class
            </p>
            <div className="mt-2 flex bg-orange-100  mx-2 xl:mx-0 2xl:mx-8 justify-between p-4 rounded-xl">
              <div className="flex flex-col gap-2 p-3">
                <p className="font-semibold text-[1.1em]">Upcoming Class</p>
                <p className="font-bold text-[.8em] md:text-[1em]">
                  You have no Upcoming Classes
                </p>
              </div>
              <div>
                <Image
                  className="h-24 w-24"
                  src={BoyThink}
                  alt="Boy Thinking Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTestPopupVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <IoCloseOutline
              size={30}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={TestClosePopup}
            />
            <p className="text-center font-bold text-lg mb-4">
              Test Notification
            </p>
            <p className="text-center">
              Your test has been scheduled successfully.
            </p>
          </div>
        </div>
      )}
      <div className="px-8">
        <div className="flex gap-5 text-[0.8em] mt-4">
          <button
            className={`tab-button ${
              active3 === "LearningTips"
                ? "active bg-orange-500 rounded-full p-2 text-white"
                : "text-black"
            }`}
            onClick={() => setActive3("LearningTips")}
          >
            Learning Tips
          </button>
          <button
            className={`tab-button ${
              active3 === "Informative"
                ? "active bg-orange-500 rounded-full p-2 text-white"
                : "text-black"
            }`}
            onClick={() => setActive3("Informative")}
          >
            Informative
          </button>
          <button
            className={`tab-button ${
              active3 === "Parenting"
                ? "active bg-orange-500 rounded-full p-2 text-white"
                : "text-black"
            }`}
            onClick={() => setActive3("Parenting")}
          >
            Parenting
          </button>
        </div>
        {active3 === "LearningTips" && <LearningTips />}
        {active3 === "Informative" && <Informative />}
        {active3 === "Parenting" && <Parenting />}
      </div>
    </div>
  );
};

export default Skillenhancement;
