"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { MdKeyboardArrowRight, MdCheckBox } from "react-icons/md";
import userimg from "@/public/User.svg";
import Form1 from "./Form1/page";
import Form2 from "./Form2/page";
import Form3 from "./Form3/page";
import Form4 from "./Form4/page";
import Form5 from "./Form5/page";
import Form6 from "./Form6/page";
import Form7 from "./Form7/page";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormContext } from "@/src/context/FormContext";

const Layout = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { state: formData, dispatch } = useContext(FormContext);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/Signin");
    } else {
      // Set form data with user info
      const { name, email, image } = session.user;

      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: {
          name,
          email,
          profileImage: image,
        },
      });
    }
  }, [session, status, router, dispatch]);

  const handleFormSwitch = (formId) => {
    setCurrentForm(formId);
  };

  const handleFormDataChange = (newData) => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: newData,
    });
  };

  const handleBack = () => {
    setCurrentForm((prevForm) => (prevForm > 1 ? prevForm - 1 : prevForm));
  };

  const steps = [
    {
      id: 1,
      title: "About",
      status: currentForm > 1 ? "completed" : "current",
      icon:
        currentForm > 1 ? (
          <MdCheckBox size={25} className="text-orange-600" />
        ) : (
          <MdKeyboardArrowRight />
        ),
    },
    {
      id: 2,
      title: "Photo",
      status: currentForm > 2 ? "completed" : "current",
      icon:
        currentForm > 2 ? (
          <MdCheckBox size={25} className="text-orange-600" />
        ) : (
          <MdKeyboardArrowRight />
        ),
    },
    {
      id: 3,
      title: "Education",
      status: currentForm > 3 ? "completed" : "current",
      icon:
        currentForm > 3 ? (
          <MdCheckBox size={25} className="text-orange-600" />
        ) : (
          <MdKeyboardArrowRight />
        ),
    },
    {
      id: 4,
      title: "Certification",
      status: currentForm > 4 ? "completed" : "current",
      icon:
        currentForm > 4 ? (
          <MdCheckBox size={25} className="text-orange-600" />
        ) : (
          <MdKeyboardArrowRight />
        ),
    },
    {
      id: 5,
      title: "Experience",
      status: currentForm > 5 ? "completed" : "current",
      icon:
        currentForm > 5 ? (
          <MdCheckBox size={25} className="text-orange-600" />
        ) : (
          <MdKeyboardArrowRight />
        ),
    },
    {
      id: 6,
      title: "Availability",
      status: currentForm > 6 ? "completed" : "current",
      icon:
        currentForm > 6 ? (
          <MdCheckBox size={25} className="text-orange-600" />
        ) : (
          <MdKeyboardArrowRight />
        ),
    },
    {
      id: 7,
      title: "Pricing",
      status: currentForm > 7 ? "completed" : "current",
      icon:
        currentForm > 7 ? (
          <MdCheckBox size={25} className="text-orange-600" />
        ) : (
          <MdKeyboardArrowRight />
        ),
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    // Clear form data in context
    dispatch({ type: "RESET_FORM_DATA" });
    // Sign out the user and redirect to sign-in page
    await signOut({ redirect: false });
    router.push("/Signin");
  };

  if (status === "loading") {
    return <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
    <div
      className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        className="w-16 h-16 border-4 border-transparent text-orange-600 text-2xl animate-spin flex items-center justify-center border-t-orange-600 rounded-full"
      ></div>
    </div>
  </div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex">
          <Link
            className="text-black text-[1rem] md:text-2xl font-Poppins font-bold"
            href="/"
          >
            Learn<b className="text-orange-600 font-Poppins text-2xl">O</b>
            sphere.in
          </Link>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <Image
              src={formData.profileImage || userimg}
              height={50}
              width={50}
              alt={formData.name}
              className="h-10 w-10 rounded-full border-2 border-gray-300 cursor-pointer"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="flex bg-slate-100 shadow-md gap-1 md:gap-2 items-center justify-center p-0 md:p-2 px-0 md:px-2 my-0 md:my-4 rounded-md">
        {steps.map((step) => (
          <div
            key={step.id}
            className="p-[6px] md:p-3 mt-4 md:mt-0 mb-4 md:mb-0 flex flex-row items-center gap-0 md:gap-3 cursor-pointer"
            // onClick={() => handleFormSwitch(step.id)}
          >
            <p className="text-sm sm:text-base font-bold text-gray-700">
              {step.id}
            </p>
            <p className="hidden sm:block text-sm sm:text-base text-gray-700">
              {step.title}
            </p>
            <p>{step.icon}</p>
          </div>
        ))}
      </div>

      <div className="flex-grow flex justify-center">
        <div className="w-full max-w-2xl p-3 mx-4 rounded-md">
          {currentForm === 1 && (
            <Form1
              formData={formData}
              onDataChange={handleFormDataChange}
              onContinue={() => handleFormSwitch(2)}
            />
          )}
          {currentForm === 2 && (
            <Form2
              formData={formData}
              onDataChange={handleFormDataChange}
              onContinue={() => handleFormSwitch(3)}
              onBack={handleBack}
            />
          )}
          {currentForm === 3 && (
            <Form3
              formData={formData}
              onDataChange={handleFormDataChange}
              onContinue={() => handleFormSwitch(4)}
              onBack={handleBack}
            />
          )}
          {currentForm === 4 && (
            <Form4
              formData={formData}
              onDataChange={handleFormDataChange}
              onContinue={() => handleFormSwitch(5)}
              onBack={handleBack}
            />
          )}
          {currentForm === 5 && (
            <Form5
              formData={formData}
              onDataChange={handleFormDataChange}
              onContinue={() => handleFormSwitch(6)}
              onBack={handleBack}
            />
          )}
     
          {currentForm === 6 && (
            <Form6
              formData={formData}
              onDataChange={handleFormDataChange}
              onContinue={() => handleFormSwitch(7)}
              onBack={handleBack}
            />
          )}
          {currentForm === 7 && (
            <Form7 formData={formData} onDataChange={handleFormDataChange} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;

