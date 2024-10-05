"use client"
import React, { useContext, useState } from 'react';
import { FormContext } from '@/src/context/FormContext';
import messages from '@/src/utils/popupMessage'; // Import custom messages
import { useRouter } from 'next/navigation';

const Form7 = ({ onBack }) => {
  const { state, dispatch } = useContext(FormContext);
  const [baseRate, setBaseRate] = useState(state.baseRate || '');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,8}(\.\d{0,2})?$/.test(value)) {
      setBaseRate(value);
      dispatch({
        type: 'UPDATE_FORM_DATA',
        payload: { baseRate: value },
      });
    }
  };


   const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation logic for baseRate on submit
    if (!baseRate || isNaN(baseRate) || parseFloat(baseRate) <= 0 || parseFloat(baseRate) > 4000) {
      setError('Base rate should be less than or equal to ₹4000.');
      return;
    } else {
      setError(''); // Clear error if valid
    }

    try {
      const response = await fetch('https://learnospherebackend.singhbrothers.ltd/api/route/submitTeachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...state,
          baseRate,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessageType('success');
        setMessage(messages.success);
        router.push('/Teacherdashboard');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setMessageType('error');
      setMessage(messages.error);
    }
  };


  return (
    <div className="max-w-md mx-auto bg-[#fff] p-2 md:p-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Set your hourly base rate</h2>
      <p className="mb-4">
        To get more students to your profile, we recommend a base price of ₹500 per hour for new tutors in your subject and with your experience level.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="baseRate">
            Price in INR only
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-700">₹</span>
            <input
              type="text"
              id="baseRate"
              name="baseRate"
              value={baseRate}
              onChange={handleInputChange}
              style={{ outline: 'none', borderBottomWidth: '2px', borderBottomColor: '#3182ce' }}
              placeholder="Enter your hourly base rate"
              className="shadow appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 ">{error}</p>}
        </div>
        <div className="mb-6 text-gray-600 text-sm">
          Change your base rate in settings after approval.
        </div>
        {message && (
          <div className={`p-4 mb-4 text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form7;

