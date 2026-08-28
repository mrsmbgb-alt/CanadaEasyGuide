import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts, adPlacements } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [totalPosts] = await db.select({ count: sql<number>`count(*)` }).from(posts);
  const [publishedPosts] = await db
    .select({ count: sql<number>`count(*)` })
    .from(posts)
    .where(eq(posts.published, true));
  const [totalViews] = await db.select({ sum: sql<number>`coalesce(sum(views), 0)` }).from(posts);
  const [activeAds] = await db
    .select({ count: sql<number>`count(*)` })
    .from(adPlacements)
    .where(eq(adPlacements.isActive, true));

  const topPosts = await db
    .select({ id: posts.id, title: posts.title, slug: posts.slug, views: posts.views, category: posts.category })
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.views))
    .limit(5);

  const recentPosts = await db
    .select({ id: posts.id, title: posts.title, slug: posts.slug, published: posts.published, createdAt: posts.createdAt })
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(5);

  return NextResponse.json({
    stats: {
      totalPosts: Number(totalPosts?.count || 0),
      publishedPosts: Number(publishedPosts?.count || 0),
      totalViews: Number(totalViews?.sum || 0),
      activeAds: Number(activeAds?.count || 0),
    },
    topPosts,
    recentPosts,
  });
}
