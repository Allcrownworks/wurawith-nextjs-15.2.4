"use client"
import Image from "next/image";
import WuraSvg from "./WURA .svg"; // Ensure the path is correct and has no extra spaces
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Note: 'next/navigation' instead of 'next/router'
import { FaFacebook, FaGoogle, FaTwitter, FaGithub } from "react-icons/fa";
import pic1 from "./pic1.jpg";
import pic2 from "./pic2.jpg";
import pic3 from "./pic3.jpg";
import pic4 from "./pic4.jpg";
import pic5 from "./pic5.jpg";

const carouselItems = [
  {
    img: pic1,
    text: "Explore the Future of Design",
    button: "Get Started",
    link: "/get-started",
  },
  {
    img: pic2,
    text: "Turn Ideas into Reality",
    button: "Learn More",
    link: "/learn-more",
  },
  {
    img: pic3,
    text: "Build Stunning Interfaces",
    button: "Start Now",
    link: "/start-now",
  },
  {
    img: pic4,
    text: "Create Seamless Experiences",
    button: "Join Us",
    link: "/join-us",
  },
  {
    img: pic5,
    text: "Transform Your Workflow",
    button: "Try for Free",
    link: "/try-for-free",
  },
];
export default function Home() {
  const [subscribe, setSubscribe] = useState(false); // State for the subscribe checkbox
  const router = useRouter(); // Correct: Hook called at top level

  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/emailverification");
  };
  // ------------------right side functons-----------
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(true);

    // Auto-slide effect every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      setIsZoomed(false);
      setTimeout(() => setIsZoomed(true), 300); // Reset zoom effect
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="p-4 shadow-md">
          {/* Left Side: Form */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <Image
                src={WuraSvg}
                alt="Wura Logo"
                className="mx-auto w-20 h-20"
              />
              <h1 className="text-3xl text-slate-800 font-bold text-center">
                Log In
              </h1>
              <form className="space-y-4" onSubmit={handleLoginClick}>
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
                  <label
                    htmlFor="subscribe"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Subscribe to newsletter
                  </label>
                </div>
                <button
                  type="submit" // Keep type as "submit" to trigger form validation
                  className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Not registered?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-600 hover:underline"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Or sign up with</p>
                <div className="flex justify-center space-x-4 mt-2">
                  <FaFacebook
                    className="text-blue-600 cursor-pointer"
                    size={24}
                  />
                  <FaGoogle className="text-red-600 cursor-pointer" size={24} />
                  <FaTwitter
                    className="text-blue-400 cursor-pointer"
                    size={24}
                  />
                  <FaGithub
                    className="text-gray-800 cursor-pointer"
                    size={24}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-200 shadow-md">
          {/* Right Side: Zoom-in Effect */}
          <div className="flex-1 flex items-center justify-center bg-gray-200">
            <div
              className={`relative h-screen bg-white shadow-md text-center w-full transform transition-all duration-500 ease-in-out ${
                isZoomed ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <Image
                src={carouselItems[currentIndex].img}
                alt={carouselItems[currentIndex].text || "Carousel Slide"}
                fill
                className={`object-cover transition-transform duration-1000 ${
                  isZoomed ? "scale-100 opacity-100" : "scale-90 opacity-80"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>{" "}
              {/* text Overlay */}
              <div className="absolute inset-0 pt-[500px] text-center text-white p-6">
                <h2 className="text-3xl font-bold">
                  {carouselItems[currentIndex].text}
                </h2>
                <Link
                  href={carouselItems[currentIndex].link}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all inline-block"
                >
                  {carouselItems[currentIndex].button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
