// pages/result.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const router = useRouter();
  const [resultData, setResultData] = useState([]); // Initialize as an empty array
  const [totalScore, setTotalScore] = useState(0);
  const [questions, setQuestions] = useState([]); // State for questions
  const [selectedOptions, setSelectedOptions] = useState([]); // Assuming this state is required
  const [isCorrectArray, setIsCorrectArray] = useState([]); // Assuming this state is required

  // Clear method to reset states
  const clearResults = () => {
    setResultData([]); // Clear result data
    setTotalScore(0);  // Reset total score
    setQuestions([]); // Clear questions
    setSelectedOptions([]); // Clear selected options
    setIsCorrectArray([]); // Clear correctness array
  };

  // Fetch the results from your backend
  const fetchResults = async () => {

    clearResults(); // Clear the previous results before fetching new data

    try {
      const response = await axios.get("https://learnospherebackend.singhbrothers.ltd/api/route/fetchResult");
      console.log("API Response:", response.data);
      
      // Ensure response format
      if (response.data.success && Array.isArray(response.data.data)) {
        setResultData(response.data.data);
        
        // Calculate total score from the fetched data
        const score = response.data.data.reduce((acc, result) => acc + result.score, 0);
        setTotalScore(score);

        // Set questions from response if available
        // Assuming questions can be part of the response data
        const allQuestions = response.data.data.map(result => JSON.parse(result.questionNo)).flat();
        setQuestions(allQuestions);
        
        // Set selected options and correctness if needed
        const allSelectedOptions = response.data.data.map(result => JSON.parse(result.selectedOptions)).flat();
        setSelectedOptions(allSelectedOptions);
        const allIsCorrectArray = response.data.data.map(result => JSON.parse(result.isCorrect)).flat();
        setIsCorrectArray(allIsCorrectArray);
      } else {
        console.error("Unexpected data format:", response.data);
        setResultData([]);  // Clear result data if format is unexpected
      }
    } catch (error) {
      console.error("Error fetching results:", error.message);
      setResultData([]);  // Clear result data in case of an error
    }
  };

  useEffect(() => {
    fetchResults();  // Fetch results when the component mounts
  }, []);

  const handleViewAnswerKey = () => {
    // Prepare data to be passed as search params
    const answerKeyData = {
      questions: JSON.stringify(questions),
      selectedOptions: JSON.stringify(selectedOptions),
      isCorrectArray: JSON.stringify(isCorrectArray),
    };

    // Convert the object into a query string
    const queryString = new URLSearchParams(answerKeyData).toString();

    // Navigate to the Answer Key page with the query string
    router.push(`/Userdashboard/Sciencetest/answerkey?${queryString}`);
  };

  return (
    <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-center w-full">
      <div className="bg-white rounded-lg p-8 flex justify-between w-full md:w-1/2">
        {/* Left side: Score Box */}
        <div className="h-20 p-6 bg-orange-600 text-white font-extrabold rounded-2xl">
          <h3 className="text-lg font-bold ">Total Score: {totalScore}</h3>
        </div>
      </div>

      {/* Right side: Result Details */}
      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-bold mb-4">Your Result</h3>
        <div>
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Question No</th>
                <th className="px-4 py-2">Selected Option</th>
                <th className="px-4 py-2">Correctness</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((result, index) => {
                const questionNumbers = JSON.parse(result.questionNo);
                const selectedOptions = JSON.parse(result.selectedOptions);

                const isCorrectArray = JSON.parse(result.isCorrect);
                const scoreArray = JSON.parse(result.scorePerQuestion);


                return questionNumbers.map((questionNo, qIndex) => (
                  <tr key={qIndex} className="border-b">
                    <td className="px-4 py-2">{questionNo}</td>
                    <td className="px-4 py-2">{selectedOptions[qIndex]}</td>
                    <td className="px-4 py-2">
                      {isCorrectArray[qIndex] === '✔' ? (
                        <span className="text-green-500">✔</span>
                      ) : (
                        <span className="text-red-500">✘</span>
                      )}
                    </td>
                    <td className="px-4 py-2">{scoreArray[qIndex]}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-green-500">✔</span> <span>Answered Correctly</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-red-500">✘</span> <span>Answered Incorrectly</span>
          </div>
        </div>

        {/* Answer Key Button */}
        <button onClick={handleViewAnswerKey}>
          View Answer Key
        </button>
      </div>
    </div>
  );
};

export default ResultPage;

