"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const Pdfdata = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url =
          "https://learnospherebackend.singhbrothers.ltd/api/route/getteacherdatacontroller";

        if (selectedFilter !== "All") {
          url += `?class=${selectedFilter}`;
        }

        const response = await axios.get(url);
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedFilter]);
  const handleDelete = async (id, selectedClass) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `https://learnospherebackend.singhbrothers.ltd/api/route/deleteTeacherData/${id}/${selectedClass}`
        );
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
        console.log("Record Deleted Successfully");
        alert("Record deleted successfully!");
      } catch (error) {
        console.error("Error Deleting File:", error);
        alert("Error deleting the file.");
      }
    } else {
      console.log("Delete action cancelled");
    }
  };

  const handleView = (teacherpdfUrl) => {
    window.open(teacherpdfUrl, "_blank"); // Open the PDF in a new tab
  };

  return (
    <div>
      <div>
        <div className="flex gap-3 px-2 mt-4 mb-4  overflow-x-auto scrollbar-hide ">
          <button
            onClick={() => setSelectedFilter("All")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "All"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter("Class-1")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-1"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-1
          </button>
          <button
            onClick={() => setSelectedFilter("Class-2")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-2"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-2
          </button>
          <button
            onClick={() => setSelectedFilter("Class-3")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-3"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-3
          </button>
          <button
            onClick={() => setSelectedFilter("Class-4")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-4"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-4
          </button>
          <button
            onClick={() => setSelectedFilter("Class-5")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-5"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-5
          </button>
          <button
            onClick={() => setSelectedFilter("Class-6")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-6"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-6
          </button>
          <button
            onClick={() => setSelectedFilter("Class-7")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-7"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-7
          </button>
          <button
            onClick={() => setSelectedFilter("Class-8")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-8"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-8
          </button>
          <button
            onClick={() => setSelectedFilter("Class-9")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-9"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-9
          </button>
          <button
            onClick={() => setSelectedFilter("Class-10")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-10"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-10
          </button>
          <button
            onClick={() => setSelectedFilter("Class-11")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-11"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-11
          </button>
          <button
            onClick={() => setSelectedFilter("Class-12")}
            className={`p-2 w-24 fonr-bold flex-shrink-0 rounded-full ${
              selectedFilter === "Class-12"
                ? "bg-orange-600 text-white font-bold"
                : "bg-white text-black border font-bold border-gray-300"
            }`}
          >
            Class-12
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-orange-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Pdf</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={index}
                className="bg-orange-100 border-b border-orange-300"
              >
                <td className="px-4 py-2 font-bold">{file.title}</td>
                <td className="px-4 py-2 font-semibold">{file.description}</td>
                <td className="px-4 py-2 font-semibold">{file.category}</td>
                <td className="px-4 py-2 font-semibold">
                  {file.selectedClass}
                </td>
                <td className="px-4 py-2 font-semibold">
                  {file.selectedSubject}
                </td>
                <td className="px-4 py-2 font-semibold">{file.pdf}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-orange-500 rounded-md p-2 text-white font-bold"
                    onClick={() => handleView(file.teacherpdfUrl)}
                  >
                    View File
                  </button>
                  <button
                    onClick={() => handleDelete(file.id, file.selectedClass)}
                  >
                    <RxCross2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pdfdata;
