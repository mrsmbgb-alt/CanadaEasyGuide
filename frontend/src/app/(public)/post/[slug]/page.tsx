import { marked } from "marked";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { formatDate, CATEGORY_COLORS, CATEGORY_BG } from "@/lib/utils";
import {
  getActiveAds,
  getPostBySlug,
  getRelatedPosts,
  getPostsByCategory,
  getCoverImageFor,
  getCategorySlug,
  getPublishedPosts,
} from "@/lib/posts";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const ads = getActiveAds();
  const inPostTopAd = ads.find((a) => a.name.toLowerCase().includes("in-post top") || a.name.toLowerCase().includes("in-post"));
  const inPostMidAd = ads.find((a) => a.name.toLowerCase().includes("middle"));
  const sidebarAd = ads.find((a) => a.name.toLowerCase().includes("sidebar"));

  const catClass = CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-700";
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const coverImg = getCoverImageFor(post.category, post.coverImage);
  const categorySlug = getCategorySlug(post.category);
  const bodyHtml = marked.parse(post.body, { async: false }) as string;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={coverImg} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-4xl mx-auto">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${catClass}`}>{post.category}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Article */}
          <article className="flex-1 min-w-0">
            {/* Meta */}
            <div className="mb-2">
              <nav className="text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:text-red-600">Home</Link>
                <span className="mx-2">/</span>
                <Link href={`/category/${categorySlug}`} className="hover:text-red-600">{post.category}</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700 truncate">{post.title}</span>
              </nav>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-5 mb-5">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  {(post.views + 1).toLocaleString()} views
                </span>
              </div>
            </div>

            {inPostTopAd && (
              <div className="mb-6">
                <AdSlot code={inPostTopAd.adsterraCode} name={inPostTopAd.name} type="leaderboard" />
              </div>
            )}

            {/* Body */}
            <div
              className="prose-content bg-white rounded-xl p-6 sm:p-8 shadow-sm"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {inPostMidAd && (
              <div className="my-6">
                <AdSlot code={inPostMidAd.adsterraCode} name={inPostMidAd.name} type="rectangle" />
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-full transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <strong>⚠️ Disclaimer:</strong> This article is for informational purposes only and does not constitute legal immigration advice. Policies change frequently. Always consult an authorized immigration consultant (RCIC) or immigration lawyer for your specific situation.
            </div>

            {/* Share */}
            <div className="mt-6 bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-3">Share this article:</p>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`/post/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  📘 Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`/post/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white text-sm rounded-lg hover:bg-sky-600 transition"
                >
                  🐦 Twitter
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            {sidebarAd && (
              <div className="mb-6">
                <AdSlot code={sidebarAd.adsterraCode} name={sidebarAd.name} type="rectangle" />
              </div>
            )}

            {/* IRCC Links */}
            <div className="bg-white rounded-xl p-5 shadow-sm mb-5">
              <h3 className="font-bold text-gray-800 mb-3">🔗 Useful Resources</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "IRCC Official Site", url: "https://www.canada.ca/en/immigration-refugees-citizenship.html" },
                  { label: "Check Express Entry", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" },
                  { label: "Apply Online (IRCC)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/account.html" },
                  { label: "Canada.ca", url: "https://www.canada.ca" },
                ].map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
                    >
                      <span className="text-red-400">→</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category badge */}
            <div className="rounded-xl p-5 text-white" style={{ backgroundColor: CATEGORY_BG[post.category] || "#607d8b" }}>
              <p className="text-sm font-medium opacity-80 mb-1">Browse More in</p>
              <h3 className="text-xl font-bold mb-3">{post.category}</h3>
              <Link
                href={`/category/${categorySlug}`}
                className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                View All Articles →
              </Link>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
