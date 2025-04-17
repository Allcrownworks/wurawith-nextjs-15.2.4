"use client"
// import React, { useState } from "react";
import Map from"./map"

// import { TbCornerRightUp } from "react-icons/tb";

// import { LuClock9 } from "react-icons/lu";

const Transactionworldwide: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="p-4">
          {/* --------Heading------- */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-1 ">
            <span className="col-span-7 ">
              <hr className="border-gray-100 " />
            </span>
            <div className="col-span-1  text-center p-2 text-sm font-medium">
              <h2>No</h2>
            </div>
            <div className="col-span-2  text-center p-2 text-sm font-medium">
              <h2>Transaction</h2>
            </div>
            <div className="col-span-2 text-center p-2 text-sm font-medium">
              <h2>Date</h2>
            </div>
            <div className="col-span-2  text-center p-2 text-sm font-medium">
              <h2>Amount</h2>
            </div>
            <span className="col-span-7 ">
              <hr className="border-gray-300 " />
            </span>
          </div>
          {/* --------1------- */}
          <div className="grid grid-cols-7 gap-1">
            <span className="col-span-7 ">
              <hr className="border-gray-100 " />
            </span>
            <div className="col-span-1  text-center p-2 text-sm font-medium my-auto">
              <h2>1</h2>
            </div>
            <div className="col-span-2  p-2 text-sm font-medium flex flex-row gap-1">
              <h2 className="">Security doors</h2>
            </div>
            <div className="col-span-2  p-2 text-sm font-medium place-items-center flex">
              <h2> 16 Jun 2014</h2>
            </div>
            <div className="col-span-2  text-center text-sm font-medium flex flex-row gap-1 place-items-center mx-auto bg-emerald-400 px-2">
              <h2 className="text-center flex">$483.00</h2>
            </div>
            <span className="col-span-7 ">
              <hr className="border-gray-300 " />
            </span>
          </div>
          {/* --------2------- */}
          <div className="grid grid-cols-7 gap-1">
            <span className="col-span-7 ">
              <hr className="border-gray-100 " />
            </span>
            <div className="col-span-1  text-center p-2 text-sm font-medium ">
              <h2>2</h2>
            </div>
            <div className="col-span-2  text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
              <h2>Wardrobes</h2>
            </div>
            <div className="col-span-2  p-2 text-sm font-medium ">
              <h2> 10 Jun 2014</h2>
            </div>
            <div className="col-span-2  text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto bg-emerald-400 px-2">
              <h2 className="text-center flex">$327.00</h2>
            </div>

            <span className="col-span-7 ">
              <hr className="border-gray-300 " />
            </span>
          </div>
          {/* --------4------- */}
          <div className="grid grid-cols-7 gap-1">
            <span className="col-span-7 ">
              <hr className="border-gray-100 " />
            </span>
            <div className="col-span-1  text-center p-2 text-sm font-medium ">
              <h2>3</h2>
            </div>
            <div className="col-span-2  text-center p-2 text-sm font-medium flex gap-1 place-items-center">
              <h2>Set of tools</h2>
            </div>
            <div className="col-span-2  p-2 text-sm font-medium  flex">
              <h2>16 Jun 2014</h2>
            </div>
            <div className="col-span-2  text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto bg-emerald-400 px-2">
              <h2 className="text-center flex">$125.00</h2>
            </div>
            <span className="col-span-7 ">
              <hr className="border-gray-300 " />
            </span>
          </div>
          {/* --------4------- */}
          <div className="grid grid-cols-7 gap-1">
            <span className="col-span-7 ">
              <hr className="border-gray-100 " />
            </span>
            <div className="col-span-1 text-center p-2 text-sm font-medium ">
              <h2>4</h2>
            </div>
            <div className="col-span-2 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
              <h2>Phones</h2>
            </div>
            <div className="col-span-2 p-2 text-sm font-medium ">
              <h2> 24 Jun 2013</h2>
            </div>
            <div className="col-span-2 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto bg-emerald-400 px-2">
              <h2 className="text-center flex">$235.00</h2>
            </div>
            <span className="col-span-7 ">
              <hr className="border-gray-300 " />
            </span>
          </div>
          {/* --------5------- */}
          <div className="grid grid-cols-7 gap-1">
            <span className="col-span-7 ">
              <hr className="border-gray-100 " />
            </span>
            <div className="col-span-1 text-center p-2 text-sm font-medium my-auto">
              <h2>5</h2>
            </div>
            <div className="col-span-2 p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
              <h2>Panoramic pictures </h2>
            </div>
            <div className="col-span-2 p-2 text-sm font-medium place-items-center flex">
              <h2>22 Jun 2013</h2>
            </div>
            <div className="col-span-2 text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center mx-auto bg-emerald-400 px-2">
              <h2 className="text-center flex">$344.00</h2>
            </div>
            <span className="col-span-7 ">
              <hr className="border-gray-300 " />
            </span>
          </div>
          {/* --------6------- */}
          <div className="grid grid-cols-7 gap-1">
            <span className="col-span-7 ">
              <hr className="border-gray-100 " />
            </span>
            <div className="col-span-1  text-center p-2 text-sm font-medium  ">
              <h2>6</h2>
            </div>
            <div className="col-span-2  text-center p-2 text-sm font-medium flex flex-row gap-1 place-items-center">
              <h2> Monitors</h2>
            </div>
            <div className="col-span-2  p-2 text-sm font-medium ">
              <h2> 26 Jun 2013</h2>
            </div>
            <div className="col-span-2  text-center text-sm font-medium flex flex-row gap-1 place-items-center mx-auto bg-emerald-400 px-2">
              <h2 className="text-center flex ">$100.00</h2>
            </div>
            <span className="col-span-7 ">
              <hr className="border-gray-300 " />
            </span>
          </div>
        </div>
        {/* second grid by the right */}
<<<<<<< HEAD
        <div className=""><Map /></div> 
=======
        <div className=""><Map /></div>
>>>>>>> 770c6895134a1e50df875cd57b9e66f9742f2fca
      </div>
    </div>
  );
};

export default Transactionworldwide;
