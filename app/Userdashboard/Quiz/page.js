import Image from 'next/image'
import React from 'react'
import { CiCircleQuestion } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import Link from 'next/link';
const Quiz = () => {
    return (
        <div>
            <div className='flex gap-8 bg-gray-200 p-4 rounded-md'>
                <div className="w-full md:w-36 h-full md:h-24 bg-orange-200 rounded-md hidden md:flex items-center justify-center">
                    <p className="text-gray-900 font-semibold text-[.8em]">Learn<span className="font-bold text-orange-600 ">O</span>sphere.in</p>
                </div>
                <div className=' flex justify-between w-full mt-1'>
                    <div>
                        <h2 className='fonr-bold'> Practice Quiz</h2>
                        <span className='text-[.8em] flex gap-3 mt-1'>
                            <p className='flex font-bold gap-1 items-center'><CiCircleQuestion size={18} />Questions</p>
                            <p className='flex font-bold gap-1 items-center'><BsFileEarmarkSpreadsheet size={16} />Marks</p>
                            <p className='flex font-bold gap-1 items-center'><IoMdTime size={18} />Time</p>
                        </span>
                    </div>
                    <div className='mt-3 p-3'>
                    <Link href ='/Userdashboard/Quiz/quizdescription'>
                    <button className='bg-orange-600 text-white font-bold p-2 rounded-sm text-[.6em] md:text-[.8em]'>Start Now</button>
                    </Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Quiz
