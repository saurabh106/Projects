import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let cachedModel = null;

async function getWorkingModel() {
  if (cachedModel) return cachedModel;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await res.json();

    const modelName =
      data.models.find(
        (m) =>
          m.name.includes("gemini") &&
          m.supportedGenerationMethods?.includes("generateContent")
      )?.name?.split("/").pop() || "gemini-1.5-flash";

    cachedModel = genAI.getGenerativeModel({ model: modelName });

    console.log("Using Gemini model:", modelName);

    return cachedModel;
  } catch (err) {
    console.error("Auto model detection failed:", err);

    cachedModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    return cachedModel;
  }
}

export async function generateWithGemini(prompt) {
  const model = await getWorkingModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
}
