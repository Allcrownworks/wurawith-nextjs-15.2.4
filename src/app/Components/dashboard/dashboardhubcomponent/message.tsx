"use client"
// import React, { useState } from "react";

const Message: React.FC = () => {
  return (
    <div className=" row-span-2 border-gray-300 border-1">
      {/* message 1 */}
      <div className="p-4 flex justify-between place-items-center">
        <span>
          <h1 className="text-md font-bold text-slate-700 ">Monica Smith</h1>
        </span>
        <span className="flex justify-between gap-2">
          <h1 className="text-md font-light text-slate-700 ">1m ago</h1>
        </span>
      </div>
      <div className="px-4 -mt-2">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum
        </p>
        <p className="text-xs mt-2">Today 5:60 pm - 12.06.2014</p>
        <hr className="border-gray-300 mt-4" />
      </div>
      {/* message 2 */}
      <div className="p-4 flex justify-between place-items-center">
        <span>
          <h1 className="text-md font-bold text-slate-700 ">John Angel</h1>
        </span>
        <span className="flex justify-between gap-2">
          <h1 className="text-md font-light text-slate-700 ">2m ago</h1>
        </span>
      </div>
      <div className="px-4 -mt-2">
        <p>There are many variations of passages of Lorem Ipsum available</p>
        <p className="text-xs mt-2">Today 2:23 pm - 11.06.2014</p>
        <hr className="border-gray-300 mt-4" />
      </div>
      {/* message 3*/}
      <div className="p-4 flex justify-between place-items-center">
        <span>
          <h1 className="text-md font-bold text-slate-700 ">Jesica Ocean</h1>
        </span>
        <span className="flex justify-between gap-2">
          <h1 className="text-md font-light text-slate-700 ">5m ago</h1>
        </span>
      </div>
      <div className="px-4 -mt-2">
        <p>Contrary to popular belief, Lorem Ipsum</p>
        <p className="text-xs mt-2">Today 1:00 pm - 08.06.2014</p>
        <hr className="border-gray-300 mt-4" />
      </div>
      {/*  message 4 */}
      <div className="p-4 flex justify-between place-items-center">
        <span>
          <h1 className="text-md font-bold text-slate-700 ">Monica Jackson</h1>
        </span>
        <span className="flex justify-between gap-2">
          <h1 className="text-md font-light text-slate-700 ">5m ago</h1>
        </span>
      </div>
      <div className="px-4 -mt-2">
        <p>The generated Lorem Ipsum is therefore</p>
        <p className="text-xs mt-2">Yesterday 8:48 pm - 10.06.2014</p>
        <hr className="border-gray-300 mt-4" />
      </div>
      {/* message 5 */}
      <div className="p-4 flex justify-between place-items-center">
        <span>
          <h1 className="text-md font-bold text-slate-700 ">Anna Legend</h1>
        </span>
        <span className="flex justify-between gap-2">
          <h1 className="text-md font-light text-slate-700 ">5m ago</h1>
        </span>
      </div>
      <div className="px-4 -mt-2">
        <p>All the Lorem Ipsum generators on the Internet tend to repeat</p>
        <p className="text-xs mt-2">Yesterday 8:48 pm - 10.06.2014</p>
        <hr className="border-gray-300 mt-4" />
      </div>
      {/* message 6 */}
      <div className="p-4 flex justify-between place-items-center">
        <span>
          <h1 className="text-md font-bold text-slate-700 ">Damian Nowak</h1>
        </span>
        <span className="flex justify-between gap-2">
          <h1 className="text-md font-light text-slate-700 ">5m ago</h1>
        </span>
      </div>
      <div className="px-4 -mt-2">
        <p>The standard chunk of Lorem Ipsum used</p>
        <p className="text-xs mt-2">Today 5:60 pm - 12.06.2014</p>
        <hr className="border-gray-300 mt-4" />
      </div>
      {/*  message 7 */}
      <div className="p-4 flex justify-between place-items-center">
        <span>
          <h1 className="text-md font-bold text-slate-700 ">Gary Smith</h1>
        </span>
        <span className="flex justify-between gap-2">
          <h1 className="text-md font-light text-slate-700 ">5m ago</h1>
        </span>
      </div>
      <div className="px-4 -mt-2">
        <p>200 Latin words, combined with a handful</p>
        <p className="text-xs mt-2">Yesterday 8:48 pm - 10.06.2014</p>
        <hr className="border-gray-300 mt-4" />
      </div>
    </div>
  );
};

export default Message;
