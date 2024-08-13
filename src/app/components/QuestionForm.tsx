"use client";

import React, { useState, useEffect, useRef, RefObject } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "../components/ui/use-toast";

type QuestionFormProps = {
  initialCode?: string | null;
  textareaRef?: RefObject<HTMLTextAreaElement>;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
  initialCode,
  textareaRef,
}) => {
  const [question, setQuestion] = useState(initialCode || "");
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialCode) {
      setQuestion(initialCode);
    }
  }, [initialCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coding question.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setSimilarQuestions(data.similarQuestions || []);
      if (textareaRef?.current) {
        textareaRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error generating similar questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-full max-w-3xl p-8 bg-darkCard rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          CodeMaster
        </h1>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-light tracking-tight first:mt-0 mb-8">
          Your AI-Powered Coding Practice Tool
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your coding question here..."
            rows={6}
            className="w-full p-4 text-lg border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-darkCard text-lightText"
          />
          <Button
            type="submit"
            className="w-full py-3 bg-primary text-white text-lg rounded-md shadow-glow transition-all hover:bg-primaryHover"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get Similar Questions"}
          </Button>
        </form>

        {similarQuestions.length > 0 && (
          <motion.div
            className="mt-10 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-medium text-lightText mb-4">
              Similar Questions
            </h3>
            <ul className="space-y-6">
              {similarQuestions.map((q, index) => (
                <motion.li
                  key={index}
                  className="p-4 bg-darkCard rounded-lg shadow-sm space-y-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <span className="text-xl font-bold text-primary">
                        {index + 1}.
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-lg text-lightText">
                        {q.split("\n").map((line, idx) => (
                          <span key={idx} className={`block`}>
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default QuestionForm;
