"use client"
import WuraSvg from "../WURA .svg"; // Ensure the path is correct and has no extra spaces
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Note: 'next/navigation' instead of 'next/router'
import { FaFacebook, FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";





const SignUp = () => {
    const [subscribe, setSubscribe] = useState(false); // State for the subscribe checkbox

        const router = useRouter(); // Correct: Hook called at top level
      
        const handleLoginClick = (e: React.FormEvent) => {
          e.preventDefault();
          router.push("/");
        };
       // State to control the zoom-in animation
        const [isZoomed, setIsZoomed] = useState(false);
      
        // Trigger the zoom-in effect when the component mounts
        useEffect(() => {
          setIsZoomed(true);
        }, []);
  return (
    <main className="p-6 overflow-y-auto h-screen">
      {/* Left Side: Form */}
      <div className={`flex-1 flex items-center justify-center bg-white p-8 rounded-lg shadow-md text-center w-full transform transition-all duration-500 ease-in-out ${
          isZoomed ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <div className="w-full max-w-md">
          <Image src={WuraSvg} alt="Wura Logo" className="mx-auto w-20 h-20" />
          <h1 className="text-3xl text-slate-800 font-bold text-center">
            Log In
          </h1>
          <form className="space-y-4" onSubmit={handleLoginClick}>
            <div className="flex flew-col md:flex-row gap-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
               First Name
              </label>
              <input
                type="firstName"
                id="firstName"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="lastName"
                id="lastName"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="subscribe"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700">
                Subscribe to newsletter
              </label>
            </div>
            <button
              type="submit" // Keep type as "submit" to trigger form validation
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
        
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Or sign up with</p>
            <div className="flex justify-center space-x-4 mt-2">
              <FaFacebook className="text-blue-600 cursor-pointer" size={24} />
              <FaGoogle className="text-red-600 cursor-pointer" size={24} />
              <FaTwitter className="text-blue-400 cursor-pointer" size={24} />
              <FaGithub className="text-gray-800 cursor-pointer" size={24} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default SignUp