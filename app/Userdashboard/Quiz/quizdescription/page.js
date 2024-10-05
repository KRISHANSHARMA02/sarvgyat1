import Link from 'next/link'
import React from 'react'

const Quizdescription = () => {
    return (
        <div>
            <div className='px-4 md:px-16 mt-8'>
                <h2 className='font-semibold text-[1em]'>Instructions</h2>
                <p className='border-b mt-4 border-gray-300 h-12'>Class-12th Physics Mock Test</p>
            </div>
            <div className='border-b border-gray-300 h-16'>
                <div className='px-4 md:px-16 mt-6 flex gap-3'>
                    <div className='flex flex-col gap-1  items-center'>
                        <p className=' text-center p-1 w-20 bg-blue-500 rounded-2xl'>5</p>
                        <p className='text-[.8em]'>Total Question</p>
                    </div>
                   
                    <div className='flex flex-col gap-1  items-center'>
                    <p className=' text-center p-1 w-20 bg-green-500 rounded-2xl'>5 minute</p>
                        <p className='text-[.8em]'>Duration</p>
                    </div>
                </div>
            </div>
            <div className='px-4 md:px-16 mt-4'>
            <h2 className='font-bold'>Please Read The Following Instruction Very Carefully</h2>
            </div>
            <div className='px-4 md:px-16 mt-4'>
            <ol className='flex flex-col list-decimal gap-2'>
            <li>You will have 5 minutes to complete the quiz.</li>
            <li>The quiz consists of 5 multiple-choice questions.</li>
            <li>You can only submit the quiz once. Make sure to review your answers carefully.</li>
            <li>There is no negative marking for incorrect answers.</li>
            <li>Ensure you click the "Submit" button before the timer runs out.</li>
            <li>You can navigate between questions using the "Next" and "Previous" buttons.</li>
            <li>Do not refresh or close the page while attempting the quiz.</li>
          
            </ol>
            </div>
            <div className='flex  justify-between'>
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
  <div className='px-10 md:px-40 mt-2 md:mt-5'>
  <Link href ='/Userdashboard/Quiz/questionpaper'>
  <button className='p-2 rounded-md mt-12  bg-orange-600 text-white font-bold'>Start Test</button>
  </Link>
  </div>
  </div>

        </div>
    )
}

export default Quizdescription
