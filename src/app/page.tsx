"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import QuestionForm from "./components/QuestionForm";
import QuestionCard from "./components/QuestionCard";
import { supabase } from "../utils/supabase/client";
import {
  fetchRemainingRequests,
  fetchSubscriptionStatus,
} from "../utils/userInfo";
import SubscriptionSection from "./components/SubscriptionSection";
import RemainingRequests from "./components/RemainingRequests";

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
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("free");

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      const remaining = await fetchRemainingRequests();
      const status = await fetchSubscriptionStatus();

      setRemainingRequests(remaining);
      setSubscriptionStatus(status);
    };
    fetchUserInfo();
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
    <div className="min-h-screen flex flex-col items-center p-8 bg-dark-gradient space-y-12">
      <QuestionForm initialCode={selectedQuestion} />
      <h2 className="text-4xl font-extrabold text-center mt-10 mb-8 text-lightText tracking-tight">
        Example Coding Questions
      </h2>

      {/* Remaining Requests and Subscription Status */}
      <RemainingRequests count={remainingRequests} />
      <SubscriptionSection status={subscriptionStatus} />

      {/* Filters Container with Max Width */}
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Language Filter */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "All",
            "JavaScript",
            "Python",
            "Go",
            "Ruby",
            "Java",
            "C++",
            "HTML/CSS",
          ].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={`py-2 px-5 rounded-full transition-colors duration-300 text-lg font-medium tracking-wide ${
                selectedLanguage === lang
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex justify-center gap-4">
          {["All", "Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => handleDifficultySelect(level)}
              className={`py-2 px-5 rounded-full transition-colors duration-300 text-lg font-medium tracking-wide ${
                selectedDifficulty === level
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`py-1.5 px-4 rounded-full transition-colors duration-300 text-md font-medium ${
                selectedTags.includes(tag)
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Displaying Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
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
  );
};

export default HomePage;
