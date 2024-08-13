import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";

type QuestionCardProps = {
  title: string;
  description: string;
  difficulty?: string; // Optional difficulty field
  tags?: string[]; // Optional tags field
  onSelect: () => void; // Callback function for when a card is selected
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  description,
  difficulty,
  tags,
  onSelect,
}) => {
  return (
    <motion.div
      className="w-full md:w-80 p-6" // Increased width and padding for larger cards
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect} // Handle click event
    >
      <Card className="p-6 shadow-lg rounded-lg bg-darkCard h-full border border-gray-700">
        <h2 className="text-xl font-semibold text-lightText mb-3">{title}</h2>{" "}
        {/* Increased text size */}
        <p className="text-gray-400 text-base mb-4">{description}</p>{" "}
        {/* Increased text size */}
        {difficulty && (
          <p className="text-sm text-lightText mb-3">
            Difficulty: {difficulty}
          </p>
        )}
        {tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
