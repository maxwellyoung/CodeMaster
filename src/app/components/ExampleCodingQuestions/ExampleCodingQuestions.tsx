import React from "react";

const ExampleCodingQuestions: React.FC = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <h3 className="text-4xl font-bold text-center mb-8">
        Example Coding Questions
      </h3>
      <div className="text-center mb-6">
        <p className="text-lg">You have 0 remaining requests for today.</p>
        <p className="text-lg">
          You are currently on the <strong>Free</strong> plan.{" "}
          <button
            className="ml-2 text-blue-500 underline hover:text-blue-400 transition-colors duration-300"
            onClick={() => alert("Redirect to upgrade page")}
          >
            Upgrade Now
          </button>
        </p>
      </div>
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          <button className="bg-gray-700 py-2 px-4 rounded-full text-sm hover:bg-gray-600">
            All
          </button>
          <button className="bg-gray-700 py-2 px-4 rounded-full text-sm hover:bg-gray-600">
            Easy
          </button>
          <button className="bg-gray-700 py-2 px-4 rounded-full text-sm hover:bg-gray-600">
            Medium
          </button>
          <button className="bg-gray-700 py-2 px-4 rounded-full text-sm hover:bg-gray-600">
            Hard
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-12">
        {/* Example question cards */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h4 className="text-xl font-bold mb-2">JavaScript Array Filter</h4>
          <p className="mb-4">
            Filter elements from an array using the filter method.
          </p>
          <span className="text-sm text-gray-400">Difficulty: Easy</span>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h4 className="text-xl font-bold mb-2">Python List Comprehension</h4>
          <p className="mb-4">
            Generate a list of square numbers from 1 to 10 using list
            comprehension.
          </p>
          <span className="text-sm text-gray-400">Difficulty: Medium</span>
        </div>
        {/* Additional cards can be added here */}
      </div>
    </section>
  );
};

export default ExampleCodingQuestions;
