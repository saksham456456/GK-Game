
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Question, Difficulty } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
                        description: "The question text. Should be engaging and clear."
                    },
                    options: {
                        type: Type.ARRAY,
                        description: "An array of 4 possible answers.",
                        items: {
                            type: Type.STRING
                        }
                    },
                    correctAnswer: {
                        type: Type.STRING,
                        description: "The correct answer from the options array."
                    },
                    explanation: {
                        type: Type.STRING,
                        description: "A brief, clear explanation for why the correct answer is right. This should be educational and concise."
                    }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
            }
        }
    },
    required: ["questions"]
};

export const generateQuizQuestions = async (topic: string, count: number, difficulty: Difficulty): Promise<Question[]> => {
    let prompt;

    if (difficulty === "Saksham's Level") {
        prompt = `Generate ${count} multiple-choice quiz questions. The topic is a challenging, diverse, and random mix of advanced science, obscure history, deep technology, complex art, and mind-bending trivia. The questions should be extremely difficult, designed to stump even experts. They should be unpredictable and cover a wide range of subjects. Ensure the questions are unique and not simple trivia. Provide a detailed explanation for each correct answer.`;
    } else {
        prompt = `Generate ${count} multiple-choice quiz questions about "${topic}" at an ${difficulty} difficulty level. The questions should be well-formed, clear, and relevant to the topic. Provide a concise explanation for each correct answer.`;
    }

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are an AI assistant designed to create quiz questions. Your goal is to generate a set of multiple-choice questions based on the user's specified topic, count, and difficulty. Each question must have exactly 4 options. For each question, provide a correct answer and a brief, clear explanation. Ensure the output is a valid JSON object following the provided schema.",
                responseMimeType: "application/json",
                responseSchema: quizSchema,
            },
        });

        const parsed = JSON.parse(response.text.trim());

        if (!parsed || !Array.isArray(parsed.questions)) {
            throw new Error("Invalid data structure from API. Expected an object with a 'questions' array.");
        }

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
            console.warn("Some questions from the API were malformed and filtered out.");
        }
        
        if (validQuestions.length === 0) {
            throw new Error("API returned no usable questions.");
        }

        return validQuestions;
    } catch (error) {
        console.error("Error generating quiz questions:", error);
        throw new Error("Failed to generate quiz questions. The API might be unavailable or the topic is too specific. Please try again with a different topic.");
    }
};
