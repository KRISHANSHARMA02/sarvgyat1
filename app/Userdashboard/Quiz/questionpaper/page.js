'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Question = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(300);
    const [attemptedQuestions, setAttemptedQuestions] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [showIncorrectDetails, setShowIncorrcetDetails] = useState(false);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [attempted, setAttempted] = useState([]); // Track which questions were attempted

   
 const questions = [
    {
        question: 'You have two identical ropes. Each rope takes exactly one hour to burn from end to end, but they burn at an uneven rate. How can you measure exactly 45 minutes using these ropes? ',
        options: ['Light one rope from both ends and the other from one end ', 'Light one rope from one end and the other from both ends', 'Light both ropes from one end only', 'Light one rope from one end and wait for it to burn completely'],
        answer: 'Light one rope from both ends and the other from one end ',
    },
    {
        question: ': A man pushes his car to a hotel and tells the owner he’s bankrupt. Why?',
        options: ['He is out of gas', 'The hotel is closed', 'He is playing Monopoly', 'His car broke down'],
        answer: 'He is playing Monopoly',
    },
    {
        question: 'There are three light switches outside a closed room. Inside the room, there are three light bulbs, each controlled by one switch. You can only enter the room once. How do you figure out which switch controls which light bulb?',
        options: ['Flip one switch and leave it on for 10 minutes, then turn it off and quickly enter the room', 'Turn on two switches, then enter the room immediately', 'Turn on one switch and feel the heat of the bulbs', ' Flip two switches, wait 5 minutes, then flip the third switch before entering the room'],
        answer: 'Flip one switch and leave it on for 10 minutes, then turn it off and quickly enter the room',
    },
    {
        question: 'A father and son are involved in a car accident. The father dies, and the son is rushed to the hospital. The surgeon says, “I cannot operate on this boy, he is my son.” How is this possible?',
        options: ['The surgeon is his uncle', 'The surgeon is mistaken', 'The surgeon is his mother', 'The father survived the accident'],
        answer: 'The surgeon is his mother',
    },
    {
        question: 'You have 8 identical-looking coins, but one of them is lighter than the others. You have a balance scale but can only use it twice. How can you find the lighter coin?',
        options: ['Weigh 4 coins against 4 coins', ' Weigh 3 coins against 3 coins, then weigh 1 coin against 1 coin', 'Weigh 2 coins against 2 coins, then weigh 1 coin against 1 coin', 'Weigh 3 coins against 3 coins, then weigh 2 coins against 2 coins'],
        answer: ' Weigh 3 coins against 3 coins, then weigh 1 coin against 1 coin',
    },
];

    const handleSubmit = () => {
        setShowSummary(true);
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
            // If question has not been attempted before, increment attempted count
            if (!attempted[currentQuestion]) {
                setAttemptedQuestions(attemptedQuestions + 1);
                const updatedAttempted = [...attempted];
                updatedAttempted[currentQuestion] = true; // Mark this question as attempted
                setAttempted(updatedAttempted);
            }

            // If the selected option is correct and hasn't been marked as correct before
            if (selectedOptions[currentQuestion] === questions[currentQuestion].answer) {
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

            // Move to the next question or submit the quiz
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

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-full overflow-scroll md:overflow-hidden md:w-[80%] p-8 bg-white shadow-lg rounded-md'>
                <h2 className='text-xl font-bold mb-4'>
                    Learn<b className='font-bold text-orange-600'>O</b>sphere Quiz
                </h2>
                <div className='mb-4'>
                    <p className='text-red-600 font-semibold'>Time Left: {formatTime(timeLeft)}</p>
                </div>
                <div className='mb-4'>
                    <h3 className='text-lg font-semibold mb-2'>
                        Question {currentQuestion + 1}: {questions[currentQuestion].question}
                    </h3>
                    <div>
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className={`block w-full text-left px-4 py-2 mb-2 border rounded-md 
                                ${
                                    selectedOptions[currentQuestion] === option
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 text-black'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <button
                        onClick={handlePreviousClick}
                        className={`bg-gray-500 text-white px-4 py-2 rounded-md ${
                            currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
                        }`}
                        disabled={currentQuestion === 0}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextClick}
                        className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600'
                    >
                        {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
                    </button>
                </div>
            </div>
            {showSummary && !showIncorrectDetails && (
                <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-md shadow-lg'>
                        <h2 className='text-xl font-bold mb-4'>Quiz Summary</h2>
                        <p className='mb-2'>Questions Attempted: {attemptedQuestions}</p>
                        <p className='mb-2'>Correct Answer: {correctAnswer}</p>
                        <p className='mb-2'>Incorrect Answer: {attemptedQuestions - correctAnswer}</p>
                        <p className='mb-2'>Time Taken: {formatTime(300 - timeLeft)}</p>
                        <span className='flex flex-col'>
                            <button
                                onClick={() => setShowIncorrcetDetails(true)}
                                className='bg-orange-500 text-white px-4 py-2 rounded-md mb-4'
                            >
                                Show Incorrect Answer
                            </button>
                            <Link href='/Userdashboard'>
                                <button className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600'>
                                    Close
                                </button>
                            </Link>
                        </span>
                    </div>
                </div>
            )}
            {showSummary && showIncorrectDetails && (
                <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-md shadow-lg'>
                        <button
                            onClick={() => setShowIncorrcetDetails(false)}
                            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mb-4'
                        >
                            Hide Incorrect Answers
                        </button>
                        <h2 className='text-xl font-bold mb-4'>Incorrect Answers</h2>
                        <ul>
                            {incorrectQuestions.map((item, index) => (
                                <li key={index} className='mb-2'>
                                    <p>
                                        <strong>Question:</strong> {item.question}
                                    </p>
                                    <p>
                                        <strong>Your Answer:</strong> {item.selectedOption}
                                    </p>
                                    <p>
                                        <strong>Correct Answer:</strong> {item.correctAnswer}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Question;














//  const questions = [
//         {
//             question: 'You have two identical ropes. Each rope takes exactly one hour to burn from end to end, but they burn at an uneven rate. How can you measure exactly 45 minutes using these ropes? ',
//             options: ['Light one rope from both ends and the other from one end ', 'Light one rope from one end and the other from both ends', 'Light both ropes from one end only', 'Light one rope from one end and wait for it to burn completely'],
//             answer: 'Light one rope from both ends and the other from one end ',
//         },
//         {
//             question: ': A man pushes his car to a hotel and tells the owner he’s bankrupt. Why?',
//             options: ['He is out of gas', 'The hotel is closed', 'He is playing Monopoly', 'His car broke down'],
//             answer: 'He is playing Monopoly',
//         },
//         {
//             question: 'There are three light switches outside a closed room. Inside the room, there are three light bulbs, each controlled by one switch. You can only enter the room once. How do you figure out which switch controls which light bulb?',
//             options: ['Flip one switch and leave it on for 10 minutes, then turn it off and quickly enter the room', 'Turn on two switches, then enter the room immediately', 'Turn on one switch and feel the heat of the bulbs', ' Flip two switches, wait 5 minutes, then flip the third switch before entering the room'],
//             answer: 'Flip one switch and leave it on for 10 minutes, then turn it off and quickly enter the room',
//         },
//         {
//             question: 'A father and son are involved in a car accident. The father dies, and the son is rushed to the hospital. The surgeon says, “I cannot operate on this boy, he is my son.” How is this possible?',
//             options: ['The surgeon is his uncle', 'The surgeon is mistaken', 'The surgeon is his mother', 'The father survived the accident'],
//             answer: 'The surgeon is his mother',
//         },
//         {
//             question: 'You have 8 identical-looking coins, but one of them is lighter than the others. You have a balance scale but can only use it twice. How can you find the lighter coin?',
//             options: ['Weigh 4 coins against 4 coins', ' Weigh 3 coins against 3 coins, then weigh 1 coin against 1 coin', 'Weigh 2 coins against 2 coins, then weigh 1 coin against 1 coin', 'Weigh 3 coins against 3 coins, then weigh 2 coins against 2 coins'],
//             answer: ' Weigh 3 coins against 3 coins, then weigh 1 coin against 1 coin',
//         },
//     ];
