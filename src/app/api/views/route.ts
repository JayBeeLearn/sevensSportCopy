import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    // In a real application, connect to Prisma to update post view counts
    // await prisma.post.update({
    //   where: { slug: postId },
    //   data: { views: { increment: 1 } }
    // });

    return NextResponse.json({ success: true, postId });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
