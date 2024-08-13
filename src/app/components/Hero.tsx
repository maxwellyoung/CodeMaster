"use client";
import React, { useState } from "react";

const HeroSection: React.FC = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-5xl font-bold text-center mb-4">
        Code<span className="text-blue-500">Master</span>
      </h2>
      <p className="text-xl mb-6 text-center max-w-2xl">
        Your AI-Powered Coding Practice Tool. Get similar coding questions based
        on your input.
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your coding question here..."
          className="w-full p-4 text-lg bg-gray-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          className="mt-4 w-full py-3 px-6 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={() => console.log("Fetching similar questions...")}
        >
          Get Similar Questions
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
