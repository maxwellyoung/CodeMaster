"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabase/client";
import QuestionForm from "./components/QuestionForm";
import QuestionCard from "./components/QuestionCard";
import Footer from "./components/Footer";
import { SignedIn } from "@clerk/nextjs";

type Question = {
  title: string;
  description: string;
  language: string;
  difficulty: string;
  tags: string[];
};

const HomePage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [remainingRequests, setRemainingRequests] = useState<number>(0);

  // Fetching questions from the database
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from("questions").select("*");
      if (error) {
        console.error("Error fetching questions:", error);
      } else {
        setQuestions(data as Question[]);
      }
    };
    fetchQuestions();
  }, []);

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question.description);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Filtering questions based on selected filters
  const filteredQuestions = questions.filter((question) => {
    const matchesLanguage =
      selectedLanguage === "All" || question.language === selectedLanguage;
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      question.difficulty === selectedDifficulty;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => question.tags.includes(tag));

    return matchesLanguage && matchesDifficulty && matchesTags;
  });

  const uniqueTags = Array.from(
    new Set(questions.flatMap((question) => question.tags))
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 space-y-8 bg-light-gradient dark:bg-dark-gradient sm:space-y-12">
      <SignedIn>
        <div className="w-full max-w-5xl mx-auto p-6 sm:p-12">
          <QuestionForm
            initialCode={selectedQuestion}
            initialRemainingRequests={remainingRequests}
            onRequestsChange={setRemainingRequests}
          />
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-center mt-8 sm:mt-10 mb-6 sm:mb-8 text-gray-900 dark:text-gray-200 tracking-tight">
          Example Coding Questions
        </h2>

        {/* Filters Container with Max Width */}
        <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Difficulty Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {["All", "Easy", "Medium", "Hard"].map((level) => (
              <button
                key={level}
                onClick={() => handleDifficultySelect(level)}
                className={`py-1 sm:py-2 px-3 sm:px-5 rounded-full transition-colors duration-300 text-sm sm:text-lg font-medium tracking-wide ${
                  selectedDifficulty === level
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-md"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`py-1 sm:py-1.5 px-3 sm:px-4 rounded-full transition-colors duration-300 text-xs sm:text-md font-medium ${
                  selectedTags.includes(tag)
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-md"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Displaying Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full max-w-6xl mx-auto px-2 sm:px-4">
          {filteredQuestions.map((question: Question, index: number) => (
            <motion.div
              key={index}
              className="p-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuestionSelect(question)}
            >
              <QuestionCard
                title={question.title}
                description={question.description}
                difficulty={question.difficulty}
                tags={question.tags}
                onSelect={() => handleQuestionSelect(question)}
              />
            </motion.div>
          ))}
        </div>
      </SignedIn>
      <Footer />
    </div>
  );
};

export default HomePage;
