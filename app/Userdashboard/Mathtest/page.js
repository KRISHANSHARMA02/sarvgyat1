"use client";
import React from 'react';
import Image from 'next/image';
import Math from '@/public/math.jpg';
import { FaRegCircleCheck } from "react-icons/fa6";
import { LiaRunningSolid } from "react-icons/lia";

const Mathtest = () => {
  return (
    <div className="container mx-auto px-4">
      <div className='flex flex-col md:flex-row gap-2'>
        <div className='w-full md:w-[45%] border border-gray-300 rounded-lg p-6 mx-2 md:mx-8'>
          <Image className='h-28 md:h-36 w-28 md:w-36 rounded-lg' src={Math} alt='Math Test' />
          <p className='font-semibold text-center text-[1.2em] mt-4'>Mathematics Test</p>
          {/* Content specific to Math Test can go here */}
        </div>

        <div className='w-full md:w-[55%] flex flex-col gap-2 rounded-lg p-6 border-gray-300 border'>
          <p className='font-bold flex items-center gap-2 text-[1.1em]'>
            <FaRegCircleCheck size={20} className='text-orange-600' />
            Comprehensive Math Evaluation
          </p>
          <p className='text-gray-700 px-8 text-[0.9em]'>
            Evaluate your math skills with detailed questions and get feedback on your performance.
          </p>
          <p className='font-bold flex items-center gap-2 text-[1.1em]'>
            <FaRegCircleCheck size={20} className='text-orange-600' />
            In-depth Quizzes
          </p>
          <p className='text-gray-700 px-8 text-[0.9em]'>
            Tackle quizzes designed to cover various mathematical concepts comprehensively.
          </p>
          <p className='font-bold flex items-center gap-2 text-[1.1em]'>
            <FaRegCircleCheck size={20} className='text-orange-600' />
            Practice Exercises
          </p>
          <p className='text-gray-700 px-8 text-[0.9em]'>
            Engage in exercises to refine and strengthen your problem-solving abilities.
          </p>
          <div className='border-b relative border-gray-300 flex gap-11 md:gap-24 mt-6 mx-2 md:mx-5'>
            {/* Similar visual elements like progress bars or indicators */}
            <div className='relative'>
              <p className='absolute bottom-0 border-r-2 flex border-gray-300 mx-2 md:mx-10 w-4 h-12'>
                <LiaRunningSolid className='text-orange-300 absolute bottom-9' size={40} />
              </p>
            </div>
            {/* Repeat similar divs for additional visual elements */}
          </div>
          <div className='flex'>
            <p className='mx-2 md:mx-8 text-[.6em] md:text-[.7em] w-10 md:w-20'>Goal-setting</p>
            <p className='mx-1 md:mx-4 text-[.6em] md:text-[.7em] w-10 md:w-16'>Planning</p>
            <p className='mx-1 md:mx-4 text-[.6em] md:text-[.7em] w-10 md:w-16'>Research</p>
            <p className='mx-1 md:mx-4 text-[.6em] md:text-[.7em] w-10 md:w-16'>Strategy</p>
            <p className='mx-2 md:mx-4 text-[.6em] md:text-[.7em] w-10 md:w-16'>Feedback</p>
            <p className='mx-1 md:mx-4 text-[.6em] md:text-[.7em] w-10 md:w-16'>Reflect</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mathtest;