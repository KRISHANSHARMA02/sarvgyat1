"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import profileimg from "@/public/profile.png";
import { CgProfile } from "react-icons/cg";
import { MdOutlineWatchLater } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBookOpen } from "react-icons/fa";
import { TbUserQuestion } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import Profileuser from "./profileuser/page";
import Classess from "./classess/page";
import Practicequestion from "./Practicequestion/page";
import Chaptertest from "./chaptertest/page";
import Askquestion from "./Askquestion.js/page";
import Bookmark from "./Bookmark/page";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { VscFeedback } from "react-icons/vsc";

import Conceptvideo from "./Conceptvideo/page";
import Availableteacher from "./Availableteacher/page";
import { MdFitScreen } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import Quiz from "./Quiz/page";

import Quizdescription from "./Quiz/quizdescription/page";
import Feedback from "./Feedback Form/page";

export default function Layout() {
  const [activePage, setActivePage] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const askQuestionRef = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to logout if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/Student");
    }
  }, [session, status, router]);

  // Function to handle focusing on "Ask a Question"
  const handleFocusAskQuestion = () => {
    if (askQuestionRef.current) {
      setTimeout(() => {
        askQuestionRef.current.focus();
      }, 100); // Delay to ensure the state update has occurred
    }
  };

  // Page handling functions
  const profileClick = () => setActivePage("profile");
  const studentClick = () => setActivePage("student");
  const testClick = () => setActivePage("test");
  const questionClick = () => setActivePage("question");
  const quizClick = () => setActivePage("quiz");
  const bookmarkClick = () => setActivePage("bookmark");
  const videoClick = () => setActivePage("video");
  const teacherClick = () => setActivePage("teacher");
  const question1Click = () => {
    handleFocusAskQuestion(); // Focus on "Ask a Question" input field
  };
  const feedbackClick = () => setActivePage("feedback");

  const handleLogout = async () => {
    // Sign out from the user session
    await signOut({ redirect: false });
    router.push("/Student");
  };

  const user = {
    name: session?.user?.name || "Student Name",
    src: profileimg,
  };

  return (
    <>
      <div className="relative flex w-full">
        {/* Sidebar and overlay */}
        <div
          className={`absolute md:static bg-white z-40 w-3/4 pr-4 md:w-auto h-full md:h-screen border-r-2 border-r-gray-300 transition-transform transform md:translate-x-0 ${
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
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={profileClick}
            >
              <CgProfile size={20} />
              <button className="flex pl-2 font-semibold">Profile</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={studentClick}
            >
              <SiGoogleclassroom size={20} />
              <button className="pl-2 font-semibold">Learnosphere Class</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={questionClick}
            >
              <MdOutlineWatchLater size={20} />
              <button className="pl-2 font-semibold">Practice Question</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={testClick}
            >
              <FaBookOpen size={20} />
              <button className="pl-2 font-semibold">Study Material</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={question1Click}
            >
              <TbUserQuestion size={20} />
              <button className="pl-2 font-semibold">Ask a Question</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={videoClick}
            >
              <MdFitScreen size={20} />
              <button className="pl-2 font-semibold">Concept Videos</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={bookmarkClick}
            >
              <FaRegBookmark size={20} />
              <button className="pl-2 font-semibold">Bookmark</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={teacherClick}
            >
              <GiTeacher size={20} />
              <button className="pl-2 font-semibold">Available Teacher</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={quizClick}
            >
              <GiTeacher size={20} />
              <button className="pl-2 font-semibold">Quizes</button>
            </div>
            <div
              className="mt-3 p-2 mr-4 flex items-center hover:bg-orange-500 hover:text-white rounded-md cursor-pointer"
              onClick={feedbackClick}
            >
              <VscFeedback size={20} />
              <button className="pl-2 font-semibold">Feedback Form</button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="w-full">
          <div className="border-b-2">
            <nav className="bg-white p-4 flex justify-end items-center">
              <div className="flex items-center w-full justify-between md:justify-end">
                {user && !isInputVisible && (
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <Image
                        width={100}
                        height={100}
                        src={user.src}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <span className="text-black font-semibold mr-2">
                        {user.name}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex items-center px-4">
                  {/* Input field with ref */}
                  <input
                    ref={askQuestionRef} // Attach ref to the "Ask a Question" input field
                    className={`text-gray-300 border border-gray-300 p-2 bg-white rounded-lg ${
                      isInputVisible ? "block" : "hidden"
                    } md:block`}
                    id="question"
                    name="question"
                    placeholder="Ask a Question"
                  />
                  <FaSearch
                    size={24}
                    className={`md:hidden cursor-pointer ${
                      isInputVisible ? "hidden" : "block"
                    }`}
                    onClick={() => setIsInputVisible(true)}
                  />
                </div>
                {isInputVisible && (
                  <button
                    className="md:hidden p-2 ml-4"
                    onClick={() => setIsInputVisible(false)}
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

          {/* Render the active page */}
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "profile" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Profileuser />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "student" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Classess />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "question" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Practicequestion />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "test" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Chaptertest />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "askQuestion" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Askquestion />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "video" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Conceptvideo />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "bookmark" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Bookmark />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "teacher" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Availableteacher />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "quiz" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Quiz />
          </div>
          <div
            className={`w-full md:w-[75vw] ${
              activePage === "feedback" ? "block" : "hidden"
            } p-3 mt-12`}
          >
            <Feedback />
          </div>
        </div>
      </div>
    </>
  );
}
