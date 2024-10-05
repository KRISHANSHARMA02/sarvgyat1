"use client";
import React, { useState } from "react";

// import { FcGoogle } from "react-icons/fc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {  doCredentialLogin } from "../actions";

import axios from "axios";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";


const RegistrationForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserdata({
      ...userdata,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { email, password } = userdata;
  
      // Login the teacher
      const response = await doCredentialLogin({ email, password, role: "teacher" });
  
      if (response.error) {
        setSuccessMessage("");
        setErrors([{ message: "*Login failed. Please enter valid email or password." }]);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed. Please enter valid email or password.",
        });
        console.log({ message: response.error });
      } else {
        setErrors([]);
        console.log("Logged in successfully:", response);
        setSuccessMessage("You have successfully logged in.");
        Swal.fire({
          title: "Logged in successfully!",
          text: "You have successfully logged in.",
          icon: "success",
        });
  
        // Check if the teacher has completed the form
        const teacherResponse = await fetch(
          "https://learnospherebackend.singhbrothers.ltd/api/route/checkTeacher", // Updated route for checking form status
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${response.token}`, // Use the token from the login response
            },
            body: JSON.stringify({ email }), // Send the email in the request body
          }
        );
  
        const teacherData = await teacherResponse.json();
  
        // Check form completion status and redirect accordingly
        if (teacherData.formCompleted) {
          router.push("/Teacherdashboard"); // Redirect to Teacher Dashboard if form is completed
        } else {
          router.push("/Signin/Teacherform"); // Redirect to Teacher Form if form is not completed
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors([{ message: "Login failed. Please enter valid email and password." }]);
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const response = await axios.post(
        "https://learnospherebackend.singhbrothers.ltd/api/route/signup", //https://learnospherebackend.singhbrothers.ltd/api/route/signup

        userdata
      );
      
      // Reset form fields after submission
      setuserdata({
        name: "", 
        email: "",
        password: "",
      });

      setErrors([]);
      setSuccessMessage("You have successfully registered. Log in now.");
      Swal.fire({
        title: "Registration successfull!",
        text: "You have successfully registered. Log in now.",
        icon: "success",
      });
      setIsLogin(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ msg: "Something went wrong. Please try again." }]);
      }
    }
  };

  return (
    <>
    
      
      <div className="bg-[#fff]">
        <div className="flex w-auto md:w-full  justify-center items-center mx-auto mt-[80px] relative">
          <div className="flex flex-col md:flex-row rounded-lg md:rounded-3xl bg-white shadow-xl m-4 md:m-10 w-[90vw] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-300 to-pink-300 hidden rounded-3xl md:block shadow-lg md:w-1/2 p-6 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 space-y-6">
                <h2 className="text-4xl font-bold font-Poppins mb-4 text-slate-900">
                  Join Learn<b className="text-orange-600">O</b>sphere
                </h2>
                <p className="text-lg text-start font-Poppins text-gray-800">
                  Empower students with your expertise.
                </p>
                <ul className="space-y-4 text-start font-Poppins text-gray-800">
                  <li className="flex items-center justify-start">
                    <AiOutlineCheckCircle size={25} className="mr-2" />
                    Sign up with your email or Google account.
                  </li>
                  <li className="flex items-center justify-start">
                    <AiOutlineCheckCircle size={25} className="mr-2" />
                    Complete your profile with necessary details.
                  </li>
                  <li className="flex items-center justify-start">
                    <AiOutlineCheckCircle size={25} className="mr-2" />
                    Verify your email and start tutoring!
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12 w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center mb-10">
                {isLogin ? "Log in as an Educator" : "Sign up as an Educator"}
              </h2>

              {/* <form
                action={Sociallogin}
                className="flex items-center justify-center mb-6"
              >
                <button
                  type="submit"
                  name="action"
                  value="google"
                  className="w-full flex items-center justify-center px-4 py-3 bg-slate-900 text-white font-semibold rounded-full transition-colors  duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500 "
                >
                  <div className="flex items-center gap-4">
                    <FcGoogle size={25} />

                    <span>Continue with Google</span>
                  </div>
                </button>
              </form> */}

              {/* <div className="flex items-center justify-center mb-7">
                <span className="text-black font-bold font-Poppins">or</span>
              </div> */}

              {isLogin ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="relative mb-4 font-Poppins">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={userdata.email}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Email<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-4 font-Poppins">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Your password"
                      value={userdata.password}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Password<span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center mb-4">
                    <input type="checkbox" id="remember-me" className="mr-2" />
                    <label
                      htmlFor="remember-me"
                      className="text-gray-700 font-Poppins"
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-500 font-Poppins text-white rounded-lg shadow-md"
                  >
                    Log in
                  </button>

                  <p className="mt-4 text-center text-gray-500 text-xs font-Poppins">
                    By clicking Continue or Sign up, you agree to Learnosphere
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Terms of Use
                    </a>
                    , including
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Subscription Terms
                    </a>{" "}
                    and
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Privacy Policy
                    </a>
                    .
                  </p>
                  {Array.isArray(errors) && errors.length > 0 && (
                    <div className="mt-4">
                      {errors.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                          {error.message}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="text-center mt-4">
                    <Link
                      href="/Forgot-password-teachers"
                      className="text-blue-500 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit}>
                  <div className="relative mb-4 font-Poppins">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter you fullname"
                      value={userdata.name}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Name<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-4 font-Poppins">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={userdata.email}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Email<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-4 font-Poppins">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Your password"
                      value={userdata.password}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5 pr-10" // Added pr-10 to provide space for the icon
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                     Create Password<span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-500 font-Poppins text-white rounded-lg shadow-md"
                  >
                    Sign up
                  </button>

                  <p className="mt-4 text-center text-gray-500 text-xs font-Poppins">
                    By clicking Continue or Sign up, you agree to Learnosphere
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Terms of Use
                    </a>
                    , including
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Subscription Terms
                    </a>{" "}
                    and
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Privacy Policy
                    </a>
                    .
                  </p>

                  {Array.isArray(errors) && errors.length > 0 && (
                    <div className="mt-4">
                      {errors.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                          {error.msg}
                        </p>
                      ))}
                    </div>
                  )}
                </form>
              )}

              {successMessage && (
                <div className="mt-4 text-green-500">
                  <p>{successMessage}</p>
                </div>
              )}

              <div className="mt-4 flex justify-center items-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-500 font-Poppins"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Log in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default RegistrationForm;
