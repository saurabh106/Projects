"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateWithGemini } from "@/app/lib/gemini";

export async function analyzeSkillGap(targetRole) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
      skills: true,
      industry: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Conduct a skill gap analysis for a user targeting "${targetRole}" in the "${
      user.industry || "Technology"
    }" industry.

    User's Current Skills: ${user.skills?.length ? user.skills.join(", ") : "Not specified"}

    Task:
    1. Identify 3 critical missing skills or areas of improvement needed for this target role.
    2. Suggest a specific learning resource (book, course, or project) for each gap.
    3. Provide a realistic specialized timeframe to acquire these skills.

    Return the response in this strictly JSON format:
    {
      "missingSkills": ["string", "string", "string"],
      "actionPlan": [
        {
          "skill": "string",
          "resource": "string",
          "timeframe": "string",
          "todo": "string (Actionable step)" 
        }
      ]
    }
  `;

  try {
   const rawText = await generateWithGemini(prompt);

const cleaned = rawText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const start = cleaned.indexOf("{");
const end = cleaned.lastIndexOf("}") + 1;

const analysis = JSON.parse(cleaned.slice(start, end));


    await db.skillGapAnalysis.create({
      data: {
        userId: user.id,
        targetRole,
        currentSkills: user.skills || [],
        missingSkills: analysis.missingSkills,
        actionPlan: analysis.actionPlan,
      },
    });

    return analysis;
  } catch (error) {
  console.error("Error analyzing skill gap:", error);

  return {
    missingSkills: [],
    actionPlan: [],
  };
}
}
export async function getSkillGapAnalyses() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    return await db.skillGapAnalysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching skill gap analyses:", error);
    throw new Error("Failed to fetch assessments");
  }
}
