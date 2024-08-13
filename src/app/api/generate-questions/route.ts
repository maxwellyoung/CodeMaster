import OpenAI from "openai";
import { rateLimit } from "../../../utils/rateLimit";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const rateLimitResponse = await rateLimit(request, 10);

  if (rateLimitResponse.error) {
    return NextResponse.json(
      { message: rateLimitResponse.error },
      { status: rateLimitResponse.status }
    );
  }

  const { question } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a highly skilled assistant focused on generating high-quality coding questions that test specific concepts. Provide output in a clear, concise, and well-structured format.",
        },
        {
          role: "user",
          content: `
I have the following coding question:

"${question}"

Please generate similar questions that test the same concept. The output should include:

1. A mix of direct questions and code-based challenges.
2. Clear and concise wording for each question.
3. Proper formatting with sections clearly separated by double newlines (\n\n).
4. Each question should start with "Question X:", and each challenge should start with "Challenge X:" followed by a brief context or requirement.
5. Ensure that challenges are self-contained, clearly stated, and relevant to the concept tested by the original question.
6. Keep the tone professional and instructional.
            
Here is an example of the desired output structure:

"Question 1: [Direct question about the concept]

Challenge 1: [A challenge related to the concept]

Question 2: [Another direct question]

Challenge 2: [Another challenge]"

Please ensure that the response is logically ordered and free from any formatting errors.
        `,
        },
      ],
      max_tokens: 500, // Increased token limit to allow for more detailed responses
    });

    const rawOutput = completion.choices[0].message?.content?.trim();
    const similarQuestions = rawOutput
      ?.split("\n\n") // Split by double newline to separate questions clearly
      .filter((q) => q.trim() !== ""); // Remove any empty segments

    return NextResponse.json({ similarQuestions });
  } catch (error) {
    console.error("Error in generating similar questions:", error);

    const errorMessage =
      (error as Error).message ||
      "An unknown error occurred while generating similar questions.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
