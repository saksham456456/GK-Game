import { GoogleGenAI, Type } from "@google/genai";
import { Question, Difficulty } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real application, you might want to show a friendly error to the user.
  // For this context, throwing an error is sufficient to indicate a misconfiguration.
  throw new Error("API_KEY environment variable not set. Please configure it in the environment.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const quizSchema = {
    type: Type.OBJECT,
    properties: {
        questions: {
            type: Type.ARRAY,
            description: "An array of quiz questions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The question text.",
                    },
                    options: {
                        type: Type.ARRAY,
                        description: "An array of exactly 4 possible answers.",
                        items: {
                            type: Type.STRING,
                        },
                    },
                    correctAnswer: {
                        type: Type.STRING,
                        description: "The correct answer, which must be one of the strings in the 'options' array."
                    },
                    explanation: {
                        type: Type.STRING,
                        description: "A brief explanation of why the correct answer is correct."
                    },
                },
                required: ["question", "options", "correctAnswer", "explanation"],
            },
        },
    },
    required: ["questions"],
};

export const generateQuizQuestions = async (topic: string, count: number, difficulty: Difficulty): Promise<Question[]> => {
  let prompt: string;

  if (difficulty === "Saksham's Level") {
    prompt = `Generate ${count} multiple-choice quiz questions. The topic is a challenging, diverse, and random mix of subjects including but not limited to: advanced technology, psychology, obscure world affairs, artificial intelligence principles, Indian civil services (UPSC) level trivia, complex finance concepts, and professional film editing techniques. The difficulty must be extremely hard.
Follow these rules strictly:
1. Each question must have an "options" array with exactly 4 unique string values.
2. The "correctAnswer" string must be an exact, case-sensitive match to one of the strings in the "options" array.
3. Provide a brief "explanation" for why the correct answer is correct for each question.`;
  } else {
    prompt = `Generate ${count} multiple-choice quiz questions about "${topic}" at an ${difficulty} difficulty level. Follow these rules strictly:
1. Each question must have an "options" array with exactly 4 unique string values.
2. The "correctAnswer" string must be an exact, case-sensitive match to one of the strings in the "options" array.
3. Provide a brief "explanation" for why the correct answer is correct for each question.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an AI assistant designed to create quiz questions. Your output must be a single, valid JSON object that strictly follows the user's requested schema. Do not include any markdown formatting, introductory text, or explanations outside of the JSON structure.",
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });

    const responseText = response.text.trim();
    if (!responseText) {
      throw new Error("API returned an empty response.");
    }
    
    const parsed = JSON.parse(responseText);

    if (!parsed || !Array.isArray(parsed.questions)) {
      throw new Error("Invalid data structure in API response. Expected an object with a 'questions' array.");
    }

    // Robust validation to ensure the data is well-formed and usable
    const validQuestions = parsed.questions.filter((q: any): q is Question =>
      q &&
      typeof q.question === 'string' && q.question.trim().length > 0 &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      q.options.every((opt: any) => typeof opt === 'string') &&
      typeof q.correctAnswer === 'string' &&
      q.options.includes(q.correctAnswer) &&
      typeof q.explanation === 'string' && q.explanation.trim().length > 0
    );
    
    if (validQuestions.length < parsed.questions.length) {
      console.warn("Some questions returned by the API were malformed and filtered out.");
    }

    if (validQuestions.length === 0) {
      throw new Error("API returned valid JSON but with no usable questions.");
    }
    
    return validQuestions;

  } catch (error) {
    console.error("Error generating quiz questions with Gemini API:", error);
    
    let userMessage = "Failed to generate quiz questions. The topic might be too specific or the API is unavailable.";

    if (error instanceof SyntaxError) {
      userMessage = "Failed to parse the data from the API. Please try again.";
    } else if (error instanceof Error) {
        if (error.message.includes('429')) {
            userMessage = "API rate limit exceeded. Please wait a moment and try again.";
        } else if (error.message.includes("no usable questions")) {
            userMessage = "The AI couldn't create a valid quiz for this topic. Please try a different or broader topic.";
        } else if (/(500|503|504)/.test(error.message)) {
            userMessage = "The AI service is temporarily unavailable. Please try again later.";
        }
    }
    
    throw new Error(userMessage);
  }
};