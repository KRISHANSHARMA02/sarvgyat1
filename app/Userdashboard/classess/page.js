"use client";
import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaWhatsapp } from "react-icons/fa";
import { SiStudyverse } from "react-icons/si";
import { TbUserQuestion } from "react-icons/tb";
import { RiParentFill, RiFileVideoFill } from "react-icons/ri";
import { MdLibraryBooks } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import Image from "next/image";
import School from "@/public/School-removebg-preview.png";
import ScienceImg from "@/public/Science.png";
import MathImg from "@/public/math.jpg";

const Classes = () => {
  const [selectedFilter, setSelectedFilter] = useState('foryou');
  const [active, setActive] = useState("Science");
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const ForYou = () => {
    return (
      <div className="p-16 border rounded-lg bg-gray-50 border-gray-300 flex flex-col justify-center items-center">
        <p>Content for You</p>
      </div>
    );
  };

  const Completed = () => {
    return (
      <div className="p-16 border rounded-lg bg-gray-50 border-gray-300 flex flex-col justify-center items-center">
        <p>Content of Completed</p>
      </div>
    );
  };

  const Science = () => {
    return (
      <div className="p-16 border rounded-lg bg-gray-50 border-gray-300 flex flex-col justify-center items-center">
        <p>Content of Science</p>
        <p className="font-semibold text-[.9em] text-orange-500 animate-fadeInOut">Coming Soon....</p>
      </div>
    );
  };

  const Mathematics = () => {
    return (
      <div className="p-16 border rounded-lg bg-gray-50 border-gray-300 flex flex-col justify-center items-center">
        <p>Content of Mathematics</p>
      </div>
    );
  };

  return (
    <>
    <div className='flex flex-col-reverse md:flex-row md:justify-between w-full'>
      <p className=' text-[.9em] md:text-[1.6em] mt-4 md:mt-0 w-full md:w-auto px-4 md:px-8 font-bold'>Learn<span className='font-bold text-[1.3em]  text-orange-500'>o</span>sphere Classess</p>
      <input
        type="text"
        readOnly
        value={dateTime.toLocaleString()} // Display the date and time as a string
        className="p-2 border rounded-md w-48 md:w-64 text-center  ml-4 md:ml-12 mt-2 text-white bg-orange-500"
      />
    </div>
    <div className='bg-gray-100   md:p-4 rounded-lg  mt-6 mx-0 md:mx-8  flex flex-col md:flex-row gap-2 md:gap-4  w-full p-2  '>
        <div className='w-full md:w-[20vw] p-0 md:p-6'>
<p className='font-bold text-[1.4em] px-1 text-black'>What's New</p>
<p className='font-semibold text-gray-800 text-[0.9em] mt-2 px-0 md:px-1'> new teaching methods, updated educational resources, or recent topics and concepts introduced in the coursework.</p>
</div>
<div className='flex flex-col gap-4 w-full md:w-[20vw]  pt-0 md:pt-6 mt-2'>
<p className='flex items-center text-gray-800 font-semibold gap-2'><FaGraduationCap size={25} className='text-orange-600' />Live classess with expert teachers</p>
<p className='flex items-center text-gray-800 font-semibold gap-2'>< SiStudyverse size={25} className='text-orange-600' />Experts teachers explain concept</p>
<p className='flex items-center text-gray-800 font-semibold gap-2'><  TbUserQuestion size={25} className='text-orange-600'  />Class teachers solve doubt</p>

</div>
<div className='flex flex-col gap-4 w-full md:w-[22vw]  pt-6 mt-2'>
<p className='flex items-center text-gray-800 font-semibold gap-2'>< RiParentFill  size={25} className='text-orange-600' />Learnosphere's All-Round Learning Approach</p>
<p className='flex items-center text-gray-800 font-semibold gap-2'><  MdLibraryBooks size={25} className='text-orange-600' />Well-Designed Classes for Learning and Mastery</p>
<p className='flex items-center text-gray-800 font-semibold gap-2'><  PiStudentBold  size={25} className='text-orange-600'  />Supplementary Classes to Close Learning Gaps</p>

</div>
<div>
<Image className='h-44 mt-7 w-[65vw] md:w-72' src={School} alt=''/>
</div>
      </div>
      <div className='flex gap-3 px-2 mt-4 mb-4  overflow-x-auto scrollbar-hide '>
    
      <button onClick={() => setSelectedFilter('foryou')} className={`p-2 w-26 fonr-bold flex-shrink-0 rounded-full ${selectedFilter === 'foryou' ? 'bg-orange-600 text-white font-bold' : 'bg-white text-black border font-bold border-gray-300'}`}>
      For You
      </button>
      <button onClick={() => setSelectedFilter('completed')} className={`p-2 w-26 fonr-bold flex-shrink-0 rounded-full ${selectedFilter === 'completed' ? 'bg-orange-600 text-white font-bold' : 'bg-white text-black border font-bold border-gray-300'}`}>
       Completed
       </button>
    </div>
    
<div className=' px-2 md:px-10 mt-6'>
  <p className='font-bold text-[.9em] md:text-[1.5em] text-orange-600 '>Choose a free demo</p>
  <p className=' flex items-center gap-2 text-gray-900 px-2 text-[.6em] md:text-[0.8em] mt-1'><RiFileVideoFill size={20} className='text-orange-600'/>You only have 3 trials left.</p>
</div>
<div className='flex flex-col md:flex-row  gap-2 md:gap-8 px-2 md:px-12 mt-6'>
<p
    className={`cursor-pointer p-2 text-[.8em]   rounded-full ${active === 'Science' ? 'bg-orange-500 text-white' : 'text-black'}`}
    onClick={() => setActive('Science')}
  >
    Science
  </p>
  <p
    className={`cursor-pointer p-2 text-[.8em]    rounded-full ${active === 'Mathematics' ? 'bg-orange-500 text-white' : 'text-black'}`}
    onClick={() => setActive('Mathematics')}
  >
    Mathematics
  </p>
  <p
    className={`cursor-pointer p-2 text-[.8em]    rounded-full ${active === 'English' ? 'bg-orange-500 text-white' : 'text-black'}`}
    onClick={() => setActive('English')}
  >
    English
  </p>
  <p
    className={`cursor-pointer p-2 text-[.8em]    rounded-full ${active === 'Hindi' ? 'bg-orange-500 text-white' : 'text-black'}`}
    onClick={() => setActive('Hindi')}
  >
    Hindi
  </p>
  <p
    className={`cursor-pointer p-2 text-[.8em]    rounded-full ${active === 'Physics' ? 'bg-orange-500 text-white' : 'text-black'}`}
    onClick={() => setActive('Physics')}
  >
    Physics
  </p>
  <p
    className={`cursor-pointer p-2 text-[.8em]    rounded-full ${active === 'Chemistry' ? 'bg-orange-500 text-white' : 'text-black'}`}
    onClick={() => setActive('Chemistry')}
  >
    Chemistry
  </p>
  <p
    className={`cursor-pointer p-2 text-[.8em]  rounded-full ${active === 'Biology' ? 'bg-orange-500 text-white' : 'text-black'}`}
    onClick={() => setActive('Biology')}
  >
    Biology
  </p>
  </div>
  <div className="mt-2 px-2 md:px-12 pb-8">
        {active === "Science" && <Science />}
        {active === "Mathematics" && <Mathematics />}
        {active === "English" && <div className="text-gray-900 p-8 bg-gray-100 rounded-xl">Content of English</div>}
        {active === "Hindi" && <div className="text-gray-900 p-8 bg-gray-100 rounded-xl">Content of Hindi</div>}
        {active === "Physics" && <div className="text-gray-900 p-8 bg-gray-100 rounded-xl">Content of Physics</div>}
        {active === "Chemistry" && <div className="text-gray-900 p-8 bg-gray-100 rounded-xl">Content of Chemistry</div>}
        {active === "Biology" && <div className="text-gray-900 p-8 bg-gray-100 rounded-xl">Content of Biology</div>}
      </div>

  <p className=' text-slate-800 px-2 md:px-12 text-[1.2em]  font-bold mt-4'>Up Next</p>
  <div className='px-2 md:px-10 mt-2 md:mt-8 flex flex-col md:flex-row gap-4'>
    <div className=' border border-gray-200  w-full md:w-[25vw] mt-2 md:mt-6'>
  
  <Image className='h-[25vh] w-full' src={ScienceImg} alt=''/>
  <p className=' font-semibold text-[1.1em] border-b border-gray-200 mb-6 m-8 text-gray-900 mt-3'>Science</p>
  <p className='flex gap-2 px-8 mb-6'><FaWhatsapp size={20}/>Remind me</p>


</div>
    <div className=' border border-gray-200  w-full md:w-[25vw] mt-2 md:mt-6'>
  
  <Image className='h-[25vh] w-full' src={MathImg} alt=''/>
  <p className=' font-semibold text-[1.1em] border-b border-gray-200 mb-6 m-8 text-gray-900 mt-3'>Mathematics</p>
  <p className='flex gap-2 px-8 mb-6'><FaWhatsapp size={20}/>Remind me</p>


</div>
  </div>

    </>
  )
}

export default Classes
