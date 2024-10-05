"use client";
import React, { useEffect, useState, useRef } from "react";

import Videodata from "./videodata/page";
import Loader from "@/components/Loader";
import Overlay from "@/components/Overlay";
import Swal from "sweetalert2";
import axios from "axios";
import { useSession } from "next-auth/react";

const Video = () => {
  const [selectedClass, setSelectedClass] = useState("All");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const videoInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const { data: session, status } = useSession();
  const [teacherData, setTeacherData] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    selectedClass: "",
    subject: "",
  });

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.singhbrothers.ltd/api/route/getTeacherByEmail",
            { gmail: session.user.email }
          );
          const teacherProfile = response.data.data; // Access the data object

          // Save the teacher data including the mobilenumber
          setTeacherData(teacherProfile);

          console.log("Teacher profile data:", teacherProfile);
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session, status]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid video file");
    }
  };

  const handleVideoUnload = () => {
    setVideoFile(null);
    setVideoPreview(null);
    URL.revokeObjectURL(videoPreview); // Clear memory
  };

  const handleClassChange = (e) => {
    const classValue = e.target.value;
    setSelectedClass(classValue);
    setSelectedSubject("");

    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedClass: classValue,
    }));

    // Set filter based on selected class
    setSelectedFilter(classValue);

    const classSubjects = {
      "Class-1": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-2": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-3": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-4": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-5": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-6": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-7": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-8": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-9": [
        "Maths",
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
      "Class-10": [
        "Maths",
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
      "Class-11": [
        "Maths",
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
        "Maths",
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
      // Add more subjects for other classes as needed
    };
    setSubjects(classSubjects[classValue] || []);
  };

  const handleSubjectChange = (e) => {
    const subjectValue = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      subject: subjectValue,
    }));

    setSelectedSubject(subjectValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});
    setErrorMessage("");
    setSuccessMessage("");

    if (!videoFile) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        video: "Please upload a video file.",
      }));
      return;
    }

    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("selectedClass", formData.selectedClass);
      form.append("subject", formData.subject);
      form.append("video", videoFile);

      form.append("teacherEmail", teacherData.email);
      form.append("Mobilenumber", teacherData.mobilenumber);
      form.append("teacherName", teacherData.name);

      // Logging the form data for debugging
      form.forEach((value, key) => {
        if (value instanceof File) {
          console.log(
            `${key}: ${value.name} (${value.type}, ${value.size} bytes)`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      });

      const response = await axios.post(
        "https://learnospherebackend.singhbrothers.ltd/api/route/teachervideoupload",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Handle success response
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Clear form and reset all states after user clicks 'OK'
          setFormData({
            title: "",
            description: "",
            category: "",
            selectedClass: "",
            subject: "",
          });
          setSuccessMessage(response.data.message);
          setVideoFile(null); // Clear video file
          setVideoPreview(null); // Clear preview
          setSelectedClass("All"); // Reset class to default
          setSelectedSubject(""); // Reset subject
          setSubjects([]); // Reset subjects list
          if (videoInputRef.current) videoInputRef.current.value = "";
        });
      } else {
        // If response is not successful, show a general error message
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form: ", error); // Log error for debugging

      if (error.response && error.response.data.errors) {
        setFormErrors(error.response.data.errors); // Set field-specific errors
      } else {
        setErrorMessage("Something went wrong. Please try again."); // General error
      }
    } finally {
      setIsLoading(false); // Ensure loading state is cleared
    }
  };

  return (
    <div className="w-full">
      {isLoading && <Overlay />}
      {isLoading && <Loader />}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-4 p-2 md:p-12 shadow-lg border border-gray-300 rounded-lg"
      >
        <h1 className="font-bold text-center text-[1.2em]">
          Concept Video Management
        </h1>
        <div className="flex flex-col md:flex-row w-full gap-8 mt-4">
          <span className="w-full md:w-[50%]">
            <label htmlFor="title" className="block text-gray-700 text-[.9em]">
              Title*
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter Video Title"
              className="border p-1 border-gray-300 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500"
            />
            {formErrors.title && (
              <p className="text-red-500">{formErrors.title}</p>
            )}
          </span>
          <span className="w-full md:w-[50%]">
            <label
              htmlFor="description"
              className="block text-gray-700 text-[.9em]"
            >
              Description*
            </label>
            <input
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter Video Description"
              className="p-1 border border-gray-300 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500"
            />
            {formErrors.description && (
              <p className="text-red-500">{formErrors.description}</p>
            )}
          </span>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-8">
          <span className="w-full md:w-[50%]">
            <label
              htmlFor="category"
              className="block text-gray-700 text-[.9em]"
            >
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="border border-gray-300 p-1 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
            {formErrors.category && (
              <p className="text-red-500">{formErrors.category}</p>
            )}
          </span>
          <span className="w-full md:w-[50%]">
            <label htmlFor="class" className="block text-gray-700 text-[.9em]">
              Class*
            </label>
            <select
              id="class"
              name="class"
              value={selectedClass}
              onChange={handleClassChange}
              className="border border-gray-300 p-1 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Class</option>
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
            {formErrors.selectedClass && (
              <p className="text-red-500">{formErrors.selectedClass}</p>
            )}
          </span>
        </div>
        <div></div>
        {selectedClass && subjects.length > 0 && (
          <div className="w-full md:w-[49%]">
            <label
              htmlFor="subject"
              className="block text-gray-700 text-[.9em]"
            >
              Subject*
            </label>
            <select
              id="subject"
              name="subject"
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="border p-1 border-gray-300 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {formErrors.subject && (
              <p className="text-red-500">{formErrors.subject}</p>
            )}
          </div>
        )}
        <span className="w-auto md:w-[50%] p-2">
          <label
            htmlFor="video-upload"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload Video:*
          </label>
          <input
            id="video-upload"
            type="file"
            name="video"
            ref={videoInputRef}
            accept="video/*"
            onChange={handleVideoUpload}
            className="rounded-lg p-1 w-full bg-orange-500 font-bold text-white px-0 md:px-4 py-0 md:py-2 focus:outline-none focus:border-blue-500"
          />
          {formErrors.video && (
            <p className="text-red-500">{formErrors.video}</p>
          )}
        </span>
        {videoPreview && (
          <div className="video-preview mt-4">
            <video width="320" height="240" controls>
              <source src={videoPreview} type={videoFile?.type} />
              Your browser does not support the video tag.
            </video>
            <div className="mt-2">
              <button
                onClick={handleVideoUnload}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Unload Video
              </button>
            </div>
          </div>
        )}
        <div className="flex w-full justify-center">
          <button className="bg-orange-600 rounded-lg text-center p-3 text-white font-bold">
            Upload Video
          </button>
        </div>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
      <Videodata />
    </div>
  );
};

export default Video;
