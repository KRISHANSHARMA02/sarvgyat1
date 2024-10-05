"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SkillTestQuestion = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showIncorrectDetails, setShowIncorrectDetails] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [attempted, setAttempted] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchTeacherQuestions = async () => {
      try {
        const response = await fetch(
          `https://learnospherebackend.singhbrothers.ltd/api/route/teacherquestions`
        );
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeacherQuestions();
  }, []);

  const handleSubmit = () => {
    if (questions.length > 0) {
      setShowSummary(true);
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && !showSummary) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!showSummary) {
      handleSubmit();
    }
  }, [timeLeft, showSummary]);

  const handleOptionClick = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextClick = () => {
    if (selectedOptions[currentQuestion]) {
      if (!attempted[currentQuestion]) {
        setAttemptedQuestions(attemptedQuestions + 1);
        const updatedAttempted = [...attempted];
        updatedAttempted[currentQuestion] = true;
        setAttempted(updatedAttempted);
      }

      if (
        selectedOptions[currentQuestion] === questions[currentQuestion].answer
      ) {
        setCorrectAnswer(correctAnswer + 1);
      } else {
        setIncorrectQuestions([
          ...incorrectQuestions,
          {
            question: questions[currentQuestion].question,
            selectedOption: selectedOptions[currentQuestion],
            correctAnswer: questions[currentQuestion].answer,
          },
        ]);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full overflow-scroll md:overflow-hidden md:w-[80%] p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-xl font-bold mb-4">
          Learn<b className="font-bold text-orange-600">O</b>sphere Quiz
        </h2>
        <div className="mb-4">
          <p className="text-red-600 font-semibold">
            Time Left: {formatTime(timeLeft)}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Question {currentQuestion + 1}:{" "}
            {questions.length > 0 && questions[currentQuestion]?.question}
          </h3>
          <div>
            {questions.length > 0 &&
              questions[currentQuestion]?.options &&
              questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`block w-full text-left px-4 py-2 mb-2 border rounded-md 
                                    ${
                                      selectedOptions[currentQuestion] ===
                                      option
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100 text-black"
                                    }`}
                >
                  {option}
                </button>
              ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePreviousClick}
            className={`bg-gray-500 text-white px-4 py-2 rounded-md ${
              currentQuestion === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-600"
            }`}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextClick}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
      {showSummary && !showIncorrectDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-[80%] p-8 bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-bold mb-4">Quiz Summary</h2>
            <p>Total Questions: {questions.length}</p>
            <p>Attempted: {attemptedQuestions}</p>
            <p>Correct Answers: {correctAnswer}</p>
            <button
              onClick={() => setShowIncorrectDetails(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mt-4"
            >
              View Incorrect Questions
            </button>
            <Link href="/Teacherdashboard">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mt-4">
                Close
              </button>
            </Link>
          </div>
        </div>
      )}
      {showIncorrectDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-[80%] p-8 bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-bold mb-4">Incorrect Questions</h2>
            {incorrectQuestions.map((item, index) => (
              <div key={index} className="mb-4">
                <p>Question: {item.question}</p>
                <p>Your Answer: {item.selectedOption}</p>
                <p>Correct Answer: {item.correctAnswer}</p>
              </div>
            ))}
            <button
              onClick={() => setShowIncorrectDetails(false)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTestQuestion;
