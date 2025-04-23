import { GoogleGenAI } from "@google/genai";

export async function generateScript(prompt) {
  console.log("generateScript function called with prompt:", prompt);

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const config = {
    responseMimeType: "application/json",
  };

  const model = "models/gemini-2.5-pro-exp-03-25"; // ✅ Correct free-tier compatible model

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `write two different scripts for a 30-second video on the topic: Kids Story

• Do not add Scene description
• Do not Add Anything in Braces, just return the plain story in text 
• Give me the response in JSON format and follow this schema: 
{
  "script": [
    {
      "content": ""
    }
  ]
}`,
        },
      ],
    },
  ];

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      console.log(`Sending request to Gemini model (Attempt ${attempt + 1})...`);

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      // Extract raw response text from Gemini
      const raw = response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!raw || typeof raw !== "string") {
        throw new Error("Unexpected AI response format.");
      }

      console.log("Raw AI response:", raw);

      // Remove code block wrappers if they exist
      const cleaned = raw.replace(/```json|```/g, "").trim();

      // Try to parse it into JSON
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (e) {
        console.error("Failed to parse cleaned text as JSON:", cleaned);
        throw new Error("AI response is not valid JSON.");
      }

      return parsed;

    } catch (error) {
      const isQuotaError =
        error?.message?.includes("RESOURCE_EXHAUSTED") || error?.status === 429;

      if (isQuotaError && attempt < maxRetries - 1) {
        console.warn(`Quota exceeded. Retrying in 60 seconds... (Attempt ${attempt + 1})`);
        await new Promise((res) => setTimeout(res, 60000));
        attempt++;
      } else {
        console.error("Failed to generate script:", error);
        throw error;
      }
    }
  }
}
