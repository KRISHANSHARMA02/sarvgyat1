"use client";
import React , {useState, useEffect} from 'react'
import { MdCurrencyRupee } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const Progress = () => {
    const { data: session, status } = useSession(); // Get session and status from NextAuth
    const [walletData, setWalletData] = useState(null);


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
      <div className='font-bold text-[1em] md:text-[1.4em] px-2 md:px-8 mt-0 md:mt-5'>
                <p>Earnings</p>
            </div>
            <div className='mx-2 md:mx-8 p-3 md:p-6 rounded-xl mt-4 bg-orange-50  flex flex-wrap gap-2 md:gap-5 '>
                <div className=' p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52'>
                    <p className='flex items-center text-[1.4em] gap-2 font-bold'> <MdCurrencyRupee />
                    {walletData ? walletData.current_balance : "0"}
                    </p>
                    <p>Current Balance</p>
                </div>
                <div className=' p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52'>
                    <p className=' text-[1.4em] gap-2 font-bold'>
                    {walletData ? walletData.scheduled_class : "0"}
                    </p>
                    <p>Scheduled Class</p>
                </div>
                <div className=' p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52'>
                    <p className='flex items-center text-[1.4em] gap-2 font-bold'> <MdCurrencyRupee />
                    {walletData ? walletData.this_months_earning : "0.0"}
                    </p>
                    <p>This Month's Earning</p>
                </div>
                <div className=' p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52'>
                    <p className=' text-[1.4em] gap-2 font-bold'>
                    {walletData ? walletData.pending_to_confirm : "0"}
                         </p>
                    <p>Pending To Confirm</p>
                </div>
                <div className='  p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52'>
                    <p className='flex items-center text-[1.4em] gap-2 font-bold'> <MdCurrencyRupee />
                    {walletData ? walletData.weekly_earning : "0.0"}
                    </p>
                    <p>Weekly Earning</p>
                </div>
                <div className='  p-6 mx-2 md:mx-8 flex flex-col text-[.7em] md:text-[1em] gap-2 rounded-xl bg-orange-200 w-32 md:w-52'>
                    <p className=' text-[1.4em] gap-2 font-bold'>
                    {walletData ? walletData.no_of_learners : "0"}
                        </p>
                    <p>No. of Learners</p>
                </div>
            </div>
            <div className='p-2 md:p-4 mt-5 mx-2 md:mx-8 w-auto bg-orange-100 rounded-xl'>
            <div className='font-bold text-[1em] md:text-[1.4em] px-2 md:px-8 mt-5'>
                <p>Top Views</p>
            </div>
            <div className='flex flex-col items-center text-[1.6em] justify-center h-[20vh] font-semibold'>
                <p>No Views Yet .</p>
            </div>
            </div>
    </div>
  )
}

export default Progress
