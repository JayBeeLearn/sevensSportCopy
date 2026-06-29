"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function submitComment(prevState: any, formData: FormData) {
  const postId = formData.get("postId") as string;
  const content = formData.get("content") as string;
  const guestName = formData.get("guestName") as string | null;

  if (!content || content.trim() === "") {
    return { success: false, error: "Comment cannot be empty." };
  }

  // Guest posts are automatically approved as requested
  await prisma.comment.create({
    data: {
      post_id: postId,
      content: content.trim(),
      guest_name: guestName || "Anonymous",
      is_approved: true // Automatically approved without moderation
    }
  });

  revalidatePath(`/[category]/${postId}`, "page");
  
  return { 
    success: true, 
    message: "Your comment has been posted!" 
  };
}
