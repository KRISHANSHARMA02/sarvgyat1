"use client";
import React from 'react'
import { BiMath } from "react-icons/bi";
import { MdOutlineScience } from "react-icons/md";
import { MdQuestionMark } from "react-icons/md";
import { Link } from 'react-scroll';
import { PiNotepad } from "react-icons/pi";
import Image from 'next/image';
import Classroom from '@/public/classroom.webp'
import { PiBookOpenText } from "react-icons/pi";
import { GiWhiteBook } from "react-icons/gi";

const Bookmark = () => {

  return (
    <div>
      <div className='flex flex-col md:flex-row  '>
        <div className='w-full md:w-[55%] h-auto md:h-[80vh] flex flex-col  gap-6'>
      <div className='p-8 md:p-10 mx-2 xl:mx-2 2xl:mx-8 border border-gray-300  h-auto xl:h-[45vh] 2xl:h-[35vh] rounded-lg'>
        <p className='text-[.9em] md:text-[1.4em] font-bold'>Subjects Bookmarks</p>
        <p className='font-semibold text-orange-400 mt-2'>Total Bookmarks:</p>
        <div className='flex flex-wrap gap-4 mt-8'>
          <span  className='p-5 bg-green-200 w-48 flex flex-col justify-between h-40 rounded-md'>
            <p className="flex items-center font-bold text-[1em] text-gray-700 gap-2"><BiMath className='text-green-40000' size={30} />Mathematics</p>
            <p className='text-orange-600 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-green-200 '>No Bookmarks Yet</p>
          </span>
          <span  className=' bg-cyan-200 w-48 p-5 flex flex-col justify-between h-40 rounded-md'>
            <p className='flex items-center font-bold text-[1em] text-gray-700 gap-2' ><MdOutlineScience className='text-cyan-400' size={30} />Science</p>
            <p className='text-orange-600 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-cyan-200 '>No Bookmarks Yet</p>
          </span>
        </div>
      </div>
      <div className='p-4 xl:p-2 2xl:p-10 mx-2 xl:mx-3 2xl:mx-8 border border-gray-300 h-auto xl:h-[55vh] 2xl:h-[35vh] rounded-lg'>
        <p className='text-[0.9em] md:text-[1.4em] font-bold'>Bookmarked Categories</p>
   
        <div className=' flex flex-wrap  gap-2 mt-8'>
          <span  className='p-5 bg-green-100 w-32 xl:w-40 2xl:w-48 flex flex-col justify-between h-40 rounded-md'>
            <p className="flex items-center font-bold text-[.9em] text-gray-700 gap-2"><MdQuestionMark className='text-green-400' size={30} />Questions</p>
            <p className='text-green-400 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-green-100 '>No Bookmarks Yet</p>
          </span>
          <span  className=' bg-cyan-100  w-32 xl:w-40 2xl:w-56 p-5 flex flex-col justify-between h-40 rounded-md'>
            <p className='flex items-center font-bold text-[.9em] text-gray-700 gap-2' ><PiBookOpenText  className='text-cyan-400' size={30} /> Summaries</p>
            <p className='text-cyan-400 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-cyan-100 '>No Bookmarks Yet</p>
          </span>
          <span  className=' bg-orange-100 w-32 xl:w-40 2xl:w-48 p-5 flex flex-col justify-between h-40 rounded-md'>
            <p className='flex items-center font-bold text-[.9em] text-gray-700 gap-2' ><PiNotepad  className='text-orange-400' size={30} />Exam Papers</p>
            <p className='text-orange-400 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-orange-100 '>No Bookmarks Yet</p>
          </span>
        </div>
      </div>
      </div>
      <div className='w-full md:w-[45%] border border-gray-300 rounded-lg p-4 flex flex-col gap-2'>
        <div className='flex justify-between  mt-5 rounded-lg gap-8 p-4 bg-orange-50 '>
          <div className='flex gap-8 ' >

         <span className=' p-3 h-12 w-12 bg-orange-300 rounded-full'>
          <MdQuestionMark className='bg-orange-400 h-6 w-6 rounded-full ' size={20}/>
          </span>
          <span>
             <p className='font-bold text-[0.6em] md:text-[1.2em] text-black'>Have a Doubt?</p>
        <p className='font-semibold text-[0.6em] md:text-[.9em] mt-1 md:mt-2 text-orange-500'>Clarify Your Doubt</p>
          </span>
          </div>
          <div>
            <Link href='/Userdashboard/Askquestion'>
            <button className='p-2 bg-orange-400 rounded-full text-[0.6em] md:text-[1em]  text-semibold text-white'>Click here</button></Link>
          </div>
         
        </div>
        <div className='flex justify-between  mt-2 rounded-lg gap-8 p-4 bg-sky-50 '>
          <div className='flex gap-8 ' >

         <span className=' p-3 h-12 w-12 bg-sky-300 rounded-full'>
          <PiNotepad className='h-6 w-6' size={20}/>
          </span>
          <span>
             <p className='font-bold text-[0.6em] md:text-[1.2em] text-black'>Take a Test?</p>
        <p className='font-semibold text-[0.6em] md:text-[.9em] mt-1 md:mt-2 text-sky-500 w-20 md:w-auto'>Take Chapter-Wise Test</p>
          </span>
          </div>
          <div>
            <Link href='/Userdashboard/Practicequestion'>
            <button className='p-2 bg-sky-400 text-[0.6em] md:text-[1em] rounded-full text-semibold text-white'>Click here</button></Link>
          </div>
         
        </div>
        <div className='flex flex-col gap-2  mt-2 rounded-lg  p-4 bg-sky-50 '>
         
         
          <Image className='h-80 rounded-lg' src ={Classroom} alt=''/>
             <p className='font-bold text-[0.6em] md:text-[1.2em] text-black'>Concept Video</p>
        <p className='font-semibold text-[0.6em] md:text-[.9em] mt-1 md:mt-2  text-sky-500'>Browse Video Lessons</p>
         
            <Link href='/Userdashboard/Conceptvideo'>
            <button className='p-2 bg-sky-400 rounded-lg text-semibold text-[0.7em] md:text-[.9em]  text-white'>view Concept Videos</button></Link>
          </div>
        
         
         
      
        
      </div>
      </div>
      <div className='p-4 '>
     <p className='text-bold text-gray-600 text-[.9em] md:text-[1.2em]'>Find your bookmarked questions here</p>
      <div className='p-16 border rounded-lg mt-4 bg-gray-50 border-gray-300 flex flex-col justify-center items-center'>
      < GiWhiteBook size={120} className='text-orange-500'/>
      <p className='font-bold text-[1.2em] text-center md:text-start'>No bookmarks to show yet</p>
      <p className='font-semibold text-gray-600 text-[1em] text-center md:text-start'>You can bookmark important questions to view them here</p>
      <p className="font-semibold text-[.9em] text-orange-500 animate-fadeInOut">Coming Soon....</p>

      </div>
    </div>
     
    </div>
  )
}

export default Bookmark
