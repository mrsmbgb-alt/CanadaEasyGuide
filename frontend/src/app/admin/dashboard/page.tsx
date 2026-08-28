import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import { db } from "@/db";
import { posts, adPlacements } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { formatDate, CATEGORY_COLORS } from "@/lib/utils";
import Link from "next/link";

async function getDashboardData() {
  const [totalPosts] = await db.select({ count: sql<number>`count(*)` }).from(posts);
  const [publishedPosts] = await db.select({ count: sql<number>`count(*)` }).from(posts).where(eq(posts.published, true));
  const [totalViews] = await db.select({ sum: sql<number>`coalesce(sum(views), 0)` }).from(posts);
  const [activeAds] = await db.select({ count: sql<number>`count(*)` }).from(adPlacements).where(eq(adPlacements.isActive, true));

  const topPosts = await db
    .select({ id: posts.id, title: posts.title, slug: posts.slug, views: posts.views, category: posts.category })
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.views))
    .limit(5);

  const recentPosts = await db
    .select({ id: posts.id, title: posts.title, slug: posts.slug, published: posts.published, createdAt: posts.createdAt, category: posts.category })
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(6);

  return {
    stats: {
      totalPosts: Number(totalPosts?.count || 0),
      publishedPosts: Number(publishedPosts?.count || 0),
      totalViews: Number(totalViews?.sum || 0),
      activeAds: Number(activeAds?.count || 0),
    },
    topPosts,
    recentPosts,
  };
}

export default async function DashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { stats, topPosts, recentPosts } = await getDashboardData();

  const statCards = [
    { label: "Total Posts", value: stats.totalPosts, icon: "📝", color: "from-blue-500 to-blue-600" },
    { label: "Published", value: stats.publishedPosts, icon: "✅", color: "from-green-500 to-green-600" },
    { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: "👁️", color: "from-purple-500 to-purple-600" },
    { label: "Active Ads", value: stats.activeAds, icon: "📢", color: "from-red-500 to-red-600" },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.name} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Welcome back, {session.name}! Here&apos;s your site overview.</p>
            </div>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition"
            >
              <span>+</span> New Post
            </Link>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card) => (
              <div key={card.label} className={`rounded-2xl bg-gradient-to-br ${card.color} p-5`}>
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="text-3xl font-extrabold text-white">{card.value}</div>
                <div className="text-white/70 text-sm mt-1">{card.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Posts */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">Recent Posts</h2>
                <Link href="/admin/posts" className="text-red-400 text-sm hover:text-red-300">View all →</Link>
              </div>
              <div className="space-y-3">
                {recentPosts.map((post) => {
                  const catClass = CATEGORY_COLORS[post.category] || "bg-gray-700 text-gray-300";
                  return (
                    <div key={post.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{post.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${catClass}`}>{post.category}</span>
                          <span className="text-gray-500 text-xs">{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${post.published ? "bg-green-400" : "bg-gray-500"}`} />
                        <Link href={`/admin/posts/${post.id}/edit`} className="text-xs text-gray-400 hover:text-white transition px-2 py-1 rounded hover:bg-white/10">
                          Edit
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Posts */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">Top Posts by Views</h2>
              </div>
              <div className="space-y-3">
                {topPosts.map((post, idx) => (
                  <div key={post.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <span className="text-2xl font-extrabold text-gray-600 w-6 text-center">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{post.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{post.category}</p>
                    </div>
                    <span className="text-red-400 text-sm font-bold">{post.views.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
            <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { href: "/admin/posts/new", icon: "✏️", label: "Write Post", bg: "bg-blue-600 hover:bg-blue-700" },
                { href: "/admin/ads", icon: "📢", label: "Manage Ads", bg: "bg-green-600 hover:bg-green-700" },
                { href: "/admin/settings", icon: "⚙️", label: "Settings", bg: "bg-purple-600 hover:bg-purple-700" },
                { href: "/", icon: "🌐", label: "View Site", bg: "bg-gray-600 hover:bg-gray-700" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  target={action.href === "/" ? "_blank" : undefined}
                  className={`flex flex-col items-center gap-2 py-4 rounded-xl text-white text-sm font-medium transition ${action.bg}`}
                >
                  <span className="text-2xl">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
