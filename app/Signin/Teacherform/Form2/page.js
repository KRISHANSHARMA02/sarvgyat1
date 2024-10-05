"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FormContext } from '@/src/context/FormContext'; 

const Form2 = ({ onContinue, onBack }) => {
  const { state: formData, dispatch } = useContext(FormContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (formData?.profileImage) {
      setFilePreview(formData.profileImage);
    }
  }, [formData]);

  useEffect(() => {
    return () => {
      if (filePreview && filePreview.startsWith("blob:")) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setFilePreview(fileUrl);
      // Dispatch the file URL to the context
      dispatch({ type: "UPDATE_PROFILE_IMAGE", payload: fileUrl });
    }
  };

  const handleContinue = () => {
    onContinue();
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-6 md:p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-start text-gray-800">Upload Profile Image</h1>
        <p className="text-gray-600 mb-8 text-start">Choose a photo that will help learners get to know you.</p>
        <form>
          <div className="relative mb-8">
            <input
              type="file"
              name="profileImage"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="file-upload"
              className="block w-full text-sm text-gray-700 bg-blue-50 border border-blue-300 py-2 px-4 rounded-full text-center cursor-pointer hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              {selectedFile ? "Upload New Image" : "Upload Image"}
            </label>
          </div>
          {filePreview && (
            <div className="mb-8">
              <Image
                src={filePreview}
                alt="Profile Preview"
                className="h-32 w-32 object-cover rounded-full mx-auto shadow-md"
                width={128}
                height={128}
              />
            </div>
          )}
          <div className="text-start mb-8">
            <h2 className="font-bold mb-4 text-gray-800">What your photo needs</h2>
            <ul className="text-gray-600">
              {[
                "You should be facing forward",
                "Frame your head and shoulders",
                "You should be centered and upright",
                "Your face and eyes should be visible (except for religious reasons)",
                "You should be the only person in the photo",
                "Use a color photo with high resolution and no filters",
                "Avoid logos or contact information",
              ].map((text, index) => (
                <li key={index} className="flex items-start mb-2">
                  <svg
                    className="h-6 w-6 text-green-600 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded"
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form2;
