"use client";
import React, { useState, useContext } from "react";
import { FormContext } from "@/src/context/FormContext";
import axios from "axios";

const Form1 = ({ onContinue }) => {
  const gender = ["Male", "Female"];
  const languages = ["English", "Hindi", "Spanish", "French"];
  const subjects = [
    "Mathematics",
    "Science",
    "History",
    "Geography",
    "English",
    "Hindi",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Physical Education",
    "Music",
    "Art",
    "Dance",
    "Drama",
    "Economics",
    "Business Studies",
    "Accounting",
    "Commerce",
    "Political Science",
    "Sociology",
    "Psychology",
    "Philosophy",
    "Environmental Science",
    "Agriculture",
    "Home Science",
  ];
  const cities = ["Jaipur"];
  // Use context to get the current form data and dispatch function
  const { state: formData, dispatch } = useContext(FormContext);

  const [errors, setErrors] = useState({});

  const [apiError, setApiError] = useState(""); // Backend error

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For mobile number, filter out non-digit characters and limit to 10 digits
    if (name === "mobilenumber") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters
      if (numericValue.length <= 10) {
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { [name]: numericValue },
        });
      }
    }
    // For Aadhaar number, filter out non-digit characters and limit to 12 digits
    else if (name === "aadhar") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters
      if (numericValue.length <= 12) {
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { [name]: numericValue },
        });
      }
    } else {
      // For other fields, use the original logic
      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: { [name]: value },
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "*Name is required";

    if (!formData.mobilenumber) {
      newErrors.mobilenumber = "*Mobile number is required";
    } else if (!/^\d+$/.test(formData.mobilenumber)) {
      newErrors.mobilenumber = "*Mobile number must contain only digits";
    } else if (formData.mobilenumber.length !== 10) {
      newErrors.mobilenumber = "*Mobile number must be exactly 10 digits";
    }
    // Validate Aadhar Number
    if (!formData.aadhar) {
      newErrors.aadhar = "*Aadhar number is required";
    } else if (!/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = "*Aadhar number must be exactly 12 digits";
    } else {
      // Check for sequential Aadhar numbers
      const sequentialPatterns = [
        "012345678901",
        "123456789012",
        "234567890123",
        "345678901234",
        "456789012345",
        "567890123456",
        "678901234567",
        "111111111111",
        "222222222222",
        "333333333333",
        "444444444444",
        "555555555555",
        "666666666666",
        "777777777777",
        "888888888888",
        "999999999999",
        "101010101010",
        "202020202020",
        "303030303030",
        "404040404040",
        "505050505050",
        "606060606060",
        "707070707070",
        "808080808080",
        "909090909090",
        "123456789101",
      ];

      if (sequentialPatterns.includes(formData.aadhar)) {
        newErrors.aadhar = "*Enter a valid Aadhar number";
      }
    }
    if (!formData.gender) newErrors.gender = "*Gender is required";
    if (!formData.subject) newErrors.subject = "*Subject is required";
    if (!formData.language) newErrors.language = "*Language is required";
    if (!formData.city) newErrors.city = "*City is required"; // Validation for city

    // Validate Date of Birth
    if (!formData.dob) {
      newErrors.dob = "*Date of Birth is required";
    } else if (new Date(formData.dob) >= new Date()) {
      newErrors.dob = "*Date of Birth must be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "https://learnospherebackend.singhbrothers.ltd/api/route/checkteachersdata",
          {
            email: formData.email,
            mobilenumber: formData.mobilenumber,
            registrationNumber: formData.registrationNumber,
          }
        );

        if (response.status === 200) {
          // No duplicate entry found, proceed to the next step
          onContinue();
        }
      } catch (error) {
        if (error.response) {
          // Show API errors based on the response
          const message = error.response.data.message;
          if (message.includes("Email")) {
            setApiError("Email already registered");
          } else if (message.includes("Mobile number")) {
            setApiError("Mobile number already registered");
          } else if (message.includes("Registration number")) {
            setApiError("Registration number already exists");
          }
        } else {
          setApiError("Unexpected server error. Please try again.");
        }
      }
    }
  };

  return (
    <div className="w-full bg-[#fff] max-w-md mx-auto p-8 shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-start">About</h1>
      <p className="my-4 mb-8 text-start">
        Start creating your public tutor profile. Your progress will be
        automatically saved as you complete each section. You can return at any
        time to finish your registration.
      </p>

      <form>
        {/* Existing Fields */}
        <div className="relative mb-5">
          <input
            type="text"
            name="name"
            disabled
            value={formData.name || ""}
            onChange={handleInputChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            placeholder="Your full name  "
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          />
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Full Name
          </label>
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>

        <div className="relative mb-5">
          <input
            type="email"
            name="email"
            disabled
            value={formData.email || ""}
            onChange={handleInputChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            placeholder=""
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          />
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Email
          </label>

          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>

        <div className="relative mb-5">
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleInputChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          >
            <option value="" disabled hidden>
              Select Gender
            </option>
            {gender.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Gender
          </label>
          {errors.gender && <p className="text-red-600">{errors.gender}</p>}
        </div>
        {/* Date of Birth Input */}
        <div className="relative mb-5">
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleInputChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          />
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Date of Birth
          </label>
          {errors.dob && <p className="text-red-600">{errors.dob}</p>}
        </div>

        <div className="relative mb-7">
          <select
            name="subject"
            value={formData.subject || ""}
            onChange={handleInputChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          >
            <option value="" disabled hidden>
              Select subject
            </option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Subject you teach
          </label>
          {errors.subject && <p className="text-red-600">{errors.subject}</p>}
        </div>

        <div className="relative mb-7">
          <select
            name="language"
            value={formData.language || ""}
            onChange={handleInputChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          >
            <option value="" disabled hidden>
              Select language
            </option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Language you speak
          </label>
          {errors.language && <p className="text-red-600">{errors.language}</p>}
        </div>

        <div className="relative mb-7">
          {/* Fixed country code section */}
          <div
            className="flex items-center border-b-2"
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          >
            <span className="text-gray-500 text-lg pr-2">+91</span>
            <input
              type="tel"
              name="mobilenumber"
              value={formData.mobilenumber || ""}
              onChange={handleInputChange}
              className="block w-full border-0 focus:ring-0 bg-transparent py-2.5"
              placeholder=" "
              style={{
                outline: "none",
              }}
            />
          </div>
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Mobile Number
          </label>
          {errors.mobilenumber && (
            <p className="text-red-600">{errors.mobilenumber}</p>
          )}
        </div>

        <div className="relative mb-7">
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar || ""}
            onChange={handleInputChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            placeholder=""
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          />
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Aadhar Number
          </label>
          {errors.aadhar && <p className="text-red-600">{errors.aadhar}</p>}
        </div>
        {/* New City Selection */}
        <div className="relative mb-7">
          <select
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            style={{
              outline: "none",
              borderBottomWidth: "2px",
              borderBottomColor: "#3182ce",
            }}
          >
            <option value="" disabled hidden>
              Select City
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            City
          </label>
          {errors.city && <p className="text-red-600">{errors.city}</p>}
        </div>
        {apiError && <p className="text-red-600 mb-4">{apiError}</p>}
        <div className="flex justify-between mb-7">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full bg-orange-600 hover:bg-orange-400 text-white py-2 rounded"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form1;
