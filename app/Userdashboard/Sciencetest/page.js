"use client";
import Link from 'next/link';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import picture from '@/public/image for website (1).png'
import Image from 'next/image';

const SciencetestContent = () => {
  const searchParams = useSearchParams();
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const subject = searchParams.get('subject'); // Get the subject from search params

  return (
    <div className='flex '>
    <div className=' flex flex-col items-center justify-center w-[35%]'>
    <Image className='h-60 w-60' src ={picture} alt=''/>
    <h2 className='font-extrabold text-orange-600 text-[1.5em]'>Subject Wise Quiz Test</h2>
    <p className='text-[.8em]'>Complete The Test WithIn The Time Limits To Gain Maximum Points</p>
    </div>
    
    <div className='  h-screen w-[65%]'>
    <div className='bg-gray-50 p-3 md:p-12  rounded-bl-xl border border-gray-300 '>
    
          <div className='mt-4 mb-2'>
        <h2 className='font-bold text-[1.2em]'>Instructions</h2>
      
      </div>
      {
        // <div className='flex flex-col md:flex-row justify-between h-16'>
          //   <div>
          //     <div className='px-4 md:px-16 mt-6 flex gap-3'>
          //       <div className='flex flex-col gap-1 items-center'>
          //         <p className='text-center p-1 w-20 bg-blue-500 text-white rounded-2xl'>0</p>
          //         <p className='text-[.8em]'>Total Question</p>
          //       </div>
          //       <div className='flex flex-col gap-1 items-center'>
          //         <p className='text-center p-1 w-20 bg-green-500 text-white rounded-2xl'>0 minute</p>
          //         <p className='text-[.8em]'>Duration</p>
          //       </div>
          //     </div>
          //   </div>

          // <div className='px-4 md:px-40 mt-2 md:mt-5'>
          //   <label htmlFor="difficulty" className='block text-gray-700 font-semibold mb-2'>Select Difficulty:</label>
          //   <select
        //     id="difficulty"
        //     className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
        //     value={selectedDifficulty}
        //     onChange={(e) => setSelectedDifficulty(e.target.value)} // Update difficulty state
        //   >
        //     <option value="easy">Easy</option>
        //     <option value="medium">Medium</option>
        //     <option value="hard">Hard</option>
        //   </select>
        // </div>
        // </div>
      }

      <div className='px-7 md:px-16  mt-4'>
              <ol className=' flex flex-col gap-2 list-disc '>
          <li>Ensure a stable internet connection before starting the quiz. Avoid disruptions by staying in an area with reliable connectivity.</li>
          <li>Complete the quiz independently without help from books, notes, or other online resources.</li>
          <li>Select only one answer for each multiple-choice question unless otherwise specified.</li>
          <li>Time management: Keep track of the timer. Ensure you submit all answers before time runs out.</li>
          <li>Save your progress regularly (if applicable) to avoid losing answers in case of technical issues.</li>
          <li>Answer every question: If you are unsure, make your best guess, as unanswered questions may affect your score.</li>
          <li>No negative marking: Guess wisely if you don’t know an answer, as wrong answers won't reduce points.</li>
          <li>Avoid refreshing or navigating away from the quiz page during the test to prevent being logged out or losing progress.</li>
        
        </ol>
       
      </div>
      </div>
      <div className='flex justify-between'>
        <div className='px-4 md:px-12 mt-5'>
          <label htmlFor="language" className='block text-gray-700 font-semibold mb-2'>Select Language:</label>
          <select
            name='language'
            id='language'
            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ease-in-out duration-150'
          >
            <option value=''>English</option>
            <option value='Hindi'>Hindi</option>
          </select>
        </div>
        
        
        <div className='px-10 md:px-40 mt-2'>
        <Link href={`/Userdashboard/Sciencetest/Sciencequiz?subject=${subject}&difficulty=${selectedDifficulty}`}>
        <button className='p-2 rounded-md mt-12 bg-orange-600 text-white font-bold'>Start Test</button>
        </Link>
        </div>
        </div>
        </div>
    </div>
  );
};

const Sciencetest = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SciencetestContent />
  </Suspense>
);

export default Sciencetest;

