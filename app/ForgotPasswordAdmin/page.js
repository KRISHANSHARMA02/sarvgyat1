"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/route/forgotpasswordadmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setSuccess("");
      } else {
        setSuccess("Password reset successfully");
        setError("");
      }
      Swal.fire({
        title: data.error ? "Success" : "Error",
        text: data.error || "check your gmail for reset link",
        icon: data.error ? "success" : "error",
      });
    } catch (error) {
      console.log("Error:", error);
      setError("");
      setSuccess("");
    }
  };
  const backgroundImageStyle = {
    backgroundImage: `url(/background.jpg)`, // Relative path to the image
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="bg-orange-300 pb-8 pt-8 h-screen"
      style={backgroundImageStyle}
    >
      <h2 className="font-bold flex justify-center items-center text-[2em] mt-28">
        Learn<b className="text-orange-500">O</b>shpere Admin
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="p-8 md:p-16 rounded-xl gap-4 bg-orange-200 mt-6 w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[30vw] m-auto flex flex-col">
          <h2 className="text-[1.2em] md:text-[1.5em] font-bold text-center">
            Forgot Password
          </h2>
          <p className="text-[0.8em] md:text-[1em] text-gray-600 text-center">
            Enter your email address and we will send you a link to reset your
            password
          </p>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              className="p-3 w-full border border-gray-400 rounded-md placeholder:text-gray-500 text-[1em]"
              onChange={(e) => setUsername(e.target.value)}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 w-full text-white font-semibold p-3 rounded-full mt-4 transition-all ease-in-out duration-200 hover:bg-orange-600"
          >
            Send reset link
          </button>

          {success && (
            <div className="mt-4 text-green-500 text-sm text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
          )}
        </div>
      </form>

      <Link href="/">
        <button className="flex justify-center items-center  w-60 md:w-80 text-center m-auto bg-orange-500 text-white font-bold mt-5 p-2 rounded-lg transition-all ease-in-out duration-200 hover:bg-orange-600 gap-2">
          <IoMdArrowRoundBack />
          Back To Login
        </button>
      </Link>
    </div>
  );
};

export default ForgotPassword;
