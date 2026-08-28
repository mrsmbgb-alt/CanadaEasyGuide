import { db } from "@/db";
import { posts, adPlacements } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import { CATEGORY_BG, CATEGORIES } from "@/lib/utils";

type AdRow = typeof adPlacements.$inferSelect;

async function getHomeData() {
  const [featuredPosts, latestPosts, ads] = await Promise.all([
    db
      .select()
      .from(posts)
      .where(and(eq(posts.published, true), eq(posts.featured, true)))
      .orderBy(desc(posts.createdAt))
      .limit(3),
    db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(9),
    db.select().from(adPlacements).where(eq(adPlacements.isActive, true)),
  ]);
  return { featuredPosts, latestPosts, ads };
}

function getAd(ads: AdRow[], name: string) {
  return ads.find((a) => a.name.toLowerCase().includes(name.toLowerCase()));
}

export default async function HomePage() {
  const { featuredPosts, latestPosts, ads } = await getHomeData();
  const headerAd = getAd(ads, "Header");
  const inPostAd = getAd(ads, "In-Post Top");
  const footerAd = getAd(ads, "Footer");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Ad */}
      {headerAd && (
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <AdSlot code={headerAd.adsterraCode} name={headerAd.name} type="leaderboard" />
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1a1a2e] text-white py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            🍁 Trusted Immigration Resource
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Your Complete Guide to <br />
            <span className="text-red-400">Canadian Immigration</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Step-by-step guides on Express Entry, PNP, study permits, work permits, and everything you need to successfully settle in Canada.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/category/express-entry"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition shadow-lg shadow-red-600/30"
            >
              Explore Express Entry →
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.filter((c) => c !== "General").map((cat) => {
            const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
            return (
              <Link
                key={cat}
                href={`/category/${slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90 shadow-sm"
                style={{ backgroundColor: CATEGORY_BG[cat] || "#607d8b" }}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800">🔥 Featured Articles</h2>
            <Link href="/blog" className="text-red-600 hover:text-red-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* In-Post Ad */}
      {inPostAd && (
        <div className="max-w-5xl mx-auto px-4 py-4">
          <AdSlot code={inPostAd.adsterraCode} name={inPostAd.name} type="leaderboard" />
        </div>
      )}

      {/* Latest Posts */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-800">📰 Latest Articles</h2>
          <Link href="/blog" className="text-red-600 hover:text-red-700 text-sm font-medium">
            View All →
          </Link>
        </div>
        {latestPosts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-3">📝</p>
            <p className="text-lg">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Info banner */}
      <section className="bg-[#1a1a2e] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-3">🇨🇦 Planning to Move to Canada?</h2>
          <p className="text-gray-300 mb-6">
            Canada welcomes approximately 500,000 new permanent residents annually. Get expert guidance on the right pathway for you.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { n: "500K+", l: "PR Targets 2025" },
              { n: "80+", l: "Immigration Pathways" },
              { n: "10", l: "Provinces & Territories" },
              { n: "200+", l: "Countries Represented" },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-extrabold text-red-400">{s.n}</div>
                <div className="text-sm text-gray-300 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      {footerAd && (
        <div className="max-w-5xl mx-auto px-4 py-4">
          <AdSlot code={footerAd.adsterraCode} name={footerAd.name} type="leaderboard" />
        </div>
      )}
    </div>
  );
}
