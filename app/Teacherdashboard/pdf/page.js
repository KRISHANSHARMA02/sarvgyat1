"use client";
import axios from "axios";

import React, { useRef, useState } from "react";
import Pdfdata from "./pdfdata/page";

const Pdf = () => {
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedClass, setSelectedClass] = useState("All");
  const [subjects, setSubjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("selectedClass", selectedClass);
    formData.append("selectedSubject", selectedSubject);
    formData.append("pdf", fileInputRef.current.files[0]);

    try {
      const response = await axios.post(
        "https://learnospherebackend.singhbrothers.ltd/api/route/teacheruploadcontroller",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setSuccess("File Submitted Successfully");
        setTitle("");
        setDescription("");
        setCategory("");
        setSelectedClass("");
        setSelectedSubject("");
        fileInputRef.current.value = "";
        setFileName("");
      } else {
        setErrors({ general: "Failed to Submit Form. Please Try Again" });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while submitting the form" });
      }
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const fileInputRef = useRef(null);

  const handleClassChange = (e) => {
    const classValue = e.target.value;
    setSelectedClass(classValue);
    setSelectedSubject("");
    setSelectedFilter(classValue);

    const subjects = {
      "Class-1": ["Math", "EVS", "English"],
      "Class-2": ["Math", "EVS", "English"],
      "Class-3": ["Math", "EVS", "English"],
      "Class-4": ["Math", "EVS", "English"],
      "Class-5": ["Math", "EVS", "English"],
      "Class-6": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-7": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-8": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-9": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-10": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-11": [
        "Math",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "Accountancy",
        "Bussiness Studies",
        "Economics",
        "Political Science",
      ],
      "Class-12": [
        "Math",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "Accountancy",
        "Bussiness Studies",
        "Economics",
        "Political Science",
      ],
    };
    setSubjects(subjects[classValue] || []);
  };
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        setErrors({ file: "File Size Exceeds 500 KB" });
        setFileName("");
        return;
      }
      setFileName(file.name);
      setErrors({});
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 p-2 md:p-8 rounded-md shadow-lg"
      >
        <h1 className=" text-center font-bold text-[1.1em]">
          Concept File Management
        </h1>
        <div className="flex flex-col gap-3 p-2 md:p-6">
          <div className="flex flex-col md:flex-row justify-around gap-0 md:gap-10">
            <div className="w-full md:w-[50%]">
              <label
                htmlFor="title"
                className="block text-gray-900 text-[.9em]"
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                name="title"
                placeholder="Enter File Title"
                className=" p-2 border border-gray-300 text-[.9em] rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mb-4">{errors.title}</p>
              )}
            </div>
            <div className="w-full md:w-[50%]">
              <label
                htmlFor="description"
                className="block text-gray-900 text-[.9em]"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="Enter File Description"
                className=" p-2 border border-gray-300 text-[.9em] rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around gap-0 md:gap-10">
            <div className="w-full md:w-[50%]">
              <label
                htmlFor="category"
                className="block text-gray-700 text-[.9em]"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm mb-4">{errors.category}</p>
              )}
            </div>
            <div className="w-full md:w-[50%]">
              <label htmlFor="pdf" className="block text-gray-700 text-[.9em]">
                Upload File
              </label>
              <input
                type="text"
                onClick={handleClick}
                readOnly
                value={fileName}
                placeholder="Upload Your File"
                onChange={(e) => setFileName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full cursor-pointer placeholder:text-[.9em] focus:outline-none focus:border-blue-500 "
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx"
              />
              {errors.file && (
                <p className="text-red-500 text-sm mb-4">{errors.file}</p>
              )}
              {errors.pdf && (
                <p className="text-red-500 text-sm mb-4">{errors.pdf}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around gap-0 md:gap-10">
            <div className="w-full md:w-[50%]">
              <label
                htmlFor="classes"
                className="block text-gray-700 text-[.9em]"
              >
                Class
              </label>
              <select
                id="classes"
                name="classes"
                value={selectedClass}
                onChange={handleClassChange}
                className="border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none  focus:border-blue-500"
              >
                <option value="">Select Your Class</option>
                <option value="Class-1">Class-1</option>
                <option value="Class-2">Class-2</option>
                <option value="Class-3">Class-3</option>
                <option value="Class-4">Class-4</option>
                <option value="Class-5">Class-5</option>
                <option value="Class-6">Class-6</option>
                <option value="Class-7">Class-7</option>
                <option value="Class-8">Class-8</option>
                <option value="Class-9">Class-9</option>
                <option value="Class-10">Class-10</option>
                <option value="Class-11">Class-11</option>
                <option value="Class-12">Class-12</option>
              </select>
              {errors.selectedClass && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.selectedClass}
                </p>
              )}
            </div>
            <div className="w-full md:w-[50%]">
              {selectedClass && subjects.length > 0 && (
                <div className="">
                  <label
                    htmlFor="selectedSubject"
                    className="block text-gray-700 text-[.9em]"
                  >
                    Subjects
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    className="border p-2 border-gray-300  placeholder:text-[.9em] w-full rounded-md focus:outline-none  focus:border-blue-500"
                  >
                    <option value="">Selected Subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.selectedSubject && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.selectedSubject}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-600 p-2 font-bold rounded-md mt-8 mb-4 md:mb-0 text-white"
            >
              {loading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </div>
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
        {errors.general && (
          <p className="text-red-500 text-sm mt-4">{errors.general}</p>
        )}
      </form>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="loader"></div>{" "}
          {/* Customize loader style as needed */}
        </div>
      )}
      <Pdfdata />
    </div>
  );
};

export default Pdf;
