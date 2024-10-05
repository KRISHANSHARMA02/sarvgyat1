"use client";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Socialloginstudent, doCredentialLogin } from "@/app/actions";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      

      const response = await doCredentialLogin({ email, password , role: "student" });

      if (response.error) {
        setSuccessMessage("");
        setErrors([
          { message: "*Login failed. Please enter valid email or password." },
        ]);
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
        setEmail("");
        setPassword("");
        Swal.fire({
          title: "Logged in successfull!",
          text: "You have successfully logged in.",
          icon: "success",
        });
        // Check if the user has completed the form
        const userResponse = await fetch(
          "https://learnospherebackend.singhbrothers.ltd/api/route/checkStudent",            //https://learnospherebackend.singhbrothers.ltd/api/route/checkStudent 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${response.token}`,
            },
            body: JSON.stringify({ email }),
          }
        );

        const userData = await userResponse.json();

        if (userData.formCompleted) {
          router.push("/Userdashboard");
        } else {
          router.push("/StudentForm");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors([
        {
          messasge: "Login failed. Please enter valid email and password.",
        },
      ]);
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
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            name="email"
            className="peer w-full bg-transparent px-4 py-2 border outline-none rounded-lg text-base focus:border-blue-500 focus:ring-0 transition-all duration-150"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-Poppins font-semibold transition-all duration-150 ${
              email ? "top-[-10px] left-2 text-sm text-blue-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500`}
          >
            Email Address<span className="text-red-500">*</span>
          </label>
        </div>

        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="peer w-full bg-transparent border outline-none rounded-lg px-4 py-2 borderrounded-lg text-base focus:border-blue-500 focus:ring-0 transition-all duration-150"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          
          />
          <label
            htmlFor="password"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-Poppins font-semibold  transition-all duration-150 ${
              password ? "top-[-10px] left-2 text-sm text-blue-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500`}
          >
            Password <span className="text-red-500">*</span>
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
        </div>
        

        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Login
        </button>
        {errors.length > 0 && (
          <div className="mt-4 text-red-500 text-sm">
            {errors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}
        <div className="text-center mt-4">
 <Link href="/Forgot-password-students" className="text-blue-500 hover:underline">Forgot Password?</Link>
</div>

      </form>
    </div>
  );
};

export default LoginForm;
