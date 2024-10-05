"use client";
import React from "react";
import Science from "@/public/Science.png";
import Math from "@/public/math.jpg";
import Image from "next/image";
import Link from "next/link";
import Sciencetest from "../Sciencetest/page";
import mathtest from "../Mathtest/page";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LiaRunningSolid } from "react-icons/lia";

const pracrticequestion = (Layout) => {
  return (
    <div>
      <div className="flex  flex-col md:flex-row gap-2">
        <div className=" p-6 border-gray-300 rounded-lg w-full md:w-[45%] h-[40vh]  border mx-2 md:mx-8 ">
          <p className=" p-2 rounded-lg font-bold ytext-[0.9em] md:text-[1.4em] w-96">
            Pick a Subject To Start Practising{" "}
          </p>
          <div className="flex gap-6 mt-5 ">
            <Link href={`Userdashboard/Sciencetest?subject=science`}>
              <span>
                <Image
                  className="h-28 md:h-36 w-28 md:w-36 rounded-lg"
                  src={Science}
                  alt=""
                />
                <p className="font-semibold text-center">Science</p>
              </span>
            </Link>
            <Link href={`Userdashboard/Sciencetest?subject=math`}>
              <span>
                <Image
                  className="h-28 md:h-36 w-28 md:w-36 rounded-lg"
                  src={Math}
                  alt=""
                />
                <p className="font-semibold text-center">Mathematics</p>
              </span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-[55%] flex flex-col gap-2 rounded-lg  p-6  border-gray-300 border">
          <p className="font-bold flex  items-center gap-2 text-[1.1em]">
            <FaRegCircleCheck size={20} className="text-orange-600" />
            Obtain comprehensive evaluation results
          </p>
          <p className="text-gray-700 px-8  text-[0.9em]">
            Obtain a comprehensive evaluation report that provides detailed
            insights into your performance and progress
          </p>
          <p className="font-bold flex items-center gap-2 text-[1.1em]">
            <FaRegCircleCheck size={20} className="text-orange-600 " />
            Complete section-specific quizzes to enhance understanding of
            concepts
          </p>
          <p className="text-gray-700 px-8 text-[0.9em]">
            Complete section-specific quizzes to deepen your understanding and
            mastery of the concepts
          </p>
          <p className="font-bold flex items-center gap-2 text-[1.1em]">
            <FaRegCircleCheck size={20} className="text-orange-600 " />
            Engage in practice exercises to strengthen your problem-solving
            skills
          </p>
          <p className="text-gray-700 px-8 text-[0.9em]">
            Engage in practice exercises to build and refine your
            problem-solving skills effectively
          </p>
          <div className="border-b relative border-gray-300 flex gap-11 xl:gap-20 2xl:gap-24 mt-60  mx-2 md:mx-5">
            <div className="relative ">
              <p className="  absolute bottom-0  border-r-2 flex border-gray-300 mx-2 xl:mx-6 2xl:mx-10 w-4 h-12">
                <LiaRunningSolid
                  className=" text-orange-300 absolute bottom-9"
                  size={40}
                />
              </p>
            </div>
            <div>
              <p className=" absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-20 mx-2 xl:mx-6 2xl:mx-10 ">
                <LiaRunningSolid
                  className=" text-orange-300 absolute bottom-16"
                  size={40}
                />
              </p>
            </div>
            <div>
              <p className=" absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-28 mx-2 xl:mx-6 2xl:mx-10 ">
                <LiaRunningSolid
                  className="text-orange-400  absolute bottom-24"
                  size={40}
                />
              </p>
            </div>
            <div>
              <p className=" absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-36 mx-2 xl:mx-6 2xl:mx-10 ">
                <LiaRunningSolid
                  className="text-orange-500  absolute bottom-32"
                  size={40}
                />
              </p>
            </div>
            <div>
              <p className=" absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-44 mx-2 xl:mx-6 2xl:mx-10">
                <LiaRunningSolid
                  className=" text-orange-600 absolute bottom-40"
                  size={40}
                />
              </p>
            </div>
            <div>
              <p className=" absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-52 mx-2 xl:mx-6 2xl:mx-10 ">
                <LiaRunningSolid
                  className=" text-orange-600 absolute bottom-48"
                  size={40}
                />
              </p>
            </div>
          </div>
          <div className="flex">
            <p className="mx-2 md:mx-8 text-[.6em] md:text-[.7em] w-10 xl:w-16 2xl:w-20">
              Goal-setting
            </p>
            <p className="mx-1 md:mx-4 text-[.6em]  md:text-[.7em] w-10 xl:w-12 2xl:w-16">
              Planning
            </p>
            <p className="mx-1 md:mx-4 text-[.6em]  md:text-[.7em] w-10 xl:w-12 2xl:w-16">
              Research
            </p>
            <p className="mx-1 md:mx-4 text-[.6em]  md:text-[.7em] w-10 xl:w-12 2xl:w-16">
              Strategy
            </p>
            <p className="mx-2 md:mx-4 text-[.6em]  md:text-[.7em] w-10 xl:w-12 2xl:w-16">
              Feedback
            </p>
            <p className="mx-1 md:mx-4 text-[.6em]  md:text-[.7em] w-10 xl:w-12 2xl:w-16">
              Reflect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pracrticequestion;
