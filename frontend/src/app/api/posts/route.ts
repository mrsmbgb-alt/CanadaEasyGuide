import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc, ilike, and, or, sql } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

// GET /api/posts - public list (published only unless admin)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const featured = searchParams.get("featured") === "true";
  const adminMode = searchParams.get("admin") === "true";
  const offset = (page - 1) * limit;

  // Admin mode requires auth
  if (adminMode) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conditions = [];
  if (!adminMode) conditions.push(eq(posts.published, true));
  if (category) conditions.push(eq(posts.category, category));
  if (featured) conditions.push(eq(posts.featured, true));
  if (search) {
    conditions.push(
      or(
        ilike(posts.title, `%${search}%`),
        ilike(posts.excerpt, `%${search}%`),
        ilike(posts.tags, `%${search}%`)
      )
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, countResult] = await Promise.all([
    db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        coverImage: posts.coverImage,
        category: posts.category,
        tags: posts.tags,
        published: posts.published,
        featured: posts.featured,
        views: posts.views,
        author: posts.author,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .where(where)
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(posts).where(where),
  ]);

  const total = Number(countResult[0]?.count || 0);

  return NextResponse.json({
    posts: rows,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

// POST /api/posts - create post (admin only)
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const slug = data.slug || generateSlug(data.title);

    const [post] = await db
      .insert(posts)
      .values({
        title: data.title,
        slug,
        excerpt: data.excerpt || "",
        body: data.body || "",
        coverImage: data.coverImage || "",
        category: data.category || "General",
        tags: data.tags || "",
        published: data.published ?? false,
        featured: data.featured ?? false,
        author: data.author || session.name,
      })
      .returning();

    return NextResponse.json({ post }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create post";
    if (msg.includes("unique")) {
      return NextResponse.json({ error: "Slug already exists. Use a different title." }, { status: 409 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
