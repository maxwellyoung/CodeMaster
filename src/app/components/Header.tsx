import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-lg">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Code<span className="text-blue-500">Master</span>
      </h1>
      <nav>
        <ul className="flex space-x-6">
          <li className="hover:text-blue-400 transition-colors duration-300">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-blue-400 transition-colors duration-300">
            <a href="/about">About</a>
          </li>
          <li className="hover:text-blue-400 transition-colors duration-300">
            <a href="/contact">Contact</a>
          </li>
          <li className="hover:text-blue-400 transition-colors duration-300">
            <a href="/login">Sign In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
