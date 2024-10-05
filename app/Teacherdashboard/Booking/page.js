"use client";
import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("My Class");

  const handleMonthChange = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedDate(null); // Reset selected date when changing tabs
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const generateCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null); // Empty days for alignment
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getTodayClass = (day) => {
    const today = new Date();
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return today.toDateString() === dayDate.toDateString()
      ? "bg-blue-500 text-white"
      : "";
  };

  const MyClass = () => (
    <div className="flex flex-col items-center w-full bg-orange-100 p-2">
      <h2>My Class Details</h2>
      {/* Display specific details or events related to "My Class" */}
    </div>
  );

  const Request = () => (
    <div className="flex flex-col items-center bg-orange-100 w-full p-2">
      <h2>Request Details</h2>
      {/* Display specific details or events related to "Request" */}
    </div>
  );

  const MyBookings = () => (
    <div className="flex flex-col w-full items-center bg-orange-100 p-2">
      <h2>My Bookings Details</h2>
      {/* Display specific details or events related to "My Bookings" */}
    </div>
  );

  const MyLearners = () => (
    <div className="flex flex-col w-full items-center bg-orange-100 p-2">
      <h2>My Learners Details</h2>
      {/* Display specific details or events related to "My Learners" */}
    </div>
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-2 mt-10 mb-10">
          <p
            className={`cursor-pointer p-2 text-[.6em] md:text-[.8em] rounded-full ${
              activeTab === "My Class"
                ? "bg-orange-500 text-white"
                : "text-black"
            }`}
            onClick={() => handleTabChange("My Class")}
          >
            My Class
          </p>
          <p
            className={`cursor-pointer p-2 text-[.6em] md:text-[.8em] rounded-full ${
              activeTab === "Request"
                ? "bg-orange-500 text-white"
                : "text-black"
            }`}
            onClick={() => handleTabChange("Request")}
          >
            Request
          </p>
          <p
            className={`cursor-pointer p-2 text-[.6em] md:text-[.8em] rounded-full ${
              activeTab === "My Bookings"
                ? "bg-orange-500 text-white"
                : "text-black"
            }`}
            onClick={() => handleTabChange("My Bookings")}
          >
            My Bookings
          </p>
          <p
            className={`cursor-pointer p-2 text-[.6em] md:text-[.8em] rounded-full ${
              activeTab === "My Learners"
                ? "bg-orange-500 text-white"
                : "text-black"
            }`}
            onClick={() => handleTabChange("My Learners")}
          >
            My Learners
          </p>
        </div>
        <div
          className={`transition-all duration-300 ${
            selectedDate ? "w-full md:w-1/2" : "w-full"
          }`}
        >
          {activeTab === "My Class" && <MyClass />}
          {activeTab === "Request" && <Request />}
          {activeTab === "My Bookings" && <MyBookings />}
          {activeTab === "My Learners" && <MyLearners />}
        </div>
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={() => handleMonthChange(-1)}
            >
              {"<"}
            </button>
            <h1 className="text-xl font-semibold">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h1>
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={() => handleMonthChange(1)}
            >
              {">"}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-200">🔍</button>
            <button className="p-2 rounded-full hover:bg-gray-200">⚙️</button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row flex-grow">
          {/* Sidebar */}
          <aside className="w-80 xl:h-[50vh] 2xl:h-[35vh] bg-orange-200 p-4 border-r overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Calendar</h2>
            </div>
            <div className="mt-4">
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day, index) => (
                    <div key={index} className="text-center font-semibold">
                      {day}
                    </div>
                  )
                )}
                {generateCalendar().map((day, index) => (
                  <div
                    key={index}
                    className={`text-center p-2 ${
                      day ? "hover:bg-gray-200 cursor-pointer" : ""
                    } ${getTodayClass(day)}`}
                    onClick={() =>
                      day &&
                      handleDateClick(
                        `${day}/${
                          currentDate.getMonth() + 1
                        }/${currentDate.getFullYear()}`
                      )
                    }
                  >
                    {day || ""}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Calendar View */}
          <main className="flex-grow xl:h-[50vh] bg-white p-4 overflow-auto scroll-smooth scrollbar-hidden">
            {selectedDate ? (
              <div className="border-t border-orange-500">
                <h2 className="text-lg font-semibold">
                  Details for {selectedDate}
                </h2>
                {/* Time slots */}
                {[...Array(24).keys()].map((hour) => (
                  <div key={hour} className="h-12 border-b border-red-200">
                    <span className="text-sm text-black">{`${hour % 12 || 12} ${
                      hour < 12 ? "AM" : "PM"
                    }`}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Select a date to see details.</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Calendar;
