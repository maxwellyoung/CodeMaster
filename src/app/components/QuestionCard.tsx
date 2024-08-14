import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";

type QuestionCardProps = {
  title: string;
  description: string;
  difficulty?: string;
  tags?: string[];
  onSelect: (description: string) => void;
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
      className="p-4 w-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(description)}
    >
      <Card className="p-6 shadow-lg rounded-xl bg-white dark:bg-[#1C1C1E] border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-shadow h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
              {difficulty && (
                <div className="inline-block select-none rounded-full bg-[#FFF2F6] px-3 py-1 text-[12px] font-medium text-[#FF0342] dark:bg-[#0DFFC5]/5 dark:text-[#0DFFC5]">
                  {difficulty}
                </div>
              )}
            </div>
            <p className="text-gray-700 dark:text-gray-400 text-sm mt-4">
              {description}
            </p>
          </div>
          {tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
