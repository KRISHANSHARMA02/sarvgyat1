"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Science from '@/public/Science.png';
import Math from '@/public/math.jpg';
import Mock from '@/public/Mock.jpg';
import { PiNotepadFill } from "react-icons/pi";
import { GiWhiteBook } from "react-icons/gi";
import Link from 'next/link';

const RecentlyCompleted = () => {
  return (
    <div className='p-4 '>
     
      <div className='p-16 border rounded-lg bg-gray-50 border-gray-300 flex flex-col justify-center items-center'>
      <PiNotepadFill size={120} className='text-orange-500'/>
      <p className='font-bold text-[1.2em]'>No Activity Yet</p>
      <p className="font-semibold text-[.9em] text-orange-500 animate-fadeInOut">Coming Soon....</p>

      </div>
    </div>
  );
};

const BookmarkedQuestion = () => {
  return (
    <div className='p-4 '>
     <p className='text-bold text-gray-600 text-[.9em] md:text-[1.2em]'>Find your bookmarked questions here</p>
      <div className='p-16 border rounded-lg mt-4 bg-gray-50 border-gray-300 flex flex-col justify-center items-center'>
      < GiWhiteBook size={120} className='text-orange-500'/>
      <p className='font-bold text-[1.2em] text-center md:text-start'>No bookmarks to show yet</p>
      <p className='font-semibold text-gray-600 text-[1em] text-center md:text-start'>You can bookmark important questions to view them here</p>
      <p className="font-semibold text-[.9em] text-orange-500 animate-fadeInOut">Coming Soon....</p>

      </div>
    </div>
  );
};

const Chaptertest = () => {
  const [active1, setActive1] = useState('Recently Completed');

  return (
    <div>
      <div className="mx-2 md:mx-16 p-2 md:p-10 rounded-lg flex flex-col border border-gray-300 gap-4">
        <p className="text-[.9em] md:text-[1.4em] font-bold">Pick a subject to start your test session</p>
        <div className="flex gap-2 md:gap-8">
        <Link href={`Userdashboard/chaptertest/studymaterial`}>
        <span>
        <Image className="h-20 md:h-40 w-20 md:w-40 rounded-lg shadow-2xl" src={Science} alt="Math" />
        <p className="font-semibold text-center mt-2 text-[0.8em] md:text-[1em]">Math</p>
        </span>
        </Link>
          <span>
            <Image className="h-20 md:h-40 w-20 md:w-40 rounded-lg shadow-2xl" src={Math} alt="Mathematics" />
            <p className="font-semibold text-center mt-2 text-[0.8em] md:text-[1em]">Mathematics</p>
          </span>
          <span>
            <Image className="h-20 md:h-40 w-20 md:w-40 rounded-lg shadow-2xl" src={Mock} alt="Mock Test" />
            <p className="font-semibold text-[0.8em] md:text-[1em] text-center mt-2">Mock Test</p>
          </span>
        </div>
      </div>
      <div className="flex gap-2 md:gap-8 px-2 md:px-12 mt-6">
        <p
          className={`cursor-pointer p-2 text-[.8em] rounded-full ${active1 === 'Recently Completed' ? 'bg-orange-500 text-white' : 'text-black'}`}
          onClick={() => setActive1('Recently Completed')}
        >
          Recently Completed
        </p>
        <p
          className={`cursor-pointer p-2 text-[.8em] rounded-full ${active1 === 'Bookmarked Question' ? 'bg-orange-500 text-white' : 'text-black'}`}
          onClick={() => setActive1('Bookmarked Question')}
        >
          Bookmarked Question
        </p>
      </div>
      <div className="mt-6 px-2 md:px-12">
        {active1 === 'Recently Completed' ? <RecentlyCompleted /> : <BookmarkedQuestion />}
      </div>
    </div>
  );
};

export default Chaptertest;
