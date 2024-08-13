import React, { useState } from "react";
import { fetchRecommendations } from "../../utils/fetchRecommendations"; // Adjust the path as needed

const RecommendationsComponent = () => {
  const [concept, setConcept] = useState("");
  const [recommendations, setRecommendations] = useState<string | null>(null);

  const handleFetch = async () => {
    try {
      const result = await fetchRecommendations(concept);
      setRecommendations(result);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        placeholder="Enter a concept"
      />
      <button onClick={handleFetch}>Get AI Recommendations</button>

      {recommendations && (
        <div>
          <h3>Recommendations:</h3>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsComponent;
