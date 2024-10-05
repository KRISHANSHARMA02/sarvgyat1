"use client";
import React, { useContext, useEffect , useRef } from "react";
import { FormContext } from "@/src/context/FormContext";

const Form3 = ({ onContinue, onBack }) => {
  const { state, dispatch } = useContext(FormContext);
  const educations = state.educations || [
    {
      university: "",
      degree: "",
      degreeType: "",
      startYear: "",
      endYear: "",
      degreecertificate: "",
    },
  ];

  useEffect(() => {
    if (!state.educations) {
      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: {
          educations: [
            {
              university: "",
              degree: "",
              degreeType: "",
              startYear: "",
              endYear: "",
              degreecertificate: "",
            },
          ],
        },
      });
    }
  }, [dispatch, state.educations]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newEducations = [...educations];
    newEducations[index][name] = value;
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { educations: newEducations },
    });
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const newEducations = [...educations];
    newEducations[index].degreecertificate = file;
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { educations: newEducations },
    });
  };

  const handleAddEducation = () => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: {
        educations: [
          ...educations,
          {
            university: "",
            degree: "",
            degreeType: "",
            startYear: "",
            endYear: "",
            degreecertificate: "",
          },
        ],
      },
    });
  };

  const yearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = 1980 + i;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 text-start flex items-center justify-between">
          Education Details{" "}
        </h1>{" "}
        <button
          type="button"
          onClick={onContinue} // Trigger the same function as Save and Continue
          className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded font-Poppins"
        >
          Skip
        </button>
      </div>
      <p className="my-4 mb-8 text-start">Add your educational background.</p>

      {educations.map((education, index) => (
        <div key={index} className="mb-8">
          <form>
            <div className="relative mb-5">
              <input
                type="text"
                name="university"
                value={education.university}
                onChange={(e) => handleInputChange(index, e)}
                className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                placeholder=" "
                style={{
                  outline: "none",
                  borderBottomWidth: "2px",
                  borderBottomColor: "#3182ce",
                }}
              />
              <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                University
              </label>
            </div>

            <div className="relative mb-5">
              <input
                type="text"
                name="degree"
                value={education.degree}
                onChange={(e) => handleInputChange(index, e)}
                className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                placeholder=" "
                style={{
                  outline: "none",
                  borderBottomWidth: "2px",
                  borderBottomColor: "#3182ce",
                }}
              />
              <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                Degree
              </label>
            </div>

            <div className="relative mb-5">
              <select
                name="degreeType"
                value={education.degreeType}
                onChange={(e) => handleInputChange(index, e)}
                className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                style={{
                  outline: "none",
                  borderBottomWidth: "2px",
                  borderBottomColor: "#3182ce",
                }}
              >
                <option value="">Select Degree Type</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
              <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                Degree Type
              </label>
            </div>

            <div className="relative mb-5">
              <select
                name="startYear"
                value={education.startYear}
                onChange={(e) => handleInputChange(index, e)}
                className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                style={{
                  outline: "none",
                  borderBottomWidth: "2px",
                  borderBottomColor: "#3182ce",
                }}
              >
                <option value="">Start Year</option>
                {yearOptions}
              </select>
              <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                Start Year
              </label>
            </div>

            <div className="relative mb-5">
              <select
                name="endYear"
                value={education.endYear}
                onChange={(e) => handleInputChange(index, e)}
                className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                style={{
                  outline: "none",
                  borderBottomWidth: "2px",
                  borderBottomColor: "#3182ce",
                }}
              >
                <option value="">End Year</option>
                {yearOptions}
              </select>
              <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                End Year
              </label>
            </div>

            {/* <div className="relative mb-5">
              <input
                type="file"
                name="degreecertificate"
                onChange={(e) => handleFileChange(index, e)}
                className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                style={{
                  outline: "none",
                  borderBottomWidth: "2px",
                  borderBottomColor: "#3182ce",
                }}
              />
              <label className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                Certificate
              </label>
            </div> */}
          </form>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddEducation}
        className="text-blue-600 underline font-Poppins font-bold py-1 rounded mb-4"
      >
        Click for add your Education
      </button>
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

export default Form3;
