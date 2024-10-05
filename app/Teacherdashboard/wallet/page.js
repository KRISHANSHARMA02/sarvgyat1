"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Make sure to import useSession
import axios from "axios";
import { TbWallet } from "react-icons/tb";
import { MdCurrencyRupee } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import Aos from "aos";
import "aos/dist/aos.css";
import { IoCloseOutline } from "react-icons/io5";

const Wallet = () => {
  const { data: session, status } = useSession(); // Get session and status from NextAuth
  const [walletData, setWalletData] = useState(null);
  const [isEarnPopUpVisible, setIsEarnPopupVisible] = useState(false);

  const EarnClick = () => {
    setIsEarnPopupVisible(true);
  };
  
  const EarnClosePopup = () => {
    setIsEarnPopupVisible(false);
  };

  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.singhbrothers.ltd/api/route/getWalletData",
            { gmail: session.user.email } // Make sure you are sending the email correctly
          );
          
          setWalletData(response.data.walletData); // Directly set the response data
          
        } catch (error) {
          console.error("Error fetching teacher wallet data:", error);
        }
      }
    };
    fetchWalletData();
  }, [session, status]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mx-2 md:mx-10 bg-orange-200 p-10 rounded-xl gap-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-orange-400 p-3 rounded-full h-16 w-16">
            <TbWallet className="text-white" size={40} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-[1.3em]">Today's Earning</p>
            <p className="flex text-[1.2em] items-center gap-2">
              <MdCurrencyRupee size={25} />
              {walletData?.todays_earning || "0.0"}
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          <div>
            <div className="bg-orange-400 p-3 rounded-full h-14 w-14">
              <GoHistory className="text-white" size={32} />
            </div>
            <div className="mt-2">
              <button
                onClick={EarnClick}
                className="bg-orange-100 rounded-lg p-2 text-orange-500 text-[0.7em] md:text-[1em] text-center font-semibold"
              >
                Earning History
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="font-bold text-[1em] md:text-[1.4em] px-2 md:px-8 mt-5">
        <p>Earnings</p>
      </div>

      <div className="mx-2 md:mx-8 p-3 md:p-6 rounded-xl mt-4 bg-orange-50 flex flex-wrap gap-2 md:gap-5">
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="flex items-center text-[1.4em] gap-2 font-bold">
            <MdCurrencyRupee />
            {walletData?.current_balance || "0"}
          </p>
          <p>Current Balance</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="text-[1.4em] gap-2 font-bold">
            {walletData?.scheduled_class || "0"}
          </p>
          <p>Scheduled Class</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="flex items-center text-[1.4em] gap-2 font-bold">
            <MdCurrencyRupee />
            {walletData?.this_months_earning || "0.0"}
          </p>
          <p>This Month's Earning</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="text-[1.4em] gap-2 font-bold">
            {walletData?.pending_to_confirm || "0"}
          </p>
          <p>Pending To Confirm</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="flex items-center text-[1.4em] gap-2 font-bold">
            <MdCurrencyRupee />
            {walletData?.weekly_earning || "0.0"}
          </p>
          <p>Weekly Earning</p>
        </div>
        <div className="p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52">
          <p className="text-[1.4em] gap-2 font-bold">
            {walletData?.no_of_learners || "0"}
          </p>
          <p>No. of Learners</p>
        </div>
      </div>

      {isEarnPopUpVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <IoCloseOutline
              size={30}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={EarnClosePopup}
            />
            <p className="text-center font-bold text-lg mb-4">
              Earning History Notification
            </p>
            <p className="text-center">No Data Found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;

