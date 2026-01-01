
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the AI Educational Counselor for Love and Serve Christian School Inc. (LSCSI). 
Your tone is warm, encouraging, professional, and Christ-centered.
LSCSI is a school dedicated to "Nurturing Hearts, Inspiring Minds" based in Antipolo, Rizal, Philippines.
It was established in 2014 by LASANII (Love and Serve All Nations International Inc.).
Core Values: Love, Serve, Faith.
Curriculum levels: Preschool, Elementary, Junior High, Senior High.
Philosophy: Belief in God as Creator, Belief in man's special purpose, and dedication to academic excellence & patriotism.
Bible Verse: "Train up a child in the way he should go, and when he is old he will not depart from it." - Proverbs 22:6.

Answer questions about admissions, school life, history (established 2014), and Christian education. 
If asked about deep academic specifics, encourage the user to use the "Contact Us" button to reach out to the administration.
Keep responses concise but heartfelt.
`;

export const getCounselorResponse = async (history: ChatMessage[], message: string) => {
  const chat = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
      ...history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ],
  });

  const response = await chat;
  return response.text || "I'm sorry, I'm having trouble connecting right now. Please try again or contact the school directly.";
};
