"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import profilePic from "@/public/profile.png";

const StudentPanel = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      photo: profilePic,
      name: "Rohit",
      subject: "Mathematics",
      status: "active",
      button: "details",
      age: 16,
      grade: "10th",
      email: "rohit@example.com",
    },
    {
      photo: profilePic,
      name: "Mohit",
      subject: "Mathematics",
      status: "active",
      button: "details",
      age: 17,
      grade: "11th",
      email: "mohit@example.com",
    },
    {
      photo: profilePic,
      name: "Honey",
      subject: "Mathematics",
      status: "non-active",
      button: "details",
      age: 17,
      grade: "11th",
      email: "honey@example.com",
    },
    {
      photo: profilePic,
      name: "Krishan",
      subject: "Mathematics",
      status: "pending",
      button: "details",
      age: 17,
      grade: "11th",
      email: "krishan@example.com",
    },
    {
      photo: profilePic,
      name: "Vikas",
      subject: "Mathematics",
      status: "pending",
      button: "details",
      age: 17,
      grade: "11th",
      email: "vikas@example.com",
    },
    {
      photo: profilePic,
      name: "Akash",
      subject: "Mathematics",
      status: "non-active",
      button: "details",
      age: 17,
      grade: "11th",
      email: "akash@example.com",
    },
  ];

  const filteredStudents =
    selectedFilter === "All"
      ? students.filter((student) => student.status !== "pending")
      : selectedFilter === "Active Students"
      ? students.filter((student) => student.status === "active")
      : selectedFilter === "Non-Active Students"
      ? students.filter((student) => student.status === "non-active")
      : selectedFilter === "Pending Students"
      ? students.filter((student) => student.status === "pending")
      : [];

  const handleAction = (index, action) => {
    console.log(`Student at index ${index} ${action}`);
  };

  const studentsdetailsClick = (student) => {
    setSelectedStudent(student);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedStudent(null);
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className=" w-full flex mb-4  gap-3 mx-2">
        <button
          onClick={() => setSelectedFilter("All")}
          className={`p-2 font-semibold  rounded-lg ${
            selectedFilter === "All" ? "bg-orange-300" : "bg-orange-100"
          } `}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFilter("Active Students")}
          className={`p-2 rounded-lg font-semibold ${
            selectedFilter === "Active Students"
              ? "bg-orange-300"
              : "bg-orange-100"
          } `}
        >
          Active Students
        </button>
        <button
          onClick={() => setSelectedFilter("Non-Active Students")}
          className={`p-2 font-semibold rounded-lg ${
            selectedFilter === "Non-Active Students"
              ? "bg-orange-300"
              : "bg-orange-100"
          }`}
        >
          Non-Active Students
        </button>
        <button
          onClick={() => setSelectedFilter("Pending Students")}
          className={`p-2 font-semibold rounded-lg ${
            selectedFilter === "Pending Students"
              ? "bg-orange-300"
              : "bg-orange-100"
          }`}
        >
          Pending Students
        </button>
      </div>

      {/* Student Cards */}
      <div className="flex flex-wrap  gap-6">
        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="p-8 relative rounded-lg mb-2 w-[40vw] md:w-[20vw] flex shadow-md flex-col bg-white border border-gray-300 items-center gap-4"
          >
            <Image
              src={student.photo}
              alt={`${student.name}'s photo`}
              width={120}
              height={120}
              className=""
            />
            <div>
              <p className="font-bold text-[1.2em]">{student.name}</p>
              <p>{student.subject}</p>
            </div>
            {student.status === "pending" && (
              <div className="flex flex-col md:flex-row gap-2 mt-2">
                <button
                  onClick={() => handleAction(index, "accepted")}
                  className="bg-green-500 text-white p-2 rounded-lg flex items-center gap-1"
                >
                  <FaCheck />
                  Accept
                </button>
                <button
                  onClick={() => handleAction(index, "rejected")}
                  className="bg-red-600 text-white p-2 rounded-lg flex items-center gap-1"
                >
                  <FaTimes />
                  Reject
                </button>
              </div>
            )}
            <button
              onClick={() => studentsdetailsClick(student)}
              className="text-orange-600 absolute bottom-1 right-2 font-semibold text-[1.1em]"
            >
              {student.button}
            </button>
          </div>
        ))}
      </div>

      {/* Popup with Student Details */}
      {isPopupVisible && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex  justify-center items-center">
          <div className="bg-white p-8 rounded-lg  w-full md:w-[50vw] flex flex-col md:flex-row gap-12">
            <div>
              <Image
                src={selectedStudent.photo}
                alt={`${selectedStudent.name}'s photo`}
                width={120}
                height={120}
              />
              <h2 className="text-2xl font-bold mb-4">
                {selectedStudent.name}
              </h2>
            </div>
            <div className=" flex  flex-col">
              <div className="flex gap-10 flex-wrap">
                <p className="mt-2  flex flex-col text-[1.2em]">
                  <strong className="font-bold text-[1.2em]">Subject:</strong>{" "}
                  {selectedStudent.subject}
                </p>
                <p className="mt-2 flex flex-col text-[1.2em]">
                  <strong className="font-bold text-[1.2em]">Age:</strong>{" "}
                  {selectedStudent.age}
                </p>

                <p className="mt-2 flex flex-col text-[1.2em]">
                  <strong className="font-bold text-[1.2em]">Email:</strong>{" "}
                  {selectedStudent.email}
                </p>
                <p className="mt-2 flex flex-col text-[1.2em]">
                  <strong className="font-bold text-[1.2em]">Status:</strong>{" "}
                  {selectedStudent.status}
                </p>
              </div>
              <div>
                <button
                  onClick={closePopup}
                  className="mt-4 bg-orange-500 text-white p-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPanel;
