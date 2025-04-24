import { generateScript } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `write two different scripts for a 30-second video on Topic: {topic}
• Do not add scene descriptions
• Do not add anything in braces — just return the plain story in text
• Give me the response in JSON format and follow the schema:
{
  scripts: [
    {
      content: ""
    }
  ]
}`;

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = SCRIPT_PROMPT.replace("{topic}", topic);

    const result = await generateScript(prompt);

    
    const cleanText = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanText);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("🔥 API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
