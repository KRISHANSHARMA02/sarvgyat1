"use client";
import React, { useState, useContext, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FormContext } from "@/src/context/FormContext";


const Form6 = ({ onContinue, onBack }) => {
  const { state, dispatch } = useContext(FormContext);
  const [availability, setAvailability] = useState(
    state.availability || {
      Monday: [{ from: "00:00", to: "00:00" }],
      Tuesday: [{ from: "00:00", to: "00:00" }],
      Wednesday: [{ from: "00:00", to: "00:00" }],
      Thursday: [{ from: "00:00", to: "00:00" }],
      Friday: [{ from: "00:00", to: "00:00" }],
      Saturday: [{ from: "00:00", to: "00:00" }],
      Sunday: [{ from: "00:00", to: "00:00" }],
    }
  );

  const [hiddenDays, setHiddenDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  useEffect(() => {
    if (state.availability) {
      setAvailability(state.availability);
    }
  }, [state.availability]);

  const handleTimeChange = (day, index, key, value) => {
    const newAvailability = { ...availability };
    newAvailability[day][index][key] = value;
    setAvailability(newAvailability);
  };

  const handleAddSlot = (day) => {
    const newAvailability = { ...availability };
    newAvailability[day].push({ from: "", to: "", isNew: true });
    setAvailability(newAvailability);
  };

  const handleDeleteSlot = (day, index) => {
    const newAvailability = { ...availability };
    newAvailability[day].splice(index, 1);
    setAvailability(newAvailability);
  };

  const handleToggleDay = (day) => {
    const newHiddenDays = { ...hiddenDays };
    newHiddenDays[day] = !newHiddenDays[day];
    setHiddenDays(newHiddenDays);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Make sure any empty `from` or `to` fields are set to "00:00"
    const updatedAvailability = Object.keys(availability).reduce((acc, day) => {
      acc[day] = availability[day].map((slot) => ({
        from: slot.from || "00:00", // Default to "00:00" if no value is set
        to: slot.to || "00:00",     // Default to "00:00" if no value is set
      }));
      return acc;
    }, {});
  
    console.log("Form data being dispatched:", updatedAvailability); // Debugging line
  
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { availability: updatedAvailability },
    });
    onContinue();
  };

  return (
    <div>
      <div className=" max-w-[50vw] mx-auto bg-[#fff] p-6 md:p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-start">Availability</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h1 className="block text-lg font-medium text-black text-start mb-2">
              Set your availability
            </h1>
            <p className="text-sm text-gray-600 mb-4 text-start">
              Availability shows your potential working hours. Students can book
              lessons at these times. Add peak hours to get more students.
            </p>
          </div>
          {Object.keys(availability).map((day) => (
            <div key={day} className="mb-6">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="day"
                  checked={!hiddenDays[day]}
                  onChange={() => handleToggleDay(day)}
                  className="mr-2 h-5 w-5 border-2 cursor-pointer"
                />
                <label className="block text-lg font-medium text-gray-700">
                  {day}
                </label>
              </div>
              {!hiddenDays[day] && (
                <div>
                  {availability[day].map((slot, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center mb-2">
                      <label className="block text-lg font-medium text-gray-900 mr-2 p-2 sm:mb-0 mb-2 sm:mr-4">
                        From
                      </label>
                      <input
                        type="time"
                        name="start_time"
                        value={slot.from}
                        onChange={(e) =>
                          handleTimeChange(day, index, "from", e.target.value)
                        }
                        className="border-2 border-gray-400 focus:border-black rounded-md shadow-sm focus:ring-blue-500 mb-2 sm:mb-0 p-3 px-6 sm:mr-4 "
                      />
                      <label className="block text-lg font-medium  text-gray-900 mr-2 p-2 sm:mb-0 mb-2 sm:mr-4">
                        To
                      </label>
                      <input
                        type="time"
                        name="end_time"
                        value={slot.to}
                        onChange={(e) =>
                          handleTimeChange(day, index, "to", e.target.value)
                        }
                        className="border-2 border-gray-400 p-3 px-6 rounded-md shadow-sm focus:ring-blue-500 focus:border-black mb-2 sm:mb-0 sm:mr-4 "
                      />
                      {slot.isNew && (
                        <button
                          type="button"
                          onClick={() => handleDeleteSlot(day, index)}
                          className="text-red-700 ml-2"
                        >
                          <AiOutlineDelete size={30} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddSlot(day)}
                    className="text-black font-bold underline my-3"
                  >
                    Add another time slot
                  </button>
                </div>
              )}
            </div>
          ))}
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
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form6;

