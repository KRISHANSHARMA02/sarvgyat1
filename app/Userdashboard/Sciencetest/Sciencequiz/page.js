"use client";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import picture from '@/public/image for website.png';

const Question = () => {
  const { data: session, status } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showSummary, setShowSummary] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [grade, setGrade] = useState(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizComponent
        session={session}
        status={status}
        profileData={profileData}
        setProfileData={setProfileData}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        questions={questions}
        setQuestions={setQuestions}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        grade={grade}
        setGrade={setGrade}
      />
    </Suspense>
  );
};

const QuizComponent = ({
  session,
  status,
  profileData,
  setProfileData,
  currentQuestion,
  setCurrentQuestion,
  selectedOptions,
  setSelectedOptions,
  showSummary,
  setShowSummary,
  questions,
  setQuestions,
  timeLeft,
  setTimeLeft,
  grade,
  setGrade
}) => {
  const searchParams = useSearchParams();
  const queryDifficulty = searchParams.get('difficulty');
  const subject = searchParams.get('subject');
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.singhbrothers.ltd/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          const profile = response.data;
          setProfileData(profile);
          setGrade(profile?.grade); // Store the grade
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [session, status]);

  // Fetch questions based on grade, difficulty, and subject
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!grade || !subject) return;

        const response = await fetch(
          `https://learnospherebackend.singhbrothers.ltd/api/route/questions/${grade}/${queryDifficulty || 'easy'}/${subject}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch questions');
        
        const data = await response.json();
        setQuestions(data);
        setSelectedOptions(new Array(data.length).fill(undefined)); // Initialize selectedOptions array
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    fetchQuestions();
  }, [grade, queryDifficulty, subject]);

  const handleSubmit = async () => {
    if (status === "authenticated" && session?.user?.email) {

      const questionNumbers = questions.map((_, index) => `${index + 1}`); // Corrected syntax
      const selectedValues = selectedOptions.map(option => option);
  
      const quizData = {
        userId: profileData?.gmail || session.user.email,
        questionNo: questionNumbers,
        quizDifficulty: queryDifficulty || 'easy',
        subject: subject,
        selectedOptions: selectedValues,
        timeTaken: 300 - timeLeft,
        grade: profileData?.grade || session.user.class,
      };
  
      try {
        const response = await fetch('https://learnospherebackend.singhbrothers.ltd/api/route/submitResult', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizData),
        });
  
        if (!response.ok) throw new Error('Failed to submit results');
  
        const result = await response.json();
        setShowSummary(true);
  
        // Build the query string for the URL
        const queryString = new URLSearchParams({
          quizData: JSON.stringify(quizData),
          questions: JSON.stringify(questions),
        }).toString();
  
        // Navigate to the result page with the constructed URL
        router.push(`/Userdashboard/Sciencetest/resultpage?${queryString}`);
        
      } catch (error) {
        console.error('Error submitting results:', error);
      }

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
    updatedSelectedOptions[currentQuestion] = option; // Save the selected option for the current question
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextClick = () => {
    if (selectedOptions[currentQuestion]) {
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
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className='flex items-center h-screen'>
      <div className='w-full overflow-scroll md:overflow-hidden p-8 bg-white rounded-md'>
        <h2 className='text-xl font-bold mb-4'>
          Learn<b className='font-bold text-orange-600'>O</b>sphere Quiz
        </h2>

        <div className='mb-4 flex flex-col md:flex-row gap-2 md:gap-20'>
          <div className='w-full md:w-[50%] flex items-center'>
            <h3 className='text-lg font-semibold mb-2'>
              Question {currentQuestion + 1}: {questions[currentQuestion].question}
              <Image className='h-60 w-60' src={picture} alt='' />
            </h3>
          </div>
          <div className='w-full md:w-[50%]'>
            <div>
              <div className='mb-4'>
                <p className='text-red-600 font-semibold'>Time Left: {formatTime(timeLeft)}</p>
              </div>
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`block w-full text-left px-4 py-6 mt-4 mb-2 border rounded-md 
                  ${selectedOptions[currentQuestion] === option ? 'bg-green-500 text-white' : 'bg-white border-gray-300 text-black'}`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={selectedOptions[currentQuestion] === option}
                    onChange={() => handleOptionClick(option)} // Update selected option
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className='flex justify-between mt-6 md:mt-40'>
              <button
                onClick={handlePreviousClick}
                className={`bg-gray-500 text-white px-4 py-2 rounded-md ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                onClick={currentQuestion < questions.length - 1 ? handleNextClick : handleSubmit}
                className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600'
              >
                {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;



