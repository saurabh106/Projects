"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateWithGemini } from "@/app/lib/gemini";


export async function generateNetworkingMessage(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
      name: true,
      industry: true,
      skills: true,
      experience: true,
      bio: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Generate a concise and professional networking message (LinkedIn connection request or email) for a ${
      user.industry || "professional"
    }.
    
    User Context:
    - Name: ${user.name || "A professional"}
    - Skills: ${user.skills?.join(", ") || "various skills"}
    - Experience: ${
      user.experience ? user.experience + " years" : "Not specific"
    }

    Recipient:
    - Name: ${data.recipientName}
    - Role: ${data.recipientRole}
    - Company: ${data.recipientCompany}
    - Goal: ${data.purpose}

    Instructions:
    - If "Connection Request", keep it under 300 characters strictly.
    - If "Email" or "Message", keep it concise but engaging.
    - Be professional, polite, and value-oriented.
    - Do not include placeholders like "[Your Name]" - use the provided name.

    Return the message text only.
  `;

  try {
    const rawText = await generateWithGemini(prompt);

let message = rawText
  .replace(/```/g, "")
  .replace(/["`]/g, "")
  .trim();


    // Fallback if AI returns empty
    if (!message || message.length < 5) {
      message = `Hi ${data.recipientName}, I came across your work at ${data.recipientCompany} and would love to connect and learn from your experience in ${data.recipientRole}.`;
    }

    // Save to DB (non-blocking)
    try {
      await db.networkingMessage.create({
        data: {
          userId: user.id,
          recipientName: data.recipientName,
          recipientRole: data.recipientRole,
          recipientCompany: data.recipientCompany,
          purpose: data.purpose,
          generatedContent: message,
        },
      });
    } catch (dbError) {
      console.error(
        "Failed to save networking message to DB:",
        dbError
      );
    }

    return message;
  } catch (error) {
    console.error("Error generating networking message:", error);

    // ✅ Graceful fallback (no 500 crash)
    return `Hi ${data.recipientName}, I’d love to connect and learn more about your work at ${data.recipientCompany}. Looking forward to connecting!`;
  }
}

export async function getNetworkingMessages() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    return await db.networkingMessage.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching networking messages:", error);
    throw new Error("Failed to fetch networking messages");
  }
}
