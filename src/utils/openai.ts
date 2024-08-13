import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIRecommendations = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Make sure this model exists and is correct
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const content = response.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("No content returned from AI");
    }

    return content;
  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    throw new Error("Failed to generate AI recommendations");
  }
};
