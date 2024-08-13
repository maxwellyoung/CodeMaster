import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import QuestionCard from "./QuestionCard";

type QuestionFormProps = {
  initialCode?: string | null;
};

const QuestionForm: React.FC<QuestionFormProps> = ({ initialCode }) => {
  const [question, setQuestion] = useState(initialCode || "");
  const [similarQuestions, setSimilarQuestions] = useState<
    { title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    const remainingRequests = 0; // This should be dynamically set based on your app logic
    if (remainingRequests <= 0) {
      toast({
        title: "Limit Reached",
        description: "You have no remaining requests for today.",
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
      if (textareaRef.current) {
        textareaRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error generating similar questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSelect = (selectedQuestion: string) => {
    setQuestion(selectedQuestion);
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <motion.div
        className="w-full max-w-4xl p-8 bg-[#FCFCFC] dark:bg-[#1A1A1A] rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-[#171717] dark:text-white">
              CodeMaster
            </h1>
            <p className="text-[#232323] dark:text-white/90 text-lg font-light">
              Your AI-Powered Coding Practice Tool
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg text-[#232323] dark:text-white/90">
              Current Plan:
            </span>
            <span className="block text-xl font-bold text-[#6466F1]">Free</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your coding question here..."
            rows={6}
            className="w-full p-4 text-lg border-none rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-[#f8f8f8] dark:bg-[#141414] text-[#171717] dark:text-white placeholder-[#666666] dark:placeholder-[#D9D9D9]"
          />
          <Button
            type="submit"
            className="w-full py-3 text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out transform bg-gradient-to-r from-[#FF6B00] to-[#FF5C00] hover:-translate-y-1 hover:shadow-2xl text-white dark:bg-[#DD5D1D] dark:hover:bg-[#D14600]"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get Similar Questions"}
          </Button>
        </form>

        {similarQuestions.length > 0 && (
          <motion.div
            className="mt-10 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-medium text-[#171717] dark:text-white mb-4">
              Similar Questions
            </h3>
            <div className="space-y-6">
              {similarQuestions.map((q, index) => (
                <QuestionCard
                  key={index}
                  title={q.title}
                  description={q.description}
                  onSelect={() => handleQuestionSelect(q.title)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default QuestionForm;
