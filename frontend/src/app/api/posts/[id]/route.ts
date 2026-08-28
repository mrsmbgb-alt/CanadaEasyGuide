import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

// GET /api/posts/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNumeric = /^\d+$/.test(id);

  const [post] = isNumeric
    ? await db.select().from(posts).where(eq(posts.id, parseInt(id))).limit(1)
    : await db.select().from(posts).where(eq(posts.slug, id)).limit(1);

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Increment views for public access
  const session = await getAdminSession();
  if (!session) {
    await db
      .update(posts)
      .set({ views: post.views + 1 })
      .where(eq(posts.id, post.id));
  }

  return NextResponse.json({ post });
}

// PUT /api/posts/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  const updateData: Partial<typeof posts.$inferInsert> = {
    title: data.title,
    slug: data.slug || generateSlug(data.title),
    excerpt: data.excerpt,
    body: data.body,
    coverImage: data.coverImage,
    category: data.category,
    tags: data.tags,
    published: data.published,
    featured: data.featured,
    author: data.author,
    updatedAt: new Date(),
  };

  const [post] = await db
    .update(posts)
    .set(updateData)
    .where(eq(posts.id, parseInt(id)))
    .returning();

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

// DELETE /api/posts/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.delete(posts).where(eq(posts.id, parseInt(id)));
  return NextResponse.json({ success: true });
}
