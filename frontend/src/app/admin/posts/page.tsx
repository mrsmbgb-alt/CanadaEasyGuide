import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { formatDate, CATEGORY_COLORS } from "@/lib/utils";
import Link from "next/link";
import PostActionsClient from "./PostActionsClient";

export default async function AdminPostsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.name} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">All Posts</h1>
              <p className="text-gray-400 text-sm mt-1">{allPosts.length} total posts</p>
            </div>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition"
            >
              + New Post
            </Link>
          </div>

          <div className="bg-[#1a1a2e] rounded-2xl border border-white/5 overflow-hidden">
            {allPosts.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📝</p>
                <p className="text-lg">No posts yet.</p>
                <Link href="/admin/posts/new" className="inline-block mt-4 text-red-400 hover:text-red-300">
                  Create your first post →
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                      <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Status</th>
                      <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Views</th>
                      <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden xl:table-cell">Date</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPosts.map((post) => {
                      const catClass = CATEGORY_COLORS[post.category] || "bg-gray-700 text-gray-300";
                      return (
                        <tr key={post.id} className="border-b border-white/5 hover:bg-white/3 transition">
                          <td className="px-5 py-4">
                            <div>
                              <p className="text-white text-sm font-medium line-clamp-1">{post.title}</p>
                              <p className="text-gray-500 text-xs mt-0.5 font-mono">/post/{post.slug}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${catClass}`}>
                              {post.category}
                            </span>
                          </td>
                          <td className="px-4 py-4 hidden lg:table-cell">
                            <div className="flex flex-col gap-1">
                              <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${post.published ? "text-green-400" : "text-gray-500"}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-green-400" : "bg-gray-500"}`} />
                                {post.published ? "Published" : "Draft"}
                              </span>
                              {post.featured && (
                                <span className="text-xs text-yellow-400">⭐ Featured</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden lg:table-cell text-gray-400 text-sm">
                            {post.views.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 hidden xl:table-cell text-gray-400 text-xs">
                            {formatDate(post.createdAt)}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <PostActionsClient postId={post.id} slug={post.slug} published={post.published} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
