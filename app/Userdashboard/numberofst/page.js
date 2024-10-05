'use client';
import React, { useState } from 'react';

const Numberofst = ({ teacher, students = [] , totalStudents, newStudents }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h1 className="text-2xl font-semibold">{teacher && teacher.name ? teacher.name : 'Teacher Name Not Available'}</h1>
        <p className="text-gray-600">Welcome to your student dashboard. Here you can manage your students and track your progress.</p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-2xl">{totalStudents}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">New Students This Month</h2>
          <p className="text-2xl">{newStudents}</p>
        </div>
      </div>

      {/* Search/Filter Section */}
      <div className="bg-white shadow p-4 rounded-lg my-4">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Student List Section */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Students</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="w-1/4 p-4">Name</th>
                <th className="w-1/4 p-4">Class</th>
                <th className="w-1/4 p-4">Subject</th>
                <th className="w-1/4 p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index} className="text-center">
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.class}</td>
                  <td className="p-4">{student.subject}</td>
                  <td className="p-4">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Numberofst;