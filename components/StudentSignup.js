"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
// import { Socialloginstudent } from "@/app/actions";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    try {
      // Make the API request to the backend
      const response = await axios.post(
        "https://learnospherebackend.singhbrothers.ltd/api/route/studentsignup",   //https://learnospherebackend.singhbrothers.ltd/api/route/studentsignup
        { name, email, password }
      );

      // Handle success
      Swal.fire({
        title: "Success!",
        text: "Signup successful!",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log("Signup successful:", response.data);

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;

        // Display each error individually using SweetAlert
        for (const error of errors) {
          const param = error.param
            ? `${error.param.charAt(0).toUpperCase() + error.param.slice(1)}`
            : "Field";
          await Swal.fire({
            title: "Validation Error!",
            text: `${param}: ${error.msg}`,
            icon: "error",
            confirmButtonText: "OK",
          });

          // Set field errors for inline display
          if (error.param === "name") {
            setNameError(error.msg);
          } else if (error.param === "email") {
            setEmailError(error.msg);
          } else if (error.param === "password") {
            setPasswordError(error.msg);
          }
        }
      } else {
        // Show generic error message
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div>
      {/* <form action={Socialloginstudent}>
        <button
          type="submit"
          name="action"
          value="google"
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md flex items-center justify-center hover:bg-gray-200 transition"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Continue with Google
        </button>
      </form> */}

      {/* <div className="my-4 flex items-center">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-4 text-gray-500">or</span>
        <hr className="flex-1 border-gray-300" />
      </div> */}

      <form onSubmit={handleSubmit}>
        <div className="relative mb-6 font-Poppins">
          <input
            type="text"
            id="name"
            name="name"
            className={`peer w-full bg-transparent outline-none px-4 py-2 border ${
              nameError ? "border-red-500" : "border-gray-300"
            } rounded-lg text-base focus:border-blue-500 focus:ring-0 transition-all duration-150`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="name"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-semibold transition-all duration-150 ${
              name ? "top-[-10px] left-2 text-sm text-blue-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500`}
          >
            Name<span className="text-red-500">*</span>
          </label>
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>

        <div className="relative w-full mb-6 font-Poppins">
          <input
            type="email"
            id="email"
            name="email"
            className={`peer w-full bg-transparent outline-none px-4 py-2 border ${
              emailError ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-white text-base focus:border-blue-500 focus:shadow-md transition-all duration-150`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-semibold transition-all duration-150 ${
              email ? "top-[-10px] left-2 text-sm text-blue-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500`}
          >
            Email Address<span className="text-red-500">*</span>
          </label>
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div className="relative mb-6 font-Poppins">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className={`peer w-full bg-transparent outline-none px-4 py-2 pr-12 border ${
              passwordError ? "border-red-500" : "border-gray-300"
            } rounded-lg text-base focus:border-blue-500 focus:shadow-md transition-all duration-150`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-semibold transition-all duration-150 ${
              password ? "top-[-10px] left-2 text-sm text-blue-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500`}
          >
           Create Password<span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3"
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </button>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
