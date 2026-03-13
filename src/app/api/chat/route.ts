import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// Note: You need to set GEMINI_API_KEY in your .env.local file
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const systemPrompt = `You are an AI Safety Assistant for a DeepFake Identity Guard platform. 
    Your goal is to help users who are concerned that their images might be manipulated or used as deepfakes.
    Provide calm, supportive, and actionable advice. Keep your responses concise (under 200 words).
    Suggest steps like saving evidence, reporting to the platform, adjusting privacy settings, or contacting authorities if threatened.
    Do not provide legal advice, but refer them to appropriate resources.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response. Please check your API key and try again." },
      { status: 500 }
    );
  }
}
