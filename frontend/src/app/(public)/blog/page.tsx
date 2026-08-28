import { db } from "@/db";
import { posts, adPlacements } from "@/db/schema";
import { eq, desc, and, ilike, or } from "drizzle-orm";
import { sql } from "drizzle-orm";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import { CATEGORIES, CATEGORY_BG } from "@/lib/utils";

type SearchParams = Promise<{ page?: string; category?: string; search?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const cat = sp.category || "";
  return {
    title: cat ? `${cat} Articles` : "All Articles",
    description: `Browse all Canadian immigration articles${cat ? ` in ${cat}` : ""}.`,
  };
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const page = parseInt(sp.page || "1");
  const limit = 12;
  const offset = (page - 1) * limit;
  const categoryFilter = sp.category || "";
  const searchQuery = sp.search || "";

  const conditions = [eq(posts.published, true)];
  if (categoryFilter) conditions.push(eq(posts.category, categoryFilter));
  if (searchQuery) {
    conditions.push(
      or(ilike(posts.title, `%${searchQuery}%`), ilike(posts.excerpt, `%${searchQuery}%`)) as ReturnType<typeof eq>
    );
  }

  const where = and(...conditions);

  const [rows, countResult, ads] = await Promise.all([
    db.select().from(posts).where(where).orderBy(desc(posts.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(posts).where(where),
    db.select().from(adPlacements).where(eq(adPlacements.isActive, true)),
  ]);

  const total = Number(countResult[0]?.count || 0);
  const totalPages = Math.ceil(total / limit);
  const sidebarAd = ads.find((a) => a.name.toLowerCase().includes("sidebar"));
  const headerAd = ads.find((a) => a.name.toLowerCase().includes("header"));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#1a1a2e] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            {categoryFilter ? `${categoryFilter} Articles` : "All Articles"}
          </h1>
          <p className="text-gray-400">{total.toLocaleString()} articles found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Ad */}
        {headerAd && (
          <div className="mb-6">
            <AdSlot code={headerAd.adsterraCode} name={headerAd.name} type="leaderboard" />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <form method="GET" className="flex-1 min-w-[200px]">
              {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  name="search"
                  defaultValue={searchQuery}
                  placeholder="Search articles…"
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </form>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${!categoryFilter ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                All
              </Link>
              {CATEGORIES.filter((c) => c !== "General").map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${categoryFilter === cat ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  style={categoryFilter === cat ? { backgroundColor: CATEGORY_BG[cat] } : {}}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {rows.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-3">🔍</p>
                <p className="text-xl font-medium mb-2">No articles found</p>
                <p className="text-sm">Try a different search term or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rows.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${categoryFilter ? `&category=${encodeURIComponent(categoryFilter)}` : ""}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                      p === page ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            {sidebarAd && (
              <div className="mb-6">
                <AdSlot code={sidebarAd.adsterraCode} name={sidebarAd.name} type="rectangle" />
              </div>
            )}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.filter((c) => c !== "General").map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_BG[cat] }} />
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-5 mt-4">
              <h3 className="font-bold text-red-800 mb-2">⚡ Quick Tip</h3>
              <p className="text-sm text-red-700">
                Canada&apos;s 2025 immigration targets are at record highs. Check Express Entry draws regularly for your best chances.
              </p>
              <Link
                href="/category/express-entry"
                className="inline-block mt-3 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Learn More →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
