import { getPublishedPosts, getPostsByCategory, getCategoryFromSlug, getActiveAds, getCategorySlug } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import { CATEGORY_BG, CATEGORIES } from "@/lib/utils";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return CATEGORIES.filter((c) => c !== "General").map((cat) => ({
    slug: getCategorySlug(cat),
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryFromSlug(slug);
  return {
    title: `${category} – Canada Immigration Guide`,
    description: `Browse all articles about ${category} in Canada. Expert immigration guides, tips, and news.`,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const category = getCategoryFromSlug(slug);
  const rows = getPostsByCategory(category);
  const ads = getActiveAds();
  const headerAd = ads.find((a) => a.name.toLowerCase().includes("header"));
  const sidebarAd = ads.find((a) => a.name.toLowerCase().includes("sidebar"));
  const catColor = CATEGORY_BG[category] || "#607d8b";
  const allCategories = CATEGORIES.filter((c) => c !== "General");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="py-14 px-4 text-white" style={{ backgroundColor: catColor }}>
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm opacity-70 mb-3">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <span className="mx-2">/</span>
            <span>{category}</span>
          </nav>
          <h1 className="text-4xl font-extrabold mb-2">{category}</h1>
          <p className="text-white/80">{rows.length} articles in this category</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {headerAd && (
          <div className="mb-6">
            <AdSlot code={headerAd.adsterraCode} name={headerAd.name} type="leaderboard" />
          </div>
        )}

        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {rows.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-3">📭</p>
                <p className="text-xl font-medium">No articles in this category yet.</p>
                <Link href="/blog" className="inline-block mt-4 text-red-600 hover:underline">
                  Browse all articles →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rows.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            {sidebarAd && (
              <div className="mb-5">
                <AdSlot code={sidebarAd.adsterraCode} name={sidebarAd.name} type="rectangle" />
              </div>
            )}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">All Categories</h3>
              <ul className="space-y-2">
                {allCategories.map((cat) => {
                  const catSlug = getCategorySlug(cat);
                  return (
                    <li key={cat}>
                      <Link
                        href={`/category/${catSlug}`}
                        className={`flex items-center gap-2 text-sm rounded-lg px-3 py-1.5 transition ${
                          cat === category ? "text-white font-semibold" : "text-gray-600 hover:bg-gray-50"
                        }`}
                        style={cat === category ? { backgroundColor: catColor } : {}}
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: CATEGORY_BG[cat] }} />
                        {cat}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
