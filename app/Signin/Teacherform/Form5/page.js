"use client";
import React, { useContext } from 'react';
import { FormContext } from '@/src/context/FormContext';

const Form5 = ({ onContinue, onBack }) => {
  const { state, dispatch } = useContext(FormContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FORM_DATA', payload: { [name]: value } });
  };

  const yearOptions = Array.from({ length: 46 }, (_, i) => {
    const year = 1980 + i;
    return <option key={year} value={year}>{year}</option>;
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 md:p-8 shadow-xl">
      <div className='flex items-center justify-between'> 
      <h1 className="text-2xl font-bold mb-4 text-start">Experience Details</h1>
      <button
          type="button"
          onClick={onContinue} // Trigger the same function as Save and Continue
          className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded font-Poppins"
        >
          Skip
        </button>

      </div>
      <p className="my-4 mb-8 text-start">Add your work experience.</p>
      <form>
        <div className="relative mb-5">
          <input
            type="text"
            name="subjectsTaught"
            value={state.subjectsTaught || ''}
            onChange={handleChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            placeholder=" "
            style={{ outline: 'none', borderBottomWidth: '2px', borderBottomColor: '#3182ce' }}
          />
          <label htmlFor="subjectsTaught" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Subjects Taught
          </label>
        </div>

        <div className="relative mb-5">
          <input
            type="text"
            name="classesTaught"
            value={state.classesTaught || ''}
            onChange={handleChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            placeholder=" "
            style={{ outline: 'none', borderBottomWidth: '2px', borderBottomColor: '#3182ce' }}
          />
          <label htmlFor="classesTaught" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Classes Taught
          </label>
        </div>

        <div className="relative mb-5">
          <select
            name="yearsOfExperience"
            value={state.yearsOfExperience || ''}
            onChange={handleChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            style={{ outline: 'none', borderBottomWidth: '2px', borderBottomColor: '#3182ce' }}
          >
            <option value="">Select Years of Experience</option>
            {Array.from({ length: 40 }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1} {i + 1 === 1 ? 'Year' : 'Years'}</option>
            ))}
          </select>
          <label htmlFor="yearsOfExperience" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            Years of Experience
          </label>
        </div>

        <div className="relative mb-5">
          <select
            name="fromYear"
            value={state.fromYear || ''}
            onChange={handleChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            style={{ outline: 'none', borderBottomWidth: '2px', borderBottomColor: '#3182ce' }}
          >
            <option value="">From Year</option>
            {yearOptions}
          </select>
          <label htmlFor="fromYear" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            From
          </label>
        </div>

        <div className="relative mb-5">
          <select
            name="toYear"
            value={state.toYear || ''}
            onChange={handleChange}
            className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
            style={{ outline: 'none', borderBottomWidth: '2px', borderBottomColor: '#3182ce' }}
          >
            <option value="">To Year</option>
            {yearOptions}
          </select>
          <label htmlFor="toYear" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
            To
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form5;

