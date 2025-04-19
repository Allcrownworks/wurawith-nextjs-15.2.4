"use client"
import Image from "next/image";

import { useEffect, useState, useCallback } from "react";
import Sheiz from "./Sheiz.png";

const useTypewriter = (texts: string[], speed: number = 70, delay: number = 5000) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const handleTyping = useCallback(() => {
    const currentText = texts[loopNum % texts.length];
    
    if (isDeleting) {
      setDisplayedText(currentText.substring(0, displayedText.length - 1));
    } else {
      setDisplayedText(currentText.substring(0, displayedText.length + 1));
    }

    if (!isDeleting && displayedText === currentText) {
      setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setCurrentIndex(0);
    }
  }, [displayedText, isDeleting, loopNum, texts, delay]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, speed, handleTyping]);

  return displayedText;
};

const Supermarket = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const mainText = useTypewriter([
    'Sheiz is working on this page', 
    'Exciting updates coming soon!',
    'Stay tuned for amazing features'
  ], 70, 1000);


  useEffect(() => {
    setIsZoomed(true);
    
    // Logo stretch animation on mount
    const logoAnimationTimer = setTimeout(() => {
      setIsLogoAnimating(true);
      // Reset animation after it completes
      setTimeout(() => setIsLogoAnimating(false), 1000);
    }, 500);

    return () => clearTimeout(logoAnimationTimer);
  }, []);

  return (
    <main className="bg-gray-300 p-6 overflow-y-auto h-[550px] flex items-center justify-center">
      <div className={`bg-white p-8 place-items-center grid grid-cols-1 md:grid-cols-3 rounded-lg shadow-md text-center w-xl transform transition-all duration-500 ease-in-out ${
        isZoomed ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}>
        <div className="md:col-span-1">
          {/* Animated Logo with stretch effect */}
          <Image 
            src={Sheiz} 
            alt="Sheiz Logo" 
            className={`mx-auto transition-all duration-300 ${
              isLogoAnimating ? 'scale-110' : 'scale-100'
            }`} 
          />
        </div>
        <div className="md:col-span-2">
          {/* Typewriter effect only on the rotating messages */}
          <h2 style={{ fontFamily: 'Orbitron, sans-serif' }} 
            className="text-xl font-semibold text-gray-800">
            {mainText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>
     
      </div>
    </main>
  );
}
export default Supermarket;