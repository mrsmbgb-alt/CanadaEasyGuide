"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import { CATEGORIES, CATEGORY_BG } from "@/lib/utils";
import { getActiveAds, getPublishedPosts, getCategorySlug } from "@/lib/posts";

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFilter = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  const posts = useMemo(() => {
    let list = getPublishedPosts();
    if (categoryFilter) list = list.filter((p) => p.category === categoryFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.tags || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [categoryFilter, searchQuery]);

  const ads = getActiveAds();
  const sidebarAd = ads.find((a) => a.name.toLowerCase().includes("sidebar"));
  const headerAd = ads.find((a) => a.name.toLowerCase().includes("header"));

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const q = String(form.get("search") || "").trim();
    const params = new URLSearchParams();
    if (categoryFilter) params.set("category", categoryFilter);
    if (q) params.set("search", q);
    router.push(`/blog${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#1a1a2e] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            {categoryFilter ? `${categoryFilter} Articles` : "All Articles"}
          </h1>
          <p className="text-gray-400">{posts.length.toLocaleString()} articles found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {headerAd && (
          <div className="mb-6">
            <AdSlot code={headerAd.adsterraCode} name={headerAd.name} type="leaderboard" />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <form onSubmit={submitSearch} className="flex-1 min-w-[200px]">
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
              {CATEGORIES.filter((c) => c !== "General").map((cat) => {
                const slug = getCategorySlug(cat);
                return (
                  <Link
                    key={cat}
                    href={`/category/${slug}`}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${categoryFilter === cat ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    style={categoryFilter === cat ? { backgroundColor: CATEGORY_BG[cat] } : {}}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {posts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-3">🔍</p>
                <p className="text-xl font-medium mb-2">No articles found</p>
                <p className="text-sm">Try a different search term or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
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
                {CATEGORIES.filter((c) => c !== "General").map((cat) => {
                  const slug = getCategorySlug(cat);
                  return (
                    <li key={cat}>
                      <Link
                        href={`/category/${slug}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_BG[cat] }} />
                        {cat}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-5 mt-4">
              <h3 className="font-bold text-red-800 mb-2">⚡ Quick Tip</h3>
              <p className="text-sm text-red-700">
                Canada has kept permanent resident targets high in recent years. Check Express Entry draws regularly for your best chances.
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

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <BlogContent />
    </Suspense>
  );
}
