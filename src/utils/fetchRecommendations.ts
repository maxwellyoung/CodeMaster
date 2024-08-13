// src/utils/fetchRecommendations.ts
export const fetchRecommendations = async (concept: string) => {
  const response = await fetch("/api/recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ concept }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  const data = await response.json();
  return data.recommendations;
};
