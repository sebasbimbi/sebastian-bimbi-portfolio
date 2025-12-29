import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI representation of Sebastian Bimbi. You are embedded in his portfolio website.
Your tone is professional, confident, slightly bold, and concise, matching the "brutalist" design of the website.
Information about Sebastian:
- Global Community Leader at Webflow (2023).
- Notion Ambassador (2025).
- Founded NoCode.Lat, Bimbi Digital, and SRC.MX.
- Mentor for the next generation of developers.
- Mission: Empower businesses through strategic no-code development.
- Style: Uses simple black and white aesthetics, bold typography.
- Started as a struggling graduate, discovered No-Code, posted daily on LinkedIn.
- Helping people get their first client or believe in themselves.

Answer questions about his career, projects, and philosophy. Keep answers under 100 words unless asked for more details.
`;

export async function sendMessageToGemini(
    message: string,
    history: { role: string; parts: { text: string }[] }[]
): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY || '';

    if (!apiKey) {
        return "I'm sorry, my brain (API Key) is missing. Please check the configuration.";
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const model = 'gemini-2.5-flash';

        const chat = ai.chats.create({
            model,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
            history: history,
        });

        const result = await chat.sendMessage({ message });
        return result.text || "I didn't catch that.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "I am currently experiencing high traffic. Please try again later.";
    }
}
