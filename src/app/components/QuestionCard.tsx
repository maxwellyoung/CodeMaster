import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";

type QuestionCardProps = {
  title: string;
  description: string;
  difficulty?: string;
  tags?: string[];
  onSelect: () => void;
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
      className="w-full p-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
    >
      <Card className="p-6 shadow-lg rounded-xl bg-gradient-to-r from-gray-800 via-gray-900 to-black border border-gray-200 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
        <p className="text-gray-400 text-sm mb-2">{description}</p>
        {difficulty && (
          <p className="text-sm text-gray-400 mb-1">
            Difficulty:{" "}
            <span className="font-medium text-primary">{difficulty}</span>
          </p>
        )}
        {tags && (
          <div className="flex flex-wrap gap-2 mb-2">
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
