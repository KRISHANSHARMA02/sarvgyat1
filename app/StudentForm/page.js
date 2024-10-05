"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import background from "@/public/stbg.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function StudentForm() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    studentName: "",
    gmail: "",
    mobileNumber: "",
    gender: "",
    dob: "",
    subject: "",
    city: "",
    grade: "",
    tutorCharacteristics: "",
    language: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      setFormData((prevData) => ({
        ...prevData,
        studentName: session.user.name || "",
        gmail: session.user.email || "",
      }));
    }
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://learnospherebackend.singhbrothers.ltd/api/route/studentForm", //https://learnospherebackend.singhbrothers.ltd/api/route/studentForm
        formData
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Form submitted successfully. Thank you for connecting with us!",
        });
        // Optionally reset the form or redirect
        setFormData({
          studentName: "",
          gmail: "",
          mobileNumber: "",
          gender: "",
          dob: "",
          subject: "",
          city: "",
          grade: "",
          tutorCharacteristics: "",
          language: "",
          address: "",
        });
        setErrors({});
        setGeneralError("");
        router.push("/Userdashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors, general } = error.response.data;

        if (errors) {
          setErrors(errors);
        }

        if (general) {
          setGeneralError(general);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: general,
          });
        } else {
          setGeneralError("An unexpected error occurred. Please try again.");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An unexpected error occurred. Please try again.",
          });
        }
      }
    }
  };

  return (
    <>
      <div
        className="w-full"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold font-Poppins text-white text-center mb-6 pt-6">
          Unlock Your Learning Potential with Learnosphere
        </h1>
        <p className="text-white font-Poppins text-center mb-8">
          At Learnosphere, we are dedicated to helping you find the perfect
          tutor who meets your academic needs and preferences. Fill out the form
          below to get started.
        </p>

        <div className="w-[90vw] md:w-3/5 lg:w-2/4 mx-auto py-8">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 shadow-orange-300">
            <form className="space-y-6 font-Poppins">
              <h2 className="text-lg font-semibold text-gray-700 text-start mb-6">
                Share Your Details to Unlock Your Dashboard
              </h2>
              <div className="relative mb-4">
                <label
                  htmlFor="studentName"
                  className="block text-sm font-medium text-black"
                >
                  Student Name*
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  readOnly
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  placeholder="Enter your name"
                />
                {errors.studentName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.studentName}
                  </p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="gmail"
                  className="block text-sm font-medium text-black"
                >
                  Gmail*
                </label>
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  value={formData.gmail}
                  readOnly
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  placeholder="Enter your email"
                />
                {errors.gmail && (
                  <p className="text-red-600 text-sm mt-1">{errors.gmail}</p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-black"
                >
                  Mobile Number*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    maxLength="10"
                    pattern="\d{10}"
                    className="mt-1 block w-full px-14 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                    placeholder="1234567890"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm">
                    +91
                  </span>
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-black"
                >
                  Gender*
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-black"
                >
                  Date of Birth*
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  placeholder="Select your date of birth"
                />
                {errors.dob && (
                  <p className="text-red-600 text-sm mt-1">{errors.dob}</p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-black"
                >
                  Subject*
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>                 
                  <option value="Physical Education">Physical Education</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Economics">Economics</option>
                  <option value="Accountancy">Accountancy</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Psychology">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  
                </select>
                {errors.subject && (
                  <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Grade*
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select Grade</option>

                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
                {errors.grade && (
                  <p className="text-red-600 text-sm mt-1">{errors.grade}</p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-black"
                >
                  City*
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select City</option>
                  <option value="Jaipur">Jaipur</option>
                </select>
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-black"
                >
                  Address*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md resize-none shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  placeholder="Enter your full address"
                  rows="2"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tutorCharacteristics"
                  className="block text-black font-semibold"
                >
                  Preferred Tutor Characteristics*
                </label>
                <textarea
                  id="tutorCharacteristics"
                  value={formData.tutorCharacteristics}
                  name="tutorCharacteristics"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Describe the type of tutor you're looking for"
                />
                {errors.tutorCharacteristics && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.tutorCharacteristics}
                  </p>
                )}
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-black"
                >
                  Language*
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
                {errors.language && (
                  <p className="text-red-600 text-sm mt-1">{errors.language}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-slate-600">* Required fields</p>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-3 px-6 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Submit
              </button>
            </form>
            {generalError && (
              <div className="mb-2 mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
                {generalError}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
