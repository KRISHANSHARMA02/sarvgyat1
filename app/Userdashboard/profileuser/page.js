"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Profile from "@/public/profile.png";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Profileuser() {
  const [currentPasscode, setCurrentPasscode] = useState("");
  const [showChangePasscodeForm, setShowChangePasscodeForm] = useState(false);
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmNewPasscode, setConfirmNewPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [profileData, setProfileData] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setProfileData(response.data);
          console.log("Profile data:", response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [session, status]);

  function formatDate(dateTimeString) {
    if (!dateTimeString) return "";

    const date = new Date(dateTimeString);

    // Extract the date in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handlePasscodeChange = (event) => {
    event.preventDefault();

    if (newPasscode !== confirmNewPasscode) {
      setPasscodeError("New passcodes do not match.");
      return;
    }

    if (newPasscode.length < 6) {
      setPasscodeError("New passcode must be at least 6 characters long.");
      return;
    }

    setPasscodeError("");
    alert("Passcode changed successfully!");
    setCurrentPasscode("");
    setNewPasscode("");
    setConfirmNewPasscode("");
    setShowChangePasscodeForm(false); // Hide form after successful change
  };

  return (
    <div className="font-Poppins">
      {/* Personal Information Section */}
      <p className="text-white bg-orange-500 text-lg w-56 rounded-full border-b-2 border-orange-800 p-2 text-center">
        Personal Information
      </p>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Profile Information */}
        <div className="mt-8 border border-gray-300  pt-2 md:pt-6 w-full md:w-[40%] rounded-lg">
          <div className="flex flex-col items-center mt-10">
            <Image
              className="rounded-full h-32 md:h-44 w-32 md:w-44 border-8 border-orange-200"
              src={Profile}
              alt="Profile"
            />
            <p className="font-bold px-10 text-lg">
              {profileData?.studentName || "Loading..."}
            </p>
            <button className="px-10 text-orange-500 hover:border-b">
              Edit Profile
            </button>
          </div>
          <div className="relative mb-4 p-4">
            <label
              htmlFor="Course"
              className="block text-sm font-medium text-black"
            >
              Course
            </label>
            <select
              id="course"
              name="course"
              value={profileData?.subject || ""}
              onChange={(e) => setProfileData({ ...profileData, subject: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
            >
              <option className="text-bold">Course Premium</option>
              <option className="text-bold">JEE Mains/Advance</option>
              <option className="text-bold">NEET</option>
              <option className="text-bold">CBSE 10th Class</option>
              <option className="text-bold">CBSE 12th Class</option>

              {/* Other options */}
            </select>
          </div>
          <div className="bg-orange-200 mb-4 md:mb-12 shadow-2xl rounded-tr-lg gap-2 rounded-tl-lg border-b-2 p-3 md:p-6 border-orange-700 w-[95%] flex flex-col items-center m-auto text-white">
            <p className="text-orange-500 text-center p-2 rounded-full">
              Active Subscription
            </p>
            <p className="text-center bg-white text-black font-semibold p-2 text-[0.8em] rounded-full">
              {" "}
              {profileData?.grade || "Loading.."}
            </p>
            <button className="px-4 pt-2 bg-orange-500 text-white pb-2 rounded-lg">
              View All Subscriptions
            </button>
          </div>
        </div>

        {/* Other Information */}
        <div className="w-full md:w-[60%]  p-4 rounded-lg flex flex-col gap-3 md:gap-6 mt-1 md:mt-7">
          {/* Input Fields */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <span>
              <p className="text-[.8em] px-1">Name*</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="fullname"
                required
                name="fullname"
                value={profileData?.studentName || ""}
                onChange={(e) => setProfileData({ ...profileData, studentName: e.target.value })}
                placeholder="fullname"
              />
            </span>
            <span>
              <p className="text-[.8em] px-1">Phone Number</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="Contact"
                required
                name="Contact"
                value={profileData?.mobileNumber || ""}
                onChange={(e) => setProfileData({ ...profileData, mobileNumber: e.target.value })}
                placeholder="Contact"
              />
            </span>
          </div>
          {/* More Input Fields */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <span>
              <p className="text-[.8em] px-1">E-mail</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                name="email"
                required
                id="email"
                value={profileData?.gmail || ""}
                onChange={(e) => setProfileData({ ...profileData, gmail: e.target.value })}
                placeholder="E-mail"
              />
            </span>
            <span className="px-0 md:px-6">
              <p className="text-[.8em] px-1">DOB</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                type="text"
                id="dob"
                name="dob"
                value={formatDate(profileData?.dob)}
                onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
              />
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <span>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-[.8em] px-1 text-black"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profileData?.gender || ""}
                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                className="mt-1 block  w-full xl:w-[22vw] 2xl:w-[25vw] p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              >
                <option className="text-bold">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </span>
            <span className="px-0 md:px-6">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-black text-[.8em] px-1"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                value={profileData?.city || ""}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                className="mt-1 block w-full xl:w-[22vw] 2xl:w-[25vw] p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              >
                <option className="text-bold">City</option>
                <option>Jaipur</option>
                {/* Other cities */}
              </select>
            </span>
          </div>
          <button
            disabled
            className="bg-orange-600 cursor-not-allowed p-2 w-[20vw] md:w-[10vw] mt-2 rounded-lg text-white"
          >
            Save
          </button>

          {/* Current Passcode Section */}
          {/* {!showChangePasscodeForm && (
            <div className="mt-2 w-full xl:w-[22vw] 2xl:w-[25vw]  shadow-2xl rounded-tr-lg gap-2 rounded-tl-lg border-b-2 p-6 border-orange-700  flex flex-col items-center m-auto text-white">
              <p className="text-orange-500 text-center p-2 rounded-full">
                Current Passcode
              </p>
              <input
                type="password"
                id="currentPasscode"
                name="currentPasscode"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={currentPasscode}
                onChange={(e) => setCurrentPasscode(e.target.value)}
                placeholder="Enter your current passcode"
                required
              />
              <button
                onClick={() => setShowChangePasscodeForm(true)}
                className="mt-4 bg-orange-500 text-white p-2 rounded-lg w-full"
              >
                Change Passcode
              </button>
            </div>
          )} */}

          {/* Change Passcode Form */}
          {/* {showChangePasscodeForm && (
            <div className="mt-2  shadow-2xl rounded-tr-lg gap-2 rounded-tl-lg border-b-2 p-6 border-orange-700 w-full xl:w-[22vw] 2xl:w-[25vw]  flex flex-col items-center m-auto text-white">
              <p className="text-orange-500 text-center p-2 rounded-full">
                Change Passcode
              </p>
              <form
                onSubmit={handlePasscodeChange}
                className="w-full flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="newPasscode"
                    className="block text-[0.9em]  text-black"
                  >
                    New Passcode
                  </label>
                  <input
                    type="password"
                    id="newPasscode"
                    name="newPasscode"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmNewPasscode"
                    className="block text-[0.9em]  text-black"
                  >
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    id="confirmNewPasscode"
                    name="confirmNewPasscode"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={confirmNewPasscode}
                    onChange={(e) => setConfirmNewPasscode(e.target.value)}
                    required
                  />
                </div>
                {passcodeError && (
                  <p className="text-red-500">{passcodeError}</p>
                )}
                <button
                  type="submit"
                  className="bg-orange-500 text-white p-2 rounded-lg w-full"
                >
                  Change Passcode
                </button>
              </form>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
