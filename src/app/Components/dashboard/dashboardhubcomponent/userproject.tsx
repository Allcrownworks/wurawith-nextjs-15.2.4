"use client"
// import React, { useState } from "react";

import { TbCornerRightUp } from "react-icons/tb";

import { LuClock9 } from "react-icons/lu";

const UserProject: React.FC = () => {


  return (
    <div className="flex flex-col">
      {/* --------1------- */}
      <div className="grid grid-cols-4 gap-1">
        <span className="col-span-4 ">
          <hr className="border-gray-100 " />
        </span>
        <div className="col-span-1 text-center p-2 text-sm font-medium">
          <h2>Status</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium">
          <h2>Date</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium">
          <h2>User</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium">
          <h2>Value</h2>
        </div>
        <span className="col-span-4 ">
          <hr className="border-gray-300 " />
        </span>
      </div>
      {/* --------2------- */}
      <div className="grid grid-cols-4 gap-1">
        <span className="col-span-4 ">
          <hr className="border-gray-100 " />
        </span>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Pending....</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
          <LuClock9 className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />

          <h2>11:20pm</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Samanta</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto">
          <TbCornerRightUp className="w-4 h-4 text-cyan-400 hover:text-gray-500" />
          <h2 className="text-center flex">20%</h2>
        </div>
        <span className="col-span-4 ">
          <hr className="border-gray-300 " />
        </span>
      </div>
      {/* --------3------- */}
      <div className="grid grid-cols-4 gap-1">
        <span className="col-span-4 ">
          <hr className="border-gray-100 " />
        </span>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Canceled</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
          <LuClock9 className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />

          <h2>10:40am</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Monica</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto">
          <TbCornerRightUp className="w-4 h-4 text-cyan-400 hover:text-gray-500" />
          <h2 className="text-center flex">20%</h2>
        </div>

        <span className="col-span-4 ">
          <hr className="border-gray-300 " />
        </span>
      </div>
      {/* --------4------- */}
      <div className="grid grid-cols-4 gap-1">
        <span className="col-span-4 ">
          <hr className="border-gray-100 " />
        </span>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Pending....</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
          <LuClock9 className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />

          <h2>01:30pm</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>John</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto">
          <TbCornerRightUp className="w-4 h-4 text-cyan-400 hover:text-gray-500" />
          <h2 className="text-center flex">20%</h2>
        </div>
        <span className="col-span-4 ">
          <hr className="border-gray-300 " />
        </span>
      </div>
      {/* --------5------- */}
      <div className="grid grid-cols-4 gap-1">
        <span className="col-span-4 ">
          <hr className="border-gray-100 " />
        </span>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Pending....</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
          <LuClock9 className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />

          <h2>02:20pm</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Agnes</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto">
          <TbCornerRightUp className="w-4 h-4 text-cyan-400 hover:text-gray-500" />
          <h2 className="text-center flex">20%</h2>
        </div>
        <span className="col-span-4 ">
          <hr className="border-gray-300 " />
        </span>
      </div>
      {/* --------6------- */}
      <div className="grid grid-cols-4 gap-1">
        <span className="col-span-4 ">
          <hr className="border-gray-100 " />
        </span>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Pending....</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
          <LuClock9 className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />

          <h2>09:40pm</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Janet</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto">
          <TbCornerRightUp className="w-4 h-4 text-cyan-400 hover:text-gray-500" />
          <h2 className="text-center flex">20%</h2>
        </div>
        <span className="col-span-4 ">
          <hr className="border-gray-300 " />
        </span>
      </div>
      {/* --------7------- */}
      <div className="grid grid-cols-4 gap-1">
        <span className="col-span-4 ">
          <hr className="border-gray-100 " />
        </span>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Pending....</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
          <LuClock9 className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />

          <h2>04:10am</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Amelia</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto">
          <TbCornerRightUp className="w-4 h-4 text-cyan-400 hover:text-gray-500" />
          <h2 className="text-center flex">20%</h2>
        </div>
        <span className="col-span-4 ">
          <hr className="border-gray-300 " />
        </span>
      </div>
      {/* --------8------- */}
      <div className="grid grid-cols-4 gap-1">
        <span className="col-span-4 ">
          <hr className="border-gray-100 " />
        </span>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Pending....</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
          <LuClock9 className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />

          <h2>12:08am</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium text-gray-500">
          <h2>Damian</h2>
        </div>
        <div className="col-span-1 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto">
          <TbCornerRightUp className="w-4 h-4 text-cyan-400 hover:text-gray-500" />
          <h2 className="text-center flex">20%</h2>
        </div>
        <span className="col-span-4 ">
          <hr className="border-gray-300 " />
        </span>
      </div>
    </div>
  );
};

export default UserProject;
