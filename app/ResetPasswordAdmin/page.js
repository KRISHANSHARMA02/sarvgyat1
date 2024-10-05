"use client";
import React, { useState, useEffect } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const ResetPasswordAdmin = () => {
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setToken(urlParams.get('token'));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmpassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }
    if (!token) {
      setError('Reset token is missing');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/route/resetpasswordadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newpassword }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Your password has been reset',
          icon: 'success',
        });
        setSuccess('Your password has been reset');
        setError('');
        router.push('/');
      } else {
        if (Array.isArray(data.errors)) {
          const errorMessage = data.errors.map((err) => err.msg).join(', ');
          setError(errorMessage);
        } else {
          setError('An error occurred');
        }
        setSuccess('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to reset password');
      setSuccess('');
    }
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const backgroundImageStyle = {
    backgroundImage: `url(/background.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-orange-300 pb-8 pt-8 h-screen" style={backgroundImageStyle}>
      <h2 className="font-bold flex justify-center items-center text-2xl sm:text-3xl lg:text-4xl mt-28">
        Learn<b className="text-orange-500">O</b>sphere Admin
      </h2>
      <form onSubmit={handleSubmit}>
  <div className="flex flex-col gap-4 bg-orange-200 mt-6 p-8 sm:p-12 md:p-16 w-full sm:w-3/4 md:w-[60vw] lg:w-[30vw] m-auto rounded-md justify-center">
    <p className="font-bold text-lg sm:text-xl lg:text-2xl text-center">Reset Password</p>
    
    <div className="relative w-full">
      <label htmlFor="newpassword" className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
        New Password
      </label>
      <input 
        onChange={(e) => setNewPassword(e.target.value)} 
        className="p-2 rounded-md placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg w-full placeholder:text-gray-400 border border-gray-300" 
        id="newpassword" 
        type={showNewPassword ? 'text' : 'password'} 
        name="newpassword" 
        placeholder="Enter your new password" 
      />
      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-9 sm:top-10 md:top-12 text-gray-400">
        {showNewPassword ? <HiMiniEyeSlash size={18} /> : <IoEyeSharp size={18} />}
      </button>
    </div>
    
    <div className="relative w-full mt-4">
      <label htmlFor="confirmpassword" className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
        Confirm Password
      </label>
      <input 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        className="p-2 rounded-md placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg w-full placeholder:text-gray-400 border border-gray-300" 
        id="confirmpassword" 
        name="confirmpassword" 
        type={showConfirmPassword ? 'text' : 'password'} 
        placeholder="Confirm your new password" 
      />
      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-9 sm:top-10 md:top-12 text-gray-400">
        {showConfirmPassword ? <HiMiniEyeSlash size={18} /> : <IoEyeSharp size={18} />}
      </button>
    </div>
    
    <button type="submit" className="bg-orange-500 p-2 rounded-md transition-all ease-in-out duration-200 hover:bg-orange-600 text-white font-bold text-sm sm:text-base lg:text-lg mt-4">
      Reset Password
    </button>
    
    {error && (
      <div className="mt-4 text-red-500 text-xs sm:text-sm lg:text-base">
        {error}
      </div>
    )}
    
    {success && (
      <div className="mt-4 text-green-500 text-xs sm:text-sm lg:text-base">
        {success}
      </div>
    )}
  </div>
</form>
    </div>
  );
};

export default ResetPasswordAdmin;
