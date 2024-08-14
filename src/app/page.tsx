"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabase/client";
import QuestionForm from "./components/QuestionForm";
import QuestionCard from "./components/QuestionCard";
import Footer from "./components/Footer";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

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
        <div className="w-full max-w-4xl mx-auto p-6 sm:p-12">
          <QuestionForm
            initialCode={selectedQuestion}
            initialRemainingRequests={remainingRequests}
            onRequestsChange={setRemainingRequests}
          />
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-center mt-8 sm:mt-10 mb-6 sm:mb-8 text-gray-900 dark:text-gray-200 tracking-tight">
          Example Coding Questions
        </h2>

        {/* Filters and Questions Container */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          <div className="flex flex-col gap-4 md:w-1/4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Filters
            </h3>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Language
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["All", "JavaScript", "Python", "SQL", "CSS"].map(
                  (language) => (
                    <button
                      key={language}
                      onClick={() => handleLanguageSelect(language)}
                      className={`py-1 px-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedLanguage === language
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {language}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Difficulty
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["All", "Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleDifficultySelect(level)}
                    className={`py-1 px-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedDifficulty === level
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Tags
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {uniqueTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to CodeMaster
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Please sign in to access your coding practice tool.
          </p>
          <SignInButton>
            <button className="py-3 px-6 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-all">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <Footer />
    </div>
  );
};

export default HomePage;
