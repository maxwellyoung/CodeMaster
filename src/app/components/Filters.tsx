import React from "react";

type FiltersProps = {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueTags: string[];
};

const Filters: React.FC<FiltersProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedTags,
  setSelectedTags,
  uniqueTags,
}) => {
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags: string[]) => {
      return prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
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
            onClick={() => setSelectedLanguage(lang)}
            className={`py-2 px-5 rounded-full transition-colors duration-300 ${
              selectedLanguage === lang
                ? "bg-primary text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 justify-center mb-6">
        {["All", "Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedDifficulty(level)}
            className={`py-2 px-5 rounded-full transition-colors duration-300 ${
              selectedDifficulty === level
                ? "bg-primary text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagToggle(tag)}
            className={`py-1 px-4 rounded-full transition-colors duration-300 ${
              selectedTags.includes(tag)
                ? "bg-primary text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
