"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import picture from "@/public/profile.png";
import { IoCloseOutline } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MdVerified } from "react-icons/md";

const Profileteacher = () => {
  const [isNewStudentPopupVisible, setIsNewStudentPopupVisible] =
    useState(false);
  const [isTotalStudentPopupVisible, setIsTotalStudentPopupVisible] =
    useState(false);
  // const [currentPasscode, setCurrentPasscode] = useState("");
  // const [showChangePasscodeForm, setShowChangePasscodeForm] = useState(false);
  // const [newPasscode, setNewPasscode] = useState("");
  // const [confirmNewPasscode, setConfirmNewPasscode] = useState("");
  // const [passcodeError, setPasscodeError] = useState("");

  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.singhbrothers.ltd/api/route/getTeacherByEmail",
            { gmail: session.user.email } // make sure you are sending the email correctly
          );

          setProfileData(response.data.data); // set profile data from response
          console.log("Teacher profile data:", response.data);
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session, status]);

  // const handlePasscodeChange = (event) => {
  //   event.preventDefault();

  //   if (newPasscode !== confirmNewPasscode) {
  //     setPasscodeError("New passcodes do not match.");
  //     return;
  //   }

  //   if (newPasscode.length < 6) {
  //     setPasscodeError("New passcode must be at least 6 characters long.");
  //     return;
  //   }

  //   setPasscodeError("");
  //   alert("Passcode changed successfully!");
  //   setCurrentPasscode("");
  //   setNewPasscode("");
  //   setConfirmNewPasscode("");
  //   setShowChangePasscodeForm(false); // Hide form after successful change
  // };

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const newStudentClick = () => {
    setIsNewStudentPopupVisible(true);
  };

  const totalStudentClick = () => {
    setIsTotalStudentPopupVisible(true);
  };

  const newStudentClosePopup = () => {
    setIsNewStudentPopupVisible(false);
  };

  const totalStudentClosePopup = () => {
    setIsTotalStudentPopupVisible(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0]; // Extract only the date part
  };

  return (
    <div>
      <div className="p-4 mx-2 md:mx-8 border-b-2 border-orange-800 w-60 font-bold text-[1.2em] bg-orange-500 rounded-full text-white">
        <p>Personal Information</p>
      </div>
      <div className=" flex flex-col md:flex-row gap-10 p-2 md:p-8">
        <div className=" w-full 2xl:w-[40%] p-12 border h-auto xl:h-[75vh] 2xl:h-[50vh] brder-gray-300 mt-4 md:mt-0  rounded-lg flex flex-col items-center justify-center ">
          <div className="flex flex-col p-4 mx-4 xl:mx-2 2xl:mx-6 justify-start">
            <div className="relative">
              {/* Dynamic border based on approval status */}
              <div
                className={`rounded-full border-8 ${
                  profileData?.is_approved ? "border-green-500" : "border-red-500"
                }`}
              >
                <Image
                  className="h-40 xl:h-40 2xl:h-48 w-40 xl:w-40  2xl:w-48 rounded-full"
                  src={picture}
                  height={200}
                  width={200}
                  alt="Profile"
                />
              </div>

              {/* Status Badge */}
              <span
                className={`absolute top-0 right-5 bg-white px-2 py-1 rounded-full text-xs font-semibold ${
                  profileData?.is_approved ? "text-green-600" : "text-red-600"
                }`}
              >
                { profileData?.is_approved ? <MdVerified size={25}/> : "Pending.."}
              </span>
            </div>
           
          </div>
          <div className="p-3 mx-2 xl:mx-2 2xl:mx-8 flex flex-col gap-1">
              <p className="font-bold text-black text-[1.4em]">  {profileData?.name || "Teacher Name"}</p>
              <p className="font-semibold mx-4 text-orange-600 text-[.9em]">
                Edit Profile
              </p>
            </div>
        </div>
        <div className="w-full md:w-[60%] flex flex-col gap-6 mt-6">
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <span>
              <p className="text-[.8em] px-1">Name*</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="fullname"
                type="text"
                disabled
                name="fullname"
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                value={profileData?.name || ""}
                placeholder="fullname"
              />
            </span>
            <span>
              <p className="text-[.8em] px-1">Phone Number</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="Contact"
                disabled
                name="Contact"
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    mobilenumber: e.target.value,
                  })
                }
                value={profileData?.mobilenumber || ""}
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
                disabled
                id="email"
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                value={profileData?.email || ""}
                placeholder="E-mail"
              />
            </span>
            <span className="px-0 md:px-6">
              <p className="text-[.8em] px-1">DOB</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                type="date"
                id="dob"
                name="dob"
                disabled
                onChange={(e) =>
                  setProfileData({ ...profileData, dob: e.target.value })
                }
                min="1900-01-01"
                value={profileData?.dob ? formatDate(profileData.dob) : ""}
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
                disabled
                onChange={(e) =>
                  setProfileData({ ...profileData, gender: e.target.value })
                }
                value={profileData?.gender || ""}
                className="mt-1 block  w-full xl:w-[22vw] 2xl:w-[25vw] p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              >
                <option className="text-bold" value="">
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                onChange={(e) =>
                  setProfileData({ ...profileData, city: e.target.value })
                }
                value={profileData?.city || ""}
                className="mt-1 block w-full xl:w-[22vw] 2xl:w-[25vw] p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              >
                <option className="text-bold" value="">
                  Select City
                </option>
                <option value="Jaipur">Jaipur</option>
                {/* Other cities */}
              </select>
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <span>
              <p className="text-[.8em] px-1">Subject</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="subject"
                required
                name="subject"
                onChange={(e) =>
                  setProfileData({ ...profileData, subject: e.target.value })
                }
                value={profileData?.subject || ""}
                placeholder="Subject"
              />
            </span>
            <span>
              <p className="text-[.8em] px-1">Experience</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="Experience"
                disabled
                name="Experience"
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    yearsOfExperience: e.target.value,
                  })
                }
                value={profileData?.yearsOfExperience || "0"}
                placeholder="Your Experience"
              />
            </span>
          </div>
          <div className="mt-16">
            {/* {!showChangePasscodeForm && (
              <div className="mt-2 w-full xl:w-[22vw] 2xl:w-[25vw] shadow-2xl rounded-tr-lg tounded-lr-lg gap-2 border-b-2 p-6 border-orange-600 flex flex-col m-auto items-center text-white">
                <p className="text-orange-500 text-center p-2 rounded-full">
                  Current Psscode
                </p>
                <input
                  type="password"
                  className="text-black border border-gray-300 p-2"
                  id="currentPasscord"
                  name="currentPasscord"
                  value={currentPasscode}
                  onChange={(e) => setCurrentPasscode(e.target.value)}
                  placeholder="Enter Your Current Passcode"
                />
                <button
                  onClick={() => setShowChangePasscodeForm(true)}
                  className="mt-4 bg-orange-500 text-white p-2 rounded-lg w-full"
                >
                  Change Passcode
                </button>
              </div>
            )} */}
            {/* {showChangePasscodeForm && (
              <div className="mt-2  shadow-2xl rounded-tr-lg gap-2 rounded-tl-lg border-b-2 p-6 border-sky-700 w-full xl:w-[22vw] 2xl:w-[25vw]  flex flex-col items-center m-auto text-white">
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
                      className="w-full p-2 border text-black border-gray-300 rounded-md"
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
                      className="w-full p-2 border text-black border-gray-300 rounded-md"
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

      {isNewStudentPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            data-aos="slide-down"
            className="relative bg-white p-6 rounded-lg w-64"
          >
            <button
              onClick={newStudentClosePopup}
              className="absolute top-2 right-2"
            >
              <IoCloseOutline size={24} />
            </button>
            <h2>New Students</h2>
            <div className="flex justify-around">
              <p>Sr.No</p> {/* Example count of total students */}
              <p>Name</p>
              <p>Address</p>
            </div>
          </div>
        </div>
      )}

      {isTotalStudentPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            data-aos="slide-down"
            className="relative bg-white p-6 rounded-lg w-64"
          >
            <button
              onClick={totalStudentClosePopup}
              className="absolute top-2 right-2"
            >
              <IoCloseOutline size={24} />
            </button>
            <h2>Total Students</h2>
            <div className="flex justify-around">
              <p>Sr.No</p> {/* Example count of total students */}
              <p>Name</p>
              <p>Address</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profileteacher;
