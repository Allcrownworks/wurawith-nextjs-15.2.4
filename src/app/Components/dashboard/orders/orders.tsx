"use client"
import { OrdersProgressBar } from "../orders/ordersprogressbar";
import Chart from "./chart";

export function Orders() {
  return (
    <main className="bg-white">
      <div className=" w-full flex-1 mt-8 overflow-x-hidden flex-col flex gap-4 overflow-y-auto rounded-lg">
        <div className="border-1 w-full border-gray-300">
          <div className="flex justify-between p-4">
            <span>
              <h1 className="text-md font-bold text-slate-400">Orders</h1>
            </span>
            <span className="flex flex-row gap-2">
              <button className="border-1 border-gray-300 px-2 w-20 h-7 cursor-pointer">
                Today
              </button>
              <button className="border-1 border-gray-300 px-2 w-20 h-7 cursor-pointer">
                Monthly
              </button>
              <button className="border-1 border-gray-300 px-2 w-20 h-7 cursor-pointer">
                Annual
              </button>
            </span>
          </div>
          <hr className="border-gray-300" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
            {/* Col 1 */}
            <div className="md:col-span-3  ">
                <Chart />           
            </div>

            {/* Col 2 */}
            <div className="">
              <OrdersProgressBar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
