"use client";
import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";

import { IoCloseOutline } from "react-icons/io5";

import AOS from "aos";
import "aos/dist/aos.css";

import axios from "axios";
import { useSession } from "next-auth/react"; // Import NextAuth session hook
import Swal from "sweetalert2"; // Import SweetAlert2


const Availableteacher = () => {
  const { data: session, status } = useSession(); // Get session data
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDetailsPopupVisible, setIsDetailsPopupVisible] = useState(false);

  const [profileData, setProfileData] = useState(null); // State for storing profile data
  const [approvedTeachers, setApprovedTeachers] = useState([]); // State for storing approved teachers

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [fees, setFees] = useState("");
  const [date, setDate] = useState("");
  const [timePeriod, setTimePeriod] = useState("AM");
  const [contact, setContact] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null); // Store selected teacher ID
const [selectedTeacherEmail, setSelectedTeacherEmail] = useState("");

  // State for popup form submission
  const [popupErrors, setPopupErrors] = useState({}); // New state for popup form errors
  const [popupSuccess, setPopupSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name,
      subject,
      time,
      fees,
      contact,
      gmail: profileData.gmail || session.user.email,
      grade: profileData.grade || session.user.class,
    };
    try {
      const response = await axios.post(
        "https://learnospherebackend.singhbrothers.ltd/api/route/bookclass",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok === 200) {
        setSuccess("Form Submitted Successfully");
        setName("");
        setSubject("");
        setTime("");
        setFees("");
        setContact("");
      } else {
        setErrors({ general: "Failed to submit the form. Please try again." });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while submitting the form." });
      }
    }
  };
  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  //function to submit form of selected teacher
  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    setPopupErrors({}); // Clear any previous popup errors
    setPopupSuccess(""); // Clear previous success message
  
    const formData = {
      name,
      subject,
      time,
      timePeriod,
      date,
      fees,
      contact,
      gmail: profileData.gmail || session.user.email,
      grade: profileData.grade || session.user.class,
      teacher_id: selectedTeacherId, // Use the selected teacher ID
      email: selectedTeacherEmail,   // Use the selected teacher email
    };
  
    try {
      const response = await axios.post(
        "https://learnospherebackend.singhbrothers.ltd/api/route/bookclassforselectedteacher",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        // Show SweetAlert success message
        Swal.fire({
          title: "Booking Confirmed!",
          text: "Your booking has been successfully confirmed with the teacher. You will receive further instructions shortly via our team.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal2-confirm", // You can customize button styles here
          },
        });
  
        // Reset form fields after showing the success alert
        setPopupSuccess("Popup Form Submitted Successfully"); // Set popup success message
        setPopupErrors({}); // Clear any previous popup errors
        setName(""); // Reset form fields
        setSubject("");
        setTime("");
        setTimePeriod("AM");
        setDate("");
        setFees("");
        setContact("");
        setIsFormVisible(false); 
      } else {
        setPopupErrors({ general: "Failed to submit the popup form. Please try again." });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setPopupErrors(error.response.data.errors); // Set popup errors
      } else {
        setPopupErrors({ general: "An error occurred while submitting the popup form." });
      }
    }
  };
  
  

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  // Fetch student profile data based on the session email
  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.singhbrothers.ltd/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setProfileData(response.data);
          console.log("Profile data for teachers:", response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [session, status]);

  // Fetch approved teachers based on the selected subject
  useEffect(() => {
    const fetchApprovedTeachers = async () => {
      if (selectedSubject) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.singhbrothers.ltd/api/route/showApprovedTeachers",
            { subject: selectedSubject }
          );
          setApprovedTeachers(response.data.data); // Update state with approved teachers
        } catch (error) {
          console.error("Error fetching approved teachers:", error);
        }
      }
    };

    fetchApprovedTeachers();
  }, [selectedSubject]);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setIsDetailsPopupVisible(false); // Close details popup as well
  };

  const handlePlayClick = (video) => {
    setSelectedVideo(video);
    setIsDetailsPopupVisible(true);
  };

  const subjects = [
    { name: "All", image: null },
    { name: "Mathematics" },
    { name: "Science" },
    { name: "History" },
    { name: "English" },
    // Add more subjects as needed
  ];

  // Function to toggle form visibility
  const handleBookNowClick = (teacher) => {
    // Assuming `teacher` is the teacher object that contains id and email
    setSelectedTeacherId(teacher.id); // Set selected teacher ID
    setSelectedTeacherEmail(teacher.email); // Set selected teacher email
    setIsFormVisible(true); // Hide the form
  };

