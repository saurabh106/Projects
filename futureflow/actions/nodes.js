"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// --- CONTACTS ---

export async function addContact(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const contact = await db.contact.create({
    data: {
      userId: user.id,
      name: data.name,
      role: data.role,
      company: data.company,
      type: data.type,
      status: "Cold", 
    },
  });

  return contact;
}

export async function getContacts() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) throw new Error("User not found");
  
    return await db.contact.findMany({
      where: { userId: user.id },
      include: {
        interactions: {
            orderBy: { date: 'desc' }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
}

// --- INTERACTIONS ---

export async function logInteraction(contactId, data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    // Create the interaction
    await db.interaction.create({
        data: {
            contactId,
            type: data.type, // "Email", "Call"
            notes: data.notes,
            date: new Date(),
        }
    });

    // Update the contact's status and lastContact date
    // Logic: If you interact, it becomes at least "Warm"
    await db.contact.update({
        where: { id: contactId },
        data: {
            lastContact: new Date(),
            status: "Warm", 
        }
    });

    return { success: true };
}
