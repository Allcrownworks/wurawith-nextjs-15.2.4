// "use client"
// import Image from "next/image";

// import { useEffect, useState, useCallback } from "react";
// import Sheiz from "./Sheiz.png";

// const useTypewriter = (texts: string[], speed: number = 70, delay: number = 5000) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [loopNum, setLoopNum] = useState(0);
  

//   const handleTyping = useCallback(() => {
//     const currentText = texts[loopNum % texts.length];
    
//     if (isDeleting) {
//       setDisplayedText(currentText.substring(0, displayedText.length - 1));
//     } else {
//       setDisplayedText(currentText.substring(0, displayedText.length + 1));
//     }

//     if (!isDeleting && displayedText === currentText) {
//       setTimeout(() => setIsDeleting(true), delay);
//     } else if (isDeleting && displayedText === '') {
//       setIsDeleting(false);
//       setLoopNum(loopNum + 1);
//       setCurrentIndex(0);
//     }
//   }, [displayedText, isDeleting, loopNum, texts, delay]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       handleTyping();
//     }, isDeleting ? speed / 2 : speed);

//     return () => clearTimeout(timer);
//   }, [displayedText, isDeleting, speed, handleTyping]);

//   return displayedText;
// };

// const Tax = () => {
//   const [audioInitialized, setAudioInitialized] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [isLogoAnimating, setIsLogoAnimating] = useState(false);
//   const mainText = useTypewriter([
//     'Sheiz is working on this page', 
//     'Exciting updates coming soon!',
//     'Stay tuned for amazing features'
//   ], 70, 1000);

//   // Audio initialization with user interaction fallback
//   useEffect(() => {
//     // Only initialize once
//     if (audioInitialized) return;

//     const handleFirstInteraction = () => {
//       try {
//         // Play Sheiz.mp3
//         const sheizAudio = new Audio('/tax/Sheiz.mp3');
//         sheizAudio.play().catch(e => console.log("Sheiz audio prevented:", e));
        
//         // Play nature audio if needed
//         const natureAudio = document.getElementById('nature-audio') as HTMLAudioElement;
//         if (natureAudio) {
//           natureAudio.play().catch(e => console.log("Nature audio prevented:", e));
//         }

//         setAudioInitialized(true);
//         document.removeEventListener('click', handleFirstInteraction);
//       } catch (error) {
//         console.error("Audio error:", error);
//       }
//     };

//     // Try autoplay first
//     const sheizAudio = new Audio('/tax/Sheiz.mp3');
//     sheizAudio.play()
//       .then(() => setAudioInitialized(true))
//       .catch(() => {
//         // If autoplay fails, wait for user interaction
//         document.addEventListener('click', handleFirstInteraction);
//       });

//     return () => {
//       document.removeEventListener('click', handleFirstInteraction);
//     };
//   }, [audioInitialized]);

//   useEffect(() => {
//     setIsZoomed(true);
    
//     // Logo stretch animation on mount
//     const logoAnimationTimer = setTimeout(() => {
//       setIsLogoAnimating(true);
//       // Reset animation after it completes
//       setTimeout(() => setIsLogoAnimating(false), 1000);
//     }, 500);

//     return () => clearTimeout(logoAnimationTimer);
//   }, []);

//   return (
//     <main className="bg-red-800 p-6 overflow-y-auto h-[550px] flex items-center justify-center">
//       <div className={`bg-white p-8 place-items-center grid grid-cols-1 md:grid-cols-3 rounded-lg shadow-md text-center w-full transform transition-all duration-500 ease-in-out ${
//         isZoomed ? "scale-100 opacity-100" : "scale-50 opacity-0"
//       }`}>
//         <div className="">
//           {/* Animated Logo with stretch effect */}
//           <Image 
//             src={Sheiz} 
//             alt="Sheiz Logo" 
//             className={`mx-auto transition-all duration-300 ${
//               isLogoAnimating ? 'scale-110' : 'scale-100'
//             }`} 
//           />
//         </div>
//         <div className="">
//           {/* Typewriter effect only on the rotating messages */}
//           <h2 style={{ fontFamily: 'Orbitron, sans-serif' }} 
//             className="text-xl font-semibold text-gray-800">
//             {mainText}
//             <span className="animate-pulse">|</span>
//           </h2>
//         </div>
//         <div className="">
//           {/* Music player section - all text static */}
//           <div className="">
//             <h3 className="text-md font-medium text-blue-800 mb-2">
//               Need To Relax?
//             </h3>
//             <audio id="nature-audio" src="/tax/ADUKE GOLD AND GLORIOUS TWINS DE GLORIFIED PRAISE CONCERT 1.0.mp3" controls />
//             <button 
//               onClick={() => {
//                 const audio = document.getElementById('nature-audio') as HTMLAudioElement | null;
//                 if (audio) {
//                   if (audio.paused) {
//                     audio.play().catch(e => console.error("Audio playback failed:", e));
//                   } else {
//                     audio.pause();
//                   }
//                 }
//               }}
//               className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center mx-auto hover:bg-blue-700 transition-colors"
//             >
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-5 w-5 mr-2" 
//                 viewBox="0 0 20 20" 
//                 fill="currentColor"
//               >
//                 <path 
//                   fillRule="evenodd" 
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
//                   clipRule="evenodd" 
//                 />
//               </svg>
//               Play EverGreen
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
// export default Tax;


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

const Tax = () => {
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
export default Tax;