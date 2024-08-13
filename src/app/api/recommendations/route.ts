import { NextApiRequest, NextApiResponse } from "next";
import { generateAIRecommendations } from "../../../utils/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  try {
    const { prompt } = req.body;
    const recommendations = await generateAIRecommendations(prompt);
    return res.status(200).json({ recommendations });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error generating recommendations", error });
  }
}
