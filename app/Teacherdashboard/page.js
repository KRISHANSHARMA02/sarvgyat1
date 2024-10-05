"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import profile from "@/public/profile.png";

import { BiSolidVideos } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { FcStatistics } from "react-icons/fc";
import { GiSkills } from "react-icons/gi";
import { MdFeedback } from "react-icons/md";

import { HiMenu } from "react-icons/hi";
import Studentpanel from "./Studentpanel/page";
import Skillenhancement from "./Skillenhancement/page";

import Profileteacher from "./Profileteacher/page";
import ConceptVideos from "./ConceptVideos/page";
import Statisticsoverview from "./Statisticsoverview/page";
import Booking from "./Booking/page";
import Pdf from "./pdf/page";

import Progress from "./Progress/page";
import { TbBrandBooking } from "react-icons/tb";

import Wallet from "./wallet/page";
import { TbWallet } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";

import Feedbackform from "./teacherfeedbackform/page";

import Notification from "./Notificationfile/page";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserTie } from "react-icons/fa";
import axios from "axios";
import { MdVerified } from "react-icons/md";

export default function Layout({ children }) {
  const [availablePage, setAvailablePage] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const ProfileClick = () => setAvailablePage("profile");
  const bookingClick = () => setAvailablePage("booking");

  const walletClick = () => setAvailablePage("wallet");
  const progressClick = () => setAvailablePage("progress");
  const statisticsoverviewClick = () => setAvailablePage("statisticsoverview");
  const conceptvideoClick = () => setAvailablePage("conceptvideo");
  const studentpanelClick = () => setAvailablePage("studentpanel");
  const notificationClick = () => setAvailablePage("notification");
  const skillenhancementClick = () => setAvailablePage("skillenhancement");
  const pdfClick = () => setAvailablePage("pdf");

  const feedbackClick = () => setAvailablePage("feedback");

  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/Signin"); // Redirect to the sign-in page
    }
  }, [session, status, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/Signin" }); // Redirect to sign-in page after logout
  };

  const teacher = {
    name: session?.user?.name || "Teacher Name",
    src: session?.user?.image || profile,
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.singhbrothers.ltd/api/route/getTeacherByEmail",
            { gmail: session.user.email } // make sure you are sending the email correctly
          );

          setProfileData(response.data.data); // set profile data from response
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session, status]);

  return (
    <>
      <div className="relative flex w-full">
        <div
          className={`absolute md:static bg-white border-r-2 border-gray-300  pr-4 md:h-screen z-40 w-3/4 md:w-auto h-full transition-transform transform md:translate-x-0 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="ml-5 mt-5 flex justify-between items-center md:block">
            <Link href="/" className="text-2xl font-bold">
              Learn<b className="text-orange-600">O</b>sphere.in
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="mt-5 ml-5 flex flex-col w-full h-full ">
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "profile"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={ProfileClick}
            >
              <FaUserTie size={20} />
              <button className="pl-2 font-semibold">Profile</button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "booking"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={bookingClick}
            >
              <TbBrandBooking size={20} />
              <button className="pl-2 font-semibold">Booking</button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "wallet"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={walletClick}
            >
              <TbWallet size={20} />
              <button className="pl-2 font-semibold">Wallet</button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "conceptvideo"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={conceptvideoClick}
            >
              <BiSolidVideos size={20} />
              <button className="pl-2 font-semibold">Concept Videos</button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "statisticsoverview"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={statisticsoverviewClick}
            >
              <FcStatistics size={20} />
              <button className="pl-2 font-semibold">
                Statistics Overview
              </button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "studentpanel"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={studentpanelClick}
            >
              <PiStudentFill size={20} />
              <button className="pl-2 font-semibold">Student Panel</button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "skillenhancement"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={skillenhancementClick}
            >
              <GiSkills size={20} />
              <button className="pl-2 font-semibold">Skill Enhancement</button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "progress"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={progressClick}
            >
              <TbWallet size={20} />
              <button className="pl-2 font-semibold">Progress</button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "pdf"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={pdfClick}
            >
              <TbWallet size={20} />
              <button className="pl-2 font-semibold">Pdf Management</button>
            </div>
            <div
              className={`mt-3 p-2 mr-4 flex items-center ${
                availablePage === "feedback"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-500 hover:text-white"
              } rounded-md cursor-pointer`}
              onClick={feedbackClick}
            >
              <MdFeedback size={20} />
              <button className="pl-2 font-semibold">Feedback Form</button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div
            classname="fixed inset-0 bg-black opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        <div className="w-full">
          <div className="border-b-2">
            <nav className="bg-white p-4 flex justify-end items-center">
              <div className="flex items-center w-full justify-between md:justify-end">
                {teacher && !isInputVisible && (
                  <div className="flex  gap-4 items-center">
                    <div>
                      <IoIosNotifications
                        onClick={notificationClick}
                        className="text-orange-600"
                        size={30}
                      />
                    </div>
                    <div
                      onClick={ProfileClick}
                      className="flex items-center mr-4 relative gap-4"
                    >
                      {/* Dynamic border based on approval status */}
                      <div
                        className={`rounded-full border-2 ${
                          profileData?.is_approved
                            ? "border-green-500"
                            : "border-red-600"
                        } mr-2 overflow-hidden`} // Added overflow-hidden to contain the image within the border
                      >
                        <Image
                          width={100}
                          height={100}
                          src={teacher.src}
                          alt={teacher.name}
                          className="w-10 h-10 rounded-full"
                        />
                       
                       {/* Status Badge */}
                       <span
                       
                       
                      >
                        {profileData?.is_approved ? <MdVerified size={25} className="absolute top-0 right-36 p-1 bg-white text-green-500 rounded-full"/> : <p className="absolute top-8 right-16 bg-white text-red-500 px-1 py-1 rounded-full text-[10px] font-semibold shadow">Pending..</p>}
                      </span>
                      </div>

                      
                      {/* Teacher name */}
                      <span className="text-black font-semibold mr-2">
                        {teacher.name}
                      </span>

                    </div>
                  </div>
                )}

                {isInputVisible && (
                  <button
                    className="md:hidden p-2 ml-4 "
                    onClick={() => setIsInputVisible(true)}
                  >
                    &times;
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className={`bg-orange-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-500 ${
                    isInputVisible ? "hidden" : "block"
                  }`}
                >
                  Logout
                </button>
              </div>
              <button
                className={`md:hidden p-2 ml-4 ${
                  isInputVisible ? "hidden" : "block"
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <HiMenu size={24} />
              </button>
            </nav>
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "profile" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Profileteacher />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "booking" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Booking />
          </div>

          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "wallet" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Wallet />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "progress" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Progress />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "conceptvideo" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <ConceptVideos />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "statisticsoverview" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Statisticsoverview />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "skillenhancement" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Skillenhancement />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "studentpanel" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Studentpanel />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "notification" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Notification />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "pdf" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Pdf />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              availablePage === "feedback" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Feedbackform />
          </div>
        </div>
      </div>
    </>
  );
}
