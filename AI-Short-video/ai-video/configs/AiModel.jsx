import { GoogleGenAI } from "@google/genai";

export async function generateScript(prompt) {
  console.log("generateScript function called with prompt:", prompt);

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const config = {
    responseMimeType: "application/json",
  };

  const model = "models/gemini-2.5-pro-exp-03-25";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `write a two different script for 30 seconds video on Topic:Kids Story

• Do not add Scene description
• Do not Add Anything in Braces ,Just return the plain story in text 
• Give me response in JSON Format and follow the schema 
-{
script:[
{
content:""
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
      console.log("Sending request to AI model...");

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      const resultText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (!resultText) throw new Error("Empty response from AI");

      console.log("Raw AI response:", resultText);

      const cleaned = resultText.replace(/```json|```/g, "").trim();

      const parsed = JSON.parse(cleaned);

      return parsed;

    } catch (error) {
      const isQuotaError = error?.message?.includes("RESOURCE_EXHAUSTED") || error?.status === 429;

      if (isQuotaError && attempt < maxRetries - 1) {
        console.warn(`Quota exceeded. Retrying in 60 seconds... (Attempt ${attempt + 1})`);
        await new Promise(res => setTimeout(res, 60000));
        attempt++;
      } else {
        console.error("Failed to generate script:", error);
        throw error;
      }
    }
  }
}
