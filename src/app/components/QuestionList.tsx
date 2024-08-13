"use client";
import React, { useEffect, useState } from "react";
import { Question } from "../../types/types";

const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Coding Questions</h2>
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <li key={question.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-semibold">{question.title}</h3>
              <p>{question.description}</p>
            </li>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </ul>
    </div>
  );
};

export default QuestionList;