// Close the form when "Cancel Booking" is clicked
const handleCancelBooking = () => {
  setPopupErrors({});
  setIsFormVisible(false); // Hide the form
};

  return (
    <div className="flex flex-col-reverse md:flex-row gap-2">
      <div className="w-full md:w-[60%] border-r h-screen overflow-y-auto p-4">
        <div className="flex justify-center flex-wrap gap-4 mb-4">
          {subjects.map((subject) => (
            <button
              key={subject.name}
              onClick={() => setSelectedSubject(subject.name)}
              className={`p-2 w-28 font-semibold rounded-lg ${
                selectedSubject === subject.name
                  ? "bg-orange-300"
                  : "bg-orange-100"
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
          {approvedTeachers
            .filter(
              (teacher) =>
                selectedSubject === "All" || teacher.subject === selectedSubject
            )
            .map((teacher) => (
              <div
                key={teacher.id}
                className="p-6 rounded-lg bg-gray-50 flex flex-col md:flex-row items-start w-full md:w-[48%] xl:w-[45%] mb-6"
              >
                <div className="flex items-center justify-center w-full md:w-auto">
                  {/* User SVG Icon instead of Image */}
                  <FiUser className="h-24 w-24 rounded-lg text-gray-500" />
                </div>
                <div className="ml-0 md:ml-4 flex-1 mt-4 md:mt-0 w-full">
                  <span className="flex flex-col md:flex-row md:gap-4">
                    <p className="font-bold text-center md:text-left text-[0.8em] md:text-[1em]">
                      {teacher.name}
                    </p>
                  </span>
                  <p className="mt-4 font-semibold text-gray-800 text-[0.7em] md:text-[1em] text-center md:text-left">
                    {teacher.subject}
                  </p>
                  <p className="mt-1 text-gray-700 text-[0.7em] md:text-[1em] text-center md:text-left">
                    Experience: {teacher.yearsOfExperience || 0} Y
                  </p>
                  <p className="mt-1 text-gray-700 text-[0.7em] md:text-[1em] text-center md:text-left">
                    Gender: {teacher.gender}
                  </p>

                  <div className="mt-4 flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() =>
                        handlePlayClick({
                          title: teacher.name,
                          subject: teacher.subject,
                          Experience: teacher.yearsOfExperience,
                          Gender: teacher.gender,
                          profileImage: teacher.profileImage,
                        })
                      }
                      className="w-full md:w-auto p-2 md:p-3 bg-cyan-300 font-semibold rounded-lg text-center"
                    >
                      Details
                    </button>
                    <button className="w-full md:w-auto p-2 md:p-3 bg-green-400 font-semibold rounded-lg text-center"
                     onClick={() => handleBookNowClick(teacher)} 
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {isDetailsPopupVisible && selectedVideo && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              data-aos="slide-down"
              className="relative bg-white p-6 rounded-lg flex w-3/4 max-w-4xl"
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2"
              >
                <IoCloseOutline size={24} />
              </button>
              <div className="flex w-full">
                {/* Profile Section */}
                <div className="w-1/3 pr-4">
                  {/* User SVG Icon instead of Image */}
                  <FiUser className="h-44 w-full text-gray-500" />
                </div>
                {/* Content Section */}
                <div className="w-2/3 pl-4">
                  <h2 className="text-lg font-bold mb-2">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{selectedVideo.subject}</p>
                  <p className="text-gray-700 mb-4">
                    {selectedVideo.Experience || "0"} Y
                  </p>
                  <p className="text-gray-700 mb-4">{selectedVideo.Gender}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isFormVisible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white w-full max-w-lg p-6 rounded-lg relative">
            
       <form
  onSubmit={handlePopupSubmit}
  className="flex flex-col gap-2 border border-gray-300 rounded-lg p-6"
>
  <p className="font-bold text-center text-[1.1em]">Book Your Teacher</p>

  {/* Name Input */}
  <span className="flex flex-col gap-1">
    <label
      htmlFor="name"
      className="block text-gray-700 text-[.9em] font-bold"
    >
      Name<b className="text-orange-600">*</b>
    </label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      name="name"
      id="name"
      placeholder="Enter Your Name"
      className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
    />
    {popupErrors.name && (
      <span className="text-red-500 text-sm mb-4">{popupErrors.name}</span>
    )}
  </span>

  {/* Required Subject Input */}
  <span className="flex flex-col gap-1">
    <label
      htmlFor="subject"
      className="block text-gray-700 text-[.9em] font-bold"
    >
      Required Subject<b className="text-orange-600">*</b>
    </label>
    <input
      type="text"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      name="subject"
      id="subject"
      placeholder="Enter Your Required Subject"
      className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
    />
    {popupErrors.subject && (
      <span className="text-red-500 text-sm mb-4">{popupErrors.subject}</span>
    )}
  </span>

  {/* Preferred Date Input */}
  <span className="flex flex-col gap-1">
    <label
      htmlFor="date"
      className="block text-gray-700 text-[.9em] font-bold"
    >
      Preferred Date<b className="text-orange-600">*</b>
    </label>
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      name="date"
      id="date"
      className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
    />
    {popupErrors.date && (
      <span className="text-red-500 text-sm mb-4">{popupErrors.date}</span>
    )}
  </span>

  {/* Preferred Time Input */}
  <span className="flex flex-col gap-1">
  <label htmlFor="time" className="block text-gray-700 text-[.9em] font-bold">
    Preferred Time<b className="text-orange-600">*</b>
  </label>
  <div className="flex gap-2">
    {/* Time Input */}
    <input
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      name="time"
      id="time"
      className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
    />
    {/* AM/PM Dropdown */}
    <select
      value={timePeriod}
      onChange={(e) => setTimePeriod(e.target.value)}
      name="timePeriod"
      id="timePeriod"
      className="border p-2 border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600"
    >
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </select>
  </div>
  {popupErrors.time && (
    <span className="text-red-500 text-sm mb-4">{popupErrors.time}</span>
  )}
</span>

  {/* Budget/Fees Input */}
  <span className="flex flex-col gap-1">
    <label
      htmlFor="fees"
      className="block text-gray-700 text-[.9em] font-bold"
    >
      Budget/Fees Expectation<b className="text-orange-600">*</b>
    </label>
    <input
      name="fees"
      value={fees}
      onChange={(e) => setFees(e.target.value)}
      id="fees"
      placeholder="Budget/Fees Expectation"
      className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
    />
    {popupErrors.fees && (
      <span className="text-red-500 text-sm mb-4">{popupErrors.fees}</span>
    )}
  </span>

  {/* Contact Information Input */}
  <span className="flex flex-col gap-1">
    <label
      htmlFor="contact"
      className="block text-gray-700 text-[.9em] font-bold"
    >
      Contact Information<b className="text-orange-600">*</b>
    </label>
    <input
      type="text"
      value={contact}
      onChange={handleContact}
      name="contact"
      id="contact"
      placeholder="Contact Information"
      className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
    />
    {popupErrors.contact && (
      <span className="text-red-500 text-sm mb-4">{popupErrors.contact}</span>
    )}
  </span>

  {/* Buttons */}
  <div className="flex gap-2 items-center justify-around">
    <button
      type="submit"
      className="font-bold text-white bg-orange-600 p-3 rounded-md mt-3 text-cneter"
    >
      Confirm Booking
    </button>
    <button
      className="bg-red-500 text-white p-3 rounded-md mt-3 font-bold"
      onClick={handleCancelBooking}
    >
      Cancel Booking
    </button>
  </div>

  {/* Success/Error Messages */}
  {popupErrors.general && (
    <span className="text-red-500 text-sm mb-4">{popupErrors.general}</span>
  )}
  {popupSuccess && (
    <span className="text-green-500 text-sm mb-4">{popupSuccess}</span>
  )}
</form>
      </div>
      </div>
      )}
        <div className="w-full md:w-[40%] p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 border border-gray-300 rounded-lg p-6"
        >
          <p className="font-bold text-center text-[1.1em]">
            Book Your Teacher
          </p>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="block text-gray-700 text-[.9em] font-bold"
            >
              Name<b className="text-orange-600">*</b>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              placeholder="Enter Your Name"
              className=" border  p-2 w-full border-gray-300 bg-white  rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-4">{errors.name}</p>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="subject"
              className="block text-gray-700 text-[.9em] font-bold"
            >
              Required Subject<b className="text-orange-600">*</b>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              name="subject"
              id="subject"
              placeholder="Enter Your Required Subject"
              className=" border  p-2 w-full border-gray-300 bg-white  rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mb-4">{errors.subject}</p>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="time"
              className="block text-gray-700 text-[.9em] font-bold"
            >
              Preferred Time<b className="text-orange-600">*</b>
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              name="time"
              id="session"
              placeholder="Preferred Time"
              className=" border  p-2 w-full border-gray-300 bg-white  rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
            />
            {errors.time && (
              <p className="text-red-500 text-sm mb-4">{errors.time}</p>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="fees"
              className="block text-gray-700 text-[.9em] font-bold"
            >
              Budget/Fees Expectation<b className="text-orange-600">*</b>
            </label>
            <input
              name="fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              id="fees"
              placeholder="Budget/Fees Expectation"
              className=" border  p-2 w-full border-gray-300 bg-white  rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
            />
            {errors.fees && (
              <p className="text-red-500 text-sm mb-4">{errors.fees}</p>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="contact"
              className="block text-gray-700 text-[.9em] font-bold"
            >
              Contact Information<b className="text-orange-600">*</b>
            </label>
            <input
              type="number"
              value={contact}
              onChange={handleContact}
              name="contact"
              id="contact"
              placeholder="Contact Information"
              className=" border  p-2 w-full border-gray-300 bg-white  rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mb-4">{errors.contact}</p>
            )}
          </span>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="font-bold text-white bg-orange-600 p-3 rounded-md w-40 mt-3 text-cneter"
            >
              Submit
            </button>
          </div>
          {errors.general && (
            <p className="text-red-500 text-sm mb-4">{errors.general}</p>
          )}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Availableteacher;
