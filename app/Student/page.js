"use client";
import React, { useState } from "react";

import StudentLogin from "@/components/StudentLogin";
import StudentSignup from "@/components/StudentSignup";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Student = () => {
  // State to manage whether to show the signup form or login form
  const [isSignup, setIsSignup] = useState(false);


  return (
    <>


      <div className="flex flex-col md:flex-row w-full justify-center items-center bg-gradient-to-r from-orange-200 via-slate-200 to-red-200 mx-auto mt-16 relative p-4">
        {/* Left side for description */}
        <div className="hidden md:flex md:w-1/2 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-opacity-40 p-5" />
          <div className="relative z-10 flex flex-col items-start justify-center text-black space-y-6">
            <h2 className="text-4xl font-bold font-Poppins mb-4">
              Join Learn<b className="text-orange-600">O</b>sphere
            </h2>
            <p className="text-xl font-Poppins text-black">
              Discover and connect with top tutors to enhance your learning
              experience.
            </p>
            <ul className="space-y-4 text-lg font-semibold font-Poppins">
              <li className="flex items-center">
                <AiOutlineCheckCircle size={25} className="mr-2" />
                Sign up with your email or Google account.
              </li>
              <li className="flex items-center">
                <AiOutlineCheckCircle size={25} className="mr-2" />
                Complete your student profile with preferences and interests.
              </li>
              <li className="flex items-center">
                <AiOutlineCheckCircle size={25} className="mr-2" />
                Explore and connect with tutors who match your learning goals.
              </li>
              <li className="flex items-center">
                <AiOutlineCheckCircle size={25} className="mr-2" />
                Access your personalized dashboard to track progress and manage
                your sessions.
              </li>
            </ul>
          </div>
        </div>

        {/* Right side for forms */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg border my-6 border-gray-200 max-w-md relative z-10">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {isSignup ? "Student Signup" : "Student Login"}
          </h1>

          {/* Conditionally render the signup or login form */}
          {isSignup ? <StudentSignup /> : <StudentLogin />}

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 hover:underline"
            >
              {isSignup
                ? "Already have an account? Login"
                : "New User? Sign Up"}
            </button>
          </div>
          
        </div>
      </div>

    </>
  );
};

export default Student;
