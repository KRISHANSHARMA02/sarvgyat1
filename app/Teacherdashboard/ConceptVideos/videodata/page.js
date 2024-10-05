"use client";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const Videodata = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [videos, setVideos] = useState([]);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://learnospherebackend.singhbrothers.ltd/api/route/getTeacherVideos?selectedClass=${selectedFilter}`
        );
        const data = await response.json();
        console.log("API Response:", data);
        setVideos(data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [selectedFilter]);

  const handleDelete = async (videoId, classNumber) => {
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this video permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      const response = await fetch(
        `https://learnospherebackend.singhbrothers.ltd/api/route/deleteTeacherVideo/${videoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classNumber }),
        }
      );

      if (response.ok) {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== videoId)
        );

        Swal.fire({
          title: "Deleted!",
          text: "The video has been successfully deleted.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to delete the video.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Failed to delete video:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the video.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <div>
        <div className="flex gap-3 px-2 py-2 mt-4 mb-4 overflow-scroll">
          {/* Class Filter Buttons */}
          {[
            "All",
            "Class-1",
            "Class-2",
            "Class-3",
            "Class-4",
            "Class-5",
            "Class-6",
            "Class-7",
            "Class-8",
            "Class-9",
            "Class-10",
            "Class-11",
            "Class-12",
          ].map((className) => (
            <button
              key={className}
              onClick={() => setSelectedFilter(className)}
              className={`p-2 w-24 flex-shrink-0 rounded-full font-semibold ${
                selectedFilter === className
                  ? "bg-orange-500 text-white font-bold"
                  : "bg-white text-black border font-bold border-gray-300"
              }`}
            >
              {className}
            </button>
          ))}
        </div>
        <div className="video-list flex flex-col gap-4">
          {videos.length > 0 &&
            videos.map((video) => (
              <div
                key={video.id}
                className="relative bg-white shadow-2xl p-4 rounded-md flex flex-col sm:flex-row gap-6"
              >
                {/* Video Preview Section */}
                <div
                  onMouseEnter={() => setHoveredVideoId(video.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  className="relative w-full sm:w-1/3 flex-shrink-0"
                >
                  {hoveredVideoId === video.id ? (
                    <video
                      src={video.video_url}
                      width="100%"
                      height="auto"
                      autoPlay
                      muted
                      loop
                      className="rounded-md"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
                      <p className="text-gray-900 font-semibold text-center">
                        Learn
                        <span className="font-bold text-orange-600">O</span>
                        sphere.in
                      </p>
                    </div>
                  )}
                </div>

                {/* Video Info Section */}
                <div className="flex flex-col gap-1 mt-0 w-full relative">
                  <p className="font-bold text-lg">{video.title}</p>
                  <p className="font-semibold">{video.description}</p>
                  <p className="text-gray-500">Medium - {video.category}</p>
                  <p className="text-gray-500">Subject - {video.subject}</p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setShowPlayer(true)}
                      className="bg-orange-500 hover:bg-orange-600 transition-colors duration-300 rounded-md py-2 px-4 text-white font-bold w-full sm:w-auto flex justify-center items-center"
                    >
                      Watch Video
                    </button>
                  </div>

                  {/* Delete button in the top-right corner */}
                  <button
                    onClick={() => handleDelete(video.id, video.class)}
                    className="absolute top-0 right-0 md:top-2 md:right-2 rounded-full p-2 text-black"
                  >
                    <RxCross2 size={20} />
                  </button>

                  {/* Uploaded by in the bottom-right corner */}
                  <p className="md:absolute md:bottom-2 right-2 text-gray-500 text-sm">
                    Uploaded by - {video.teacher_email}
                  </p>
                </div>

                {/* Video Player Modal */}
                {showPlayer && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="relative w-full max-w-3xl p-4 bg-white rounded-md">
                      <button
                        onClick={() => setShowPlayer(false)}
                        className="absolute top-2 right-2 text-black"
                      >
                        <RxCross2 size={25} />
                      </button>
                      <video
                        src={video.video_url}
                        controls
                        width="100%"
                        height="auto"
                        className="rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Videodata;
