'use client'
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { FaRegStar } from "react-icons/fa6";
import Star from './Star';






export default function Rating() {
  const[rating,setRating]=useState(0);
  const[hover,setHover]=useState(0);
  console.log('rating', rating);
  console.log('hover',hover);
console.log('(rating && hover)',(rating && hover));
const{
  stars
}=Rating;
  
  return (
    <div className='mt-12'>
      <div className="p-8">
  <h1 className="text-2xl font-semibold mb-4">Rating</h1>

  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-lg font-semibold mb-4">Rating Summary</h2>
    <p>Average Rating: 4.8</p>
    <p>Total Ratings: 25</p>
    {/* Add more relevant rating information */}
  </div>

  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4">Recent Feedback</h2>
    {/* Feedback list */}
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <p className="font-semibold">John Doe</p>
        <div className="flex items-center">
          <p className="flex mr-2">Rating:</p>
          <div className="flex text-2xl text-yellow-400">
          {/* <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar /> */}
          <Star className="flex" stars={stars}  /> {/* getting props value from star component */}
          </div>
        </div>
        <p>Great teacher, very knowledgeable!</p>
      </div>
      {/* Add more recent feedback entries */}
    </div>
  </div>

  <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
    View All Feedback
  </button>
</div>

 {/* <div className="">
  {
    [1,2,3,4,5].map((num)=>(
      <button key={num} className="bg-transparent outline-none border-none p-5"
      onClick={()=> setRating(num)}
      onMouseOver={()=> setHover(num)}
      onMouseLeave={()=> setHover(rating)}
      >
<span className={`bg-gray-50 ${num <= ((rating && hover) || hover) 
  ? 'bg-black' : 'bg-gray-50'}`}>
        <FaRegStar 
 className='text-2xl bg-white'/>
      </span>
      </button>
      
    ))
  }
</div>  */}
    </div>
  )
}
