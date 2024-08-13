import React, { useState } from "react";
import { Question } from "../../types/types";

const QuestionDetail = ({ question }: { question: Question }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (userAnswer.trim() === question.solution.trim()) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try Again!");
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{question.title}</h2>
      <p>{question.description}</p>
      <textarea
        className="w-full mt-4 p-2 border rounded"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type your solution here..."
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit Answer
      </button>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
};

export default QuestionDetail;
