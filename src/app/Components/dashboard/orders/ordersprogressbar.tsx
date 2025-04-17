"use client"
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function OrdersProgressBar() {
  // State for animated percentages
  const [totalOrdersPercentage, setTotalOrdersPercentage] = useState(0);
  const [ordersLastMonthPercentage, setOrdersLastMonthPercentage] = useState(0);
  const [monthlyIncomePercentage, setMonthlyIncomePercentage] = useState(0);

  // Refs for progress bars
  const totalOrdersRef = useRef<HTMLDivElement | null>(null);
  const ordersLastMonthRef = useRef<HTMLDivElement | null>(null);
  const monthlyIncomeRef = useRef<HTMLDivElement | null>(null);

  // Function to animate percentage values
  const animatePercentage = (
    setValue: React.Dispatch<React.SetStateAction<number>>,
    targetValue: number,
    duration: number = 1500
  ) => {
    const increment = targetValue / (duration / 16); // Calculate increment per frame (assuming 60fps)
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      setValue(() => Math.min(Math.floor(current), targetValue)); // Ensure it doesn't exceed the target
      if (current >= targetValue) clearInterval(interval);
    }, 16); // Run every 16ms (~60fps)
  };

  // Intersection Observer for animating on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === totalOrdersRef.current) {
              animatePercentage(setTotalOrdersPercentage, 48);
            } else if (entry.target === ordersLastMonthRef.current) {
              animatePercentage(setOrdersLastMonthPercentage, 60);
            } else if (entry.target === monthlyIncomeRef.current) {
              animatePercentage(setMonthlyIncomePercentage, 22);
            }
            // Stop observing once animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    // Observe each progress bar
    if (totalOrdersRef.current) observer.observe(totalOrdersRef.current);
    if (ordersLastMonthRef.current)
      observer.observe(ordersLastMonthRef.current);
    if (monthlyIncomeRef.current) observer.observe(monthlyIncomeRef.current);

    // Cleanup observer on component unmount
    return () => {
      if (totalOrdersRef.current) observer.unobserve(totalOrdersRef.current);
      if (ordersLastMonthRef.current)
        observer.unobserve(ordersLastMonthRef.current);
      if (monthlyIncomeRef.current)
        observer.unobserve(monthlyIncomeRef.current);
    };
  }, []);

  return (
    <main className="overflow-y-auto">
      {/* Performance Percentage */}
      <div className="flex flex-col p-4">
        {/* Total orders in period */}
        <div className="font-light text-3xl">
          <h1>2,346</h1>
        </div>
        <div className="flex place-items-center justify-between">
          <span>
            <p className="text-xs pt-2">Total orders in period</p>
          </span>
          <div className="flex gap-2 place-items-center text-sm">
            <p className="text-xl font-medium text-green-600">
              {totalOrdersPercentage}%
            </p>
            <p>
              <Bell className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
            </p>
          </div>
        </div>
        <div className="flex flex-col pt-3">
          <div
            ref={totalOrdersRef}
            className="w-full bg-gray-200 rounded-lg overflow-hidden"
          >
            <div
              className="bg-green-600 h-2 rounded-lg transition-all duration-500"
              style={{
                width: `${totalOrdersPercentage}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Orders in last month */}
        <div className="font-light text-3xl">
          <h1>4,422</h1>
        </div>
        <div className="flex place-items-center justify-between">
          <span>
            <p className="text-xs pt-2">Orders in last month</p>
          </span>
          <div className="flex gap-2 place-items-center text-sm">
            <p className="text-xl font-medium text-green-600">
              {ordersLastMonthPercentage}%
            </p>
            <p>
              <Bell className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
            </p>
          </div>
        </div>
        <div className="flex flex-col pt-3">
          <div
            ref={ordersLastMonthRef}
            className="w-full bg-gray-200 rounded-lg overflow-hidden"
          >
            <div
              className="bg-green-600 h-2 rounded-lg transition-all duration-500"
              style={{
                width: `${ordersLastMonthPercentage}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Monthly income from orders */}
        <div className="font-light text-3xl">
          <h1>9,180</h1>
        </div>
        <div className="flex place-items-center justify-between">
          <span>
            <p className="text-xs pt-2">Monthly income from orders</p>
          </span>
          <div className="flex gap-2 place-items-center text-sm">
            <p className="text-xl font-medium text-green-600">
              {monthlyIncomePercentage}%
            </p>
            <p>
              <Bell className="w-4 h-4 text-green-600 hover:text-gray-500 cursor-pointer" />
            </p>
          </div>
        </div>
        <div className="flex flex-col pt-3">
          <div
            ref={monthlyIncomeRef}
            className="w-full bg-gray-200 rounded-lg overflow-hidden"
          >
            <div
              className="bg-green-600 h-2 rounded-lg transition-all duration-500"
              style={{
                width: `${monthlyIncomePercentage}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
