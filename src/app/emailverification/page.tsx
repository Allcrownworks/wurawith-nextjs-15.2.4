"use client"
import React, { useState, useRef, useEffect } from "react";
import WuraSvg from "../WURA .svg"; // Adjust the path to your logo
import { useRouter } from "next/navigation"; // Note: 'next/navigation' instead of 'next/router'
import Image from "next/image";

export default function Emailverification() {
    const router = useRouter(); // Correct: Hook called at top level
    

  const [codes, setCodes] = useState<string[]>(Array(4).fill("")); // Explicitly define `codes` as an array of strings
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Define refs as an array of HTMLInputElement or null
  const [error, setError] = useState<string | null>(null); // State to handle error messages

  // State to control the zoom-in animation
  const [isZoomed, setIsZoomed] = useState(false);

  // Trigger the zoom-in effect when the component mounts
  useEffect(() => {
    setIsZoomed(true);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus(); // Focus the next input field
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 4); // Get the first 4 characters of the pasted text
    const newCodes = [...codes];

    pasteData.split("").forEach((char: string, index: number) => {
      if (index < 4) {
        newCodes[index] = char; // Update the codes array with the pasted characters
      }
    });

    setCodes(newCodes);

    if (pasteData.length === 4 && inputRefs.current[3]) {
      inputRefs.current[3]?.focus(); // Focus the last input field if all 4 characters are pasted
    } else if (pasteData.length > 0 && inputRefs.current[pasteData.length]) {
      inputRefs.current[pasteData.length]?.focus(); // Focus the appropriate input field based on the length of the pasted text
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codes[index] && index > 0 && inputRefs.current[index - 1]) {
      // If Backspace is pressed and the current input is empty, move focus to the previous input
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Function to handle form submission

const handleSubmit = () => {
  if (codes.some((code) => code === "")) {
    setError("Please fill in all the input boxes.");
    return;
  }
  setError(null);
  router.push("/dashboard");
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Add the zoom-in animation to the white container */}
      <div
        className={`bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full transform transition-all duration-500 ease-in-out ${
          isZoomed ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        {/* Wura Logo */}
        <Image src={WuraSvg} alt="Wura Logo" className="mx-auto w-20 h-20 mb-6" />

        {/* Verification Message */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          We have sent a verification code to your email
        </h2>

        {/* Four Input Boxes for Verification Code */}
        <div className="flex justify-center space-x-2 mb-6">
          {codes.map((code, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              onPaste={handlePaste}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }} // Assign ref to each input field
              className={`w-12 h-12 text-center border ${
                error && code === "" ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        {/* Submit Button */}
        <button
  onClick={handleSubmit}
  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors mb-6 block text-center"
>
  Submit
</button>

        {/* Additional Text */}
        <p className="text-sm text-gray-600 mb-2">
          {"Didn't receive the verification code? It could take a bit"}
        </p>
        <p className="text-sm text-gray-600 mb-2">of</p>
        <p className="text-sm text-gray-600 mb-2">
          time. Request a new code in <span className="font-bold text-red-500">17 seconds</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          For further support, you may visit the help center or contact
        </p>
        <p className="text-sm text-gray-600 mb-2">our</p>
        <p className="text-sm text-gray-600">customer service team</p>
      </div>
    </div>
  );
};

