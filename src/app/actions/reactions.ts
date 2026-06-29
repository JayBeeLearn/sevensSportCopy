"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export type ReactionType = "like" | "fire" | "goal" | "shock";

export async function toggleReaction(postId: string, type: ReactionType) {
  const cookieStore = await cookies();
  let sessionHash = cookieStore.get("reaction_session")?.value;

  if (!sessionHash) {
    sessionHash = randomUUID();
    cookieStore.set("reaction_session", sessionHash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
  }

  // Check if reaction already exists for this session
  const existingReaction = await prisma.reaction.findFirst({
    where: {
      post_id: postId,
      type,
      session_hash: sessionHash,
    },
  });

  if (existingReaction) {
    // Toggle off
    await prisma.reaction.delete({
      where: { id: existingReaction.id },
    });
  } else {
    // Toggle on
    await prisma.reaction.create({
      data: {
        post_id: postId,
        type,
        session_hash: sessionHash,
      },
    });
  }

  // Revalidate the current post path so other users see the updated count
  revalidatePath(`/[category]/${postId}`, "page");
  
  return { success: true, type, action: existingReaction ? "removed" : "added" };
}
