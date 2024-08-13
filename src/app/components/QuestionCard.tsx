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
      className="w-full p-6"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect} // Handle click event
    >
      <Card className="p-6 shadow-lg rounded-lg bg-darkCard h-full border border-gray-700">
        <h2 className="text-xl font-semibold text-lightText mb-1">{title}</h2>
        <p className="text-gray-400 text-sm mb-2">{description}</p>
        {difficulty && (
          <p className="text-sm text-lightText mb-1">
            Difficulty: {difficulty}
          </p>
        )}
        {tags && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs"
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
