"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Assuming you're using next-auth for authentication

const TeacherFeedback = () => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState({});

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await axios.post(
            'https://learnospherebackend.singhbrothers.ltd/api/route/getTeacherByEmail',
            { gmail: session.user.email }
          );
          setProfileData(response.data);
          console.log('Profile data:', response.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name,
      subject,
      rating,
      message,
      gmail: profileData?.gmail || session.user.email, // Ensure email is populated
      mobileNumber: profileData?.mobileNumber || session.user.phone,   // Ensure phone is populated
    };

    console.log('Form Data:', formData);

    try {
      const response = await axios.post(
        'https://learnospherebackend.singhbrothers.ltd/api/route/teacherfeedbackform',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Form submitted successfully!');
        setName('');
        setSubject('');
        setRating('');
        setMessage('');
      } else {
        setErrors({ general: 'Failed to submit the form. Please try again.' });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'An error occurred while submitting the form.' });
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col mt-8 gap-2 border-orange-200 shadow-2xl rounded-lg border p-8 w-[55%] m-auto'
      >
        <h2 className='font-bold text-[1.2em] text-center'>Feedback Form</h2>

        <span className='flex flex-col gap-1 mt-4 '>
          <label
            htmlFor='name'
            className='block text-gray-700 text-[.9em] font-bold'
          >
            Name<b className='text-orange-600'>*</b>
          </label>
          <input
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Your Fullname'
            className='border border-orange-200 placeholder:text-[.9em] placeholder:text-gray-800 w-full rounded-md focus:outline-none p-2 focus:placeholder:text-blue-600 focus:border-blue-600'
          />
          {errors.name && (
            <p className='text-red-500 text-sm mb-4'>{errors.name}</p>
          )}
        </span>
        <span className='flex flex-col gap-1'>
          <label
            htmlFor='subject'
            className='block text-gray-700 text-[.9em] font-bold'
          >
            Subject<b className='text-orange-600'>*</b>
          </label>
          <input
            id='subject'
            name='subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder='Enter Your Class'
            className='border border-orange-200 placeholder:text-[.9em] placeholder:text-gray-800 w-full rounded-md focus:outline-none p-2 focus:placeholder:text-blue-600 focus:border-blue-600'
          />
          {errors.subject && (
            <p className='text-red-500 text-sm mb-4'>{errors.subject}</p>
          )}
        </span>

        <span className='flex flex-col gap-1'>
          <label
            htmlFor='rating'
            className='block text-gray-700 text-[.9em] font-bold'
          >
            Rating<b className='text-orange-600'>*</b>
          </label>
          <select
            id='rating'
            name='rating'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder='Enter Your Rating'
            className='border border-orange-200 placeholder:text-[.9em] placeholder:text-gray-800 w-full rounded-md focus:outline-none p-2 focus:placeholder:text-blue-600 focus:border-blue-600'
          >
            <option value=''>Rating Scale</option>
            <option value='1/5'>1/5</option>
            <option value='2/5'>2/5</option>
            <option value='3/5'>3/5</option>
            <option value='4/5'>4/5</option>
            <option value='5/5'>5/5</option>
          </select>
          {errors.rating && (
            <p className='text-red-500 text-sm mb-4'>{errors.rating}</p>
          )}
        </span>
        <span className='flex flex-col gap-1'>
          <label
            htmlFor='message'
            className='block text-gray-700 text-[.9em] font-bold'
          >
            Short Message<b className='text-orange-600'>*</b>
          </label>
          <textarea
            id='message'
            name='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter Your Short Message'
            className='border border-orange-200 placeholder:text-[.9em] placeholder:text-gray-800 w-full rounded-md focus:outline-none p-2 focus:placeholder:text-blue-600 focus:border-blue-600'
          />
          {errors.message && (
            <p className='text-red-500 text-sm mb-4'>{errors.message}</p>
          )}
        </span>
        <div className='flex flex-col items-center'>
          <button
            type='submit'
            className='font-bold text-white bg-orange-600 p-3 rounded-md w-40 mt-3 text-cneter'
          >
            Submit
          </button>
        </div>
        {errors.general && (
          <p className='text-red-500 text-sm mb-4'>{errors.general}</p>
        )}
        {success && (
          <p className='text-green-500 text-sm mb-4'>{success}</p>
        )}
      </form>
    </div>
  );
};

export default TeacherFeedback;
