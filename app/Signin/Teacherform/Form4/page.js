"use client";
import React, { useContext } from "react";
import { FormContext } from "@/src/context/FormContext";

const Form4 = ({ onContinue, onBack }) => {
  const { state, dispatch } = useContext(FormContext);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newCertifications = [...state.certifications];
    newCertifications[index][name] = value;
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { certifications: newCertifications },
    });
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    const newCertifications = [...state.certifications];
    newCertifications[index].file = file;
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { certifications: newCertifications },
    });
  };

  const handleAddCertification = () => {
    const newCertifications = [
      ...state.certifications,
      {
        certificatesubject: "",
        details: "",
        issuedBy: "",
        year: "",
        certificate: null,
      },
    ];
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { certifications: newCertifications },
    });
  };


  return (
    <div className="max-w-md mx-auto bg-white p-6 md:p-8 shadow-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 text-start">
          Teacher Certification
        </h1>
        <button
          type="button"
          onClick={onContinue} // Trigger the same function as Save and Continue
          className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded font-Poppins"
        >
          Skip
        </button>
      </div>
      <p className="my-4 mb-8 text-start">
        Do you have teaching certificates? If so, describe them to enhance your
        profile credibility and get more students.
      </p>
      {state.certifications.map((cert, index) => (
        <div key={index} className="mb-4">
          <div className="relative mb-5">
            <select
              id={`certificatesubject-${index}`}
              name="certificatesubject"
              value={cert.certificatesubject}
              onChange={(event) => handleInputChange(index, event)}
              className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
              style={{
                outline: "none",
                borderBottomWidth: "2px",
                borderBottomColor: "#3182ce",
              }}
            >
              <option value="">Select Subject</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
            <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
              Choose subject
            </label>
          </div>
          <div className="relative mb-5">
            <input
              type="text"
              id={`details-${index}`}
              name="details"
              value={cert.details}
              onChange={(event) => handleInputChange(index, event)}
              className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
              placeholder=" "
              style={{
                outline: "none",
                borderBottomWidth: "2px",
                borderBottomColor: "#3182ce",
              }}
            />
            <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
              Certificate Details
            </label>
          </div>
          <div className="relative mb-5">
            <input
              type="text"
              id={`issuedBy-${index}`}
              name="issuedBy"
              value={cert.issuedBy}
              onChange={(event) => handleInputChange(index, event)}
              className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
              placeholder=" "
              style={{
                outline: "none",
                borderBottomWidth: "2px",
                borderBottomColor: "#3182ce",
              }}
            />
            <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
              Issued By
            </label>
          </div>
          <div className="relative mb-5">
            <select
              id={`year-${index}`}
              name="year"
              value={cert.year}
              onChange={(event) => handleInputChange(index, event)}
              className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
              style={{
                outline: "none",
                borderBottomWidth: "2px",
                borderBottomColor: "#3182ce",
              }}
            >
              <option value="" disabled>
                Select Year
              </option>
              {Array.from({ length: 50 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
            <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
              Year of Certification
            </label>
          </div>
          {/* <div className="relative mb-5">
            <input
              type="file"
              id={`file-${index}`}
              name="certificate"
              // accept="application/pdf"
              onChange={(event) => handleFileChange(index, event)}
              className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
              style={{
                outline: "none",
                borderBottomWidth: "2px",
                borderBottomColor: "#3182ce",
              }}
            />
            <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
              Upload Certificate
            </label>
          </div> */}
        </div>
      ))}
      <div>
        if you have any extra certification then
        <button
          type="button"
          onClick={handleAddCertification}
          className="mb-4 w-full border-none underline text-blue-600 decoration-2 text-start font-bold"
        >
          Click for add Certification
        </button>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default Form4;
