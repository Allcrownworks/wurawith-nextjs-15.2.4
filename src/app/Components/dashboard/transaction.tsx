"use client"
import { GoZap } from "react-icons/go";
import { TbCornerRightDown, TbCornerRightUp } from "react-icons/tb";


export function Transaction() {
    return (
      <main className="overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                   {/* Income/Monthly */}
        <div className="bg-white rounded-lg shadow-md border-1 border-gray-300">
           <div className="w-full  flex flex-col flex-1 ">
                <div className="flex place-items-center justify-between ">
                  <span className="p-2 lg:p-4 font-bold ">
                    <p className="text-xs lg:text-[15px] xl:text-lg">Income</p>
                  </span>
                  <span className="p-2 lg:p-4">
                    <button className="bg-blue-500 px-2 py-auto text-center text-xs lg:text-[15px] xl:text-lg">Monthly</button>
                  </span>
                </div>
                <hr className="border-gray-300" />
                <div className="text-3xl text-center">
                  <h1>40 886,200</h1>
                </div>
                <div className="flex place-items-center justify-between p-4">
                  <span className="">
                    <p className="text-xs">Total income</p>
                  </span>
                  <div className="flex gap-2 place-items-center">
                    <p className="text-md font-bold text-blue-500">98%</p>
                    <p>
                      <GoZap className="w-4 h-4 text-blue-500 hover:text-gray-500 cursor-pointer" />
                    </p>
                  </div>
                </div>
              </div>
        </div>
        

                     {/* Order/Annual */}
        <div className="bg-white rounded-lg shadow-md border-1 border-gray-300">
             <div className="w-full  flex flex-col flex-1 ">
                <div className="flex place-items-center justify-between">
                  <span className="p-2 lg:p-4 font-bold">
                    <p className="text-xs lg:text-[15px] xl:text-lg">Orders</p>
                  </span>
                  <span className="p-2 lg:p-4">
                    <button className="bg-cyan-400 px-2 py-auto text-xs lg:text-[15px] xl:text-lg">Annual</button>
                  </span>
                </div>
                <hr className="border-gray-300" />
                <div className="text-3xl text-center">
                  <h1>275,800</h1>
                </div>
                <div className="flex place-items-center justify-between p-4">
                  <span className="">
                    <p className="text-xs">New orders</p>
                  </span>
                  <div className="flex gap-2 place-items-center">
                    <p className="text-md font-bold text-cyan-400">20%</p>
                    <p>
                      <TbCornerRightUp className="w-4 h-4 text-cyan-400 hover:text-gray-500 cursor-pointer" />
                    </p>
                  </div>
                </div>
              </div>
        </div>


                {/* Visit/Today */}
        <div className="bg-white rounded-lg shadow-md border-1 border-gray-300">
        <div className="w-full  flex flex-col flex-1 ">
                <div className="flex place-items-center justify-between">
                  <span className="p-2 lg:p-4 font-bold ">
                    <p className="text-xs lg:text-[15px] xl:text-lg">Visit</p>
                  </span>
                  <span className="p-2 lg:p-4">
                    <button className="bg-green-400 px-2 py-auto text-xs lg:text-[15px] xl:text-lg">Today</button>
                  </span>
                </div>
                <hr className="border-gray-300" />
                <div className="text-3xl text-center">
                  <h1>106,120</h1>
                </div>
                <div className="flex place-items-center justify-between p-4">
                  <span className="">
                    <p className="text-xs">New visits</p>
                  </span>
                  <div className="flex gap-2 place-items-center text-green-400">
                    <p className="text-md font-bold text-green-400">44%</p>
                    <p>
                      <TbCornerRightUp className="w-4 h-4  hover:text-gray-500 cursor-pointer" />
                    </p>
                  </div>
                </div>
              </div>
        </div>


                    {/* Users Activity/Low Value */}
        <div className="bg-white rounded-lg shadow-md border-1 border-gray-300">
            <div className="w-full  flex flex-col flex-1">
                <div className="flex place-items-center justify-between">
                  <span className="p-2 lg:p-4 font-bold">
                    <p className="text-xs lg:text-[15px] xl:text-lg">User activity</p>
                  </span>
                  <span className="p-2 lg:p-4">
                    <button className="px-2 py-auto bg-red-400 text-xs lg:text-[15px] xl:text-lg">Low value</button>
                  </span>
                </div>
                <hr className="border-gray-300" />
                <div className="text-3xl text-center">
                  <h1>80,600</h1>
                </div>
                <div className="flex place-items-center justify-between p-4 ">
                  <span>
                    <p className="text-xs">In first month</p>
                  </span>
                  <div className="flex gap-2 place-items-center">
                    <p className="text-md font-bold text-red-400">38%</p>
                    <p>
                      <TbCornerRightDown className="w-4 h-4 text-red-400 hover:text-gray-500 cursor-pointer" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>          
    </main>
    );
  }
  
  
  