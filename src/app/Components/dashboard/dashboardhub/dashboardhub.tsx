"use client"
import { FaTimes } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Mail } from "lucide-react";
import TodoList from "../dashboardhubcomponent/todolist";
import UserProject from "../dashboardhubcomponent/userproject";
import Message from "../dashboardhubcomponent/message";
import { useState } from "react";
import Transactionworldwide from "../dashboardhubcomponent/transactionworldwide";

const DashboardHub = () => {
  // Initialize sidebar as collapsed (false) by default
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [usertoggle, setUserToggle] = useState(false);
  const [todotoggle, setTodoToggle] = useState(false);
  const [transtoggle, setTransToggle] = useState(false);

  // State for showing/hiding cards
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);
  const [showCard3, setShowCard3] = useState(true);
  const [showCard4, setShowCard4] = useState(true);

  // Handle deletion of cards
  const handleDeleteCard = (cardId: string) => {
    switch (cardId) {
      case "card1":
        setShowCard1(false);
        break;
      case "card2":
        setShowCard2(false);
        break;
      case "card3":
        setShowCard3(false);
        break;
      case "card4":
        setShowCard4(false);
        break;
      default:
        break;
    }
  };
  return (
    <main className="">
      <div className="w-full flex-1 mt-8  flex-col flex gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/*  Messages */}
          {showCard1 && (
            <div className="relative bg-white">
              <div className=" row-span-2 border-gray-300 border-1">
                <div className="p-4 flex justify-between place-items-center">
                  <span>
                    <h1 className="text-md font-bold text-slate-700 ">
                      Messages
                    </h1>
                  </span>
                  <span className="flex justify-between gap-2">
                    {/* Toggle Button */}
                    <button onClick={() => setToggle(!toggle)}>
                      {toggle ? (
                        <FaChevronDown className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
                      ) : (
                        <FaChevronUp className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
                      )}
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click from propagating to parent
                        handleDeleteCard("card1");
                      }}
                    >
                      <FaTimes className="w-4 h-4 text-red-600 hover:text-gray-500 cursor-pointer" />
                    </button>
                  </span>
                </div>
                <span className="">
                  <hr className="border-gray-300" />
                </span>
                {/* message toggle*/}
                <div className={`${!toggle ? "hidden" : "block"}`}>
                  <div className=" bg-red-100 p-2 ">
                    <div className="p-4 flex gap-4 place-items-center">
                      <span>
                        <Mail className="w-8 h-8 text-green-600 hover:text-gray-500 cursor-pointer" />
                      </span>
                      <span>
                        <h1 className="text-3xl text-slate-700 ">
                          New messages
                        </h1>
                      </span>
                    </div>
                    <div className=" mx-auto place-items-center">
                      <p className="flex text-center  text-[13px] flex-1 text-slate-700">
                        You have 22 new messages and 16 waiting in draft folder.
                      </p>
                    </div>
                  </div>
                  {/* list of message */}
                  <Message />
                </div>
              </div>
            </div>
          )}
          {/*  User project list */}
          {showCard2 && (
            <div className="bg-white">
              <div className="border-gray-300 border-1">
                <div className="p-4 flex justify-between place-items-center">
                  <span>
                    <h1 className="text-md font-bold text-slate-700 ">
                      User project list
                    </h1>
                  </span>
                  <span className="flex justify-between gap-2">
                    <button onClick={() => setUserToggle(!usertoggle)}>
                      {usertoggle ? (
                        <FaChevronDown className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
                      ) : (
                        <FaChevronUp className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard("card2");
                      }}
                    >
                      <FaTimes className="w-4 h-4 text-red-600 hover:text-gray-500 cursor-pointer" />
                    </button>
                  </span>
                </div>
                <div className={`${!usertoggle ? "hidden" : "block"} `}>
                  <span className="">
                    <hr className="border-gray-300" />
                  </span>
                  <UserProject />
                </div>
              </div>
            </div>
          )}
          {/*  Small todo list */}
          {showCard3 && (
            <div className="bg-white">
              <div className="border-gray-300 border-1">
                <div className="p-4 flex justify-between place-items-center">
                  <span>
                    <h1 className="text-md font-bold text-slate-700 ">
                      Small todo list
                    </h1>
                  </span>
                  <span className="flex justify-between gap-2">
                    <button onClick={() => setTodoToggle(!todotoggle)}>
                      {todotoggle ? (
                        <FaChevronDown className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
                      ) : (
                        <FaChevronUp className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard("card3");
                      }}
                    >
                      <FaTimes className="w-4 h-4 text-red-600 hover:text-gray-500 cursor-pointer" />
                    </button>
                  </span>
                </div>
                <div className={`${!todotoggle ? "hidden" : "block"}   `}>
                  <span className="">
                    <hr className="border-gray-300" />
                  </span>
                  <TodoList />
                </div>
              </div>
            </div>
          )}
          {/*  Transactions worldwide */}
          {showCard4 && (
            <div className="md:col-start-2 md:col-span-2 bg-white">
              <div className="border-gray-300 border-1 ">
                <div className="p-4 flex justify-between place-items-center">
                  <span>
                    <h1 className="text-md font-bold text-slate-700 ">
                      Transactions worldwide
                    </h1>
                  </span>
                  <span className="flex justify-between gap-2">
                    <button onClick={() => setTransToggle(!transtoggle)}>
                      {transtoggle ? (
                        <FaChevronDown className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
                      ) : (
                        <FaChevronUp className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard("card4");
                      }}
                    >
                      <FaTimes className="w-4 h-4 text-red-600 hover:text-gray-500 cursor-pointer" />
                    </button>
                  </span>
                </div>
                <div className={`${!transtoggle ? "hidden" : "block"}`}>
                  <span className="">
                    <hr className="border-gray-300" />
                  </span>
                  <Transactionworldwide />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
export default DashboardHub
