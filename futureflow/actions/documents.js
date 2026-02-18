"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// --- DOCUMENTS ---

export async function addDocument(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const doc = await db.document.create({
    data: {
      userId: user.id,
      name: data.name,
      type: data.type,
      content: data.content, // Base64 or Text
      fileType: data.fileType,
    },
  });

  return doc;
}

export async function getDocuments() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) throw new Error("User not found");
  
    return await db.document.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
}

export async function deleteDocument(id) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    // Ensure ownership
    const doc = await db.document.findFirst({
        where: { id: id, user: { clerkUserId: userId } }
    });

    if (!doc) throw new Error("Not found");

    await db.document.delete({ where: { id: id } });
    return { success: true };
}
