"use client";
import React, { useState, useEffect } from "react";
import { LuDot } from "react-icons/lu";
import { MdCurrencyRupee } from "react-icons/md";
import {
  MdOutlineStarBorderPurple500,
  MdOutlineStarPurple500,
} from "react-icons/md";
import axios from "axios";
import { useSession } from "next-auth/react";

const Statisticsoverview = () => {
  const { data: session, status } = useSession(); // Get session and status from NextAuth
  const [walletData, setWalletData] = useState(null);
   
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.singhbrothers.ltd/api/route/getWalletData",
            { gmail: session.user.email } // make sure you are sending the email correctly
          );

         setWalletData(response.data.walletData); // set profile data from response
          setRating(response.data.walletData.rating);
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
        }
      }
    };
  
    fetchWalletData();
  }, [session, status]);
    

 

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStart = () => {
    const start = new Date();
    setStartTime(start);
    alert(`Timing started at ${start.toLocaleTimeString()}`);
  };

  const handleEnd = () => {
    const end = new Date();
    setEndTime(end);
    alert(`Timing ended at ${end.toLocaleTimeString()}`);
    if (startTime) {
      const duration = (end - startTime) / 1000;
      alert(`Total time spent: ${duration} seconds`);
    }
  };



  return (
    <div>
      <div className="font-bold text-[1em] md:text-[1.4em] mx-2 md:mx-8 mt-8">
        <p>Statistics Overview</p>
      </div>
    
      <div className="mx-2 md:mx-8 p-1 md:p-4 rounded-xl bg-orange-200">
        <div className=" mx-2 md:mx-8 p-2 md:p-4">
        <div className="font-semibold flex px-2 md:px-8 justify-between mb-4">
        <span className="text-[0.8em] md:text-[1.2em]">
          <p>Overall Review : {rating}/5</p>
        </span>
        <span className="text-orange-700 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            // Fill star if rating is greater than or equal to star number
            rating >= star ? (
              <MdOutlineStarPurple500 key={star} size={25} />
            ) : (
              <MdOutlineStarBorderPurple500 key={star} size={25} />
            )
          ))}
        </span>
      </div>
          <div className="font-semibold flex px-2 md:px-8 mt-2 justify-between">
            <p>Earnings</p>
            <p className="text-orange-600">
              {walletData ? walletData.total_earning : "0"}
            </p>
          </div>
          {/* <div className="font-semibold flex px-2 md:px-8 mt-2 justify-between">
            <p>Online Video</p>
            <p className="text-orange-600">0</p>
          </div> */}
          <div className="font-semibold flex px-2 md:px-8 mt-2 justify-between">
            <p>Availability</p>
            <p className="text-green-500 flex items-center">
              <LuDot size={30} />
              Active Now
            </p>
          </div>
        </div>
      </div>
      <div className="font-bold text-[1em] md:text-[1.4em] px-2 md:px-8 mt-5">
        <p>Earnings</p>
      </div>
      <div className="mx-2 md:mx-8 p-3 md:p-6 rounded-xl mt-4 bg-orange-50 flex flex-wrap gap-2 md:gap-5 ">
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="flex items-center text-[1.4em] gap-2 font-bold">
            <MdCurrencyRupee />
            {walletData ? walletData.current_balance : "0"}
          </p>
          <p>Current Balance</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="text-[1.4em] gap-2 font-bold">
            {walletData ? walletData.scheduled_class : "0"}
          </p>
          <p>Scheduled Class</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="flex items-center text-[1.4em] gap-2 font-bold">
            <MdCurrencyRupee />
            {walletData ? walletData.this_months_earning : "0.0"}
          </p>
          <p>This Month's Earning</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="text-[1.4em] gap-2 font-bold">
            {walletData ? walletData.pending_to_confirm : "0"}
          </p>
          <p>Pending To Confirm</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="flex items-center text-[1.4em] gap-2 font-bold">
            <MdCurrencyRupee />
            {walletData ? walletData.weekly_earning : "0.0"}
          </p>
          <p>Weekly Earning</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="text-[1.4em] gap-2 font-bold">
            {walletData ? walletData.no_of_learners : "0"}
          </p>
          <p>No. of Learners</p>
        </div>
      </div>
      <div className="font-bold text-[1em] md:text-[1.4em] px-2 md:px-8 mt-5">
        <p>Timing</p>
      </div>
      <div className="flex justify-between p-7 mx-10">
        <button onClick={handleStart} className="bg-green-500 p-2 rounded-lg">
          Start Time
        </button>
        <button onClick={handleEnd} className="bg-red-500 p-2 rounded-lg">
          End Time
        </button>
      </div>
    </div>
  );
};

export default Statisticsoverview;
