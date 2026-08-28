"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, generateSlug } from "@/lib/utils";

interface PostData {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: string;
  tags: string;
  published: boolean;
  featured: boolean;
  author: string;
}

interface Props {
  mode: "create" | "edit";
  initialData?: PostData;
}

const DEFAULT: PostData = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverImage: "",
  category: "Express Entry",
  tags: "",
  published: false,
  featured: false,
  author: "Canada Easy Guide",
};

export default function PostEditorClient({ mode, initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState<PostData>(initialData || DEFAULT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    if (mode === "create" && data.title && !initialData) {
      setData((prev) => ({ ...prev, slug: generateSlug(data.title) }));
    }
  }, [data.title, mode, initialData]);

  function set<K extends keyof PostData>(key: K, value: PostData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(publish?: boolean) {
    setError("");
    setSuccess("");
    setSaving(true);

    const payload = { ...data };
    if (publish !== undefined) payload.published = publish;

    try {
      const url = mode === "edit" && data.id ? `/api/posts/${data.id}` : "/api/posts";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to save");
      } else {
        setSuccess(mode === "create" ? "Post created successfully!" : "Post updated!");
        if (mode === "create") {
          setTimeout(() => router.push(`/admin/posts/${result.post.id}/edit`), 1200);
        }
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSaving(false);
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {mode === "create" ? "✏️ New Post" : "✏️ Edit Post"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {mode === "create" ? "Create a new article" : `Editing: ${data.title || "Untitled"}`}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/admin/posts")}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 text-sm text-gray-200 bg-white/10 hover:bg-white/15 rounded-xl transition disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition disabled:opacity-50"
            >
              {saving ? "Saving…" : "Publish"}
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-xl text-red-300 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-900/40 border border-green-700 rounded-xl text-green-300 text-sm">{success}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <label className="block text-sm text-gray-400 mb-2">Post Title *</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Enter article title…"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold"
              />
              <div className="mt-2">
                <label className="block text-xs text-gray-500 mb-1">Slug (URL)</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">/post/</span>
                  <input
                    type="text"
                    value={data.slug}
                    onChange={(e) => set("slug", e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-gray-300 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <label className="block text-sm text-gray-400 mb-2">Excerpt / Summary</label>
              <textarea
                value={data.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={2}
                placeholder="Brief description of the article (shown in cards and SEO)…"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
              />
            </div>

            {/* Body */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-4 mb-3">
                <label className="text-sm text-gray-400">Article Content (HTML)</label>
                <div className="flex gap-1 ml-auto">
                  {(["write", "preview"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-xs rounded-lg transition capitalize ${activeTab === tab ? "bg-red-600 text-white" : "text-gray-400 hover:bg-white/10"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "write" ? (
                <textarea
                  value={data.body}
                  onChange={(e) => set("body", e.target.value)}
                  rows={20}
                  placeholder="Write your article content in HTML… e.g., <h2>Introduction</h2><p>Your content here…</p>"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-mono resize-y"
                />
              ) : (
                <div
                  className="prose-content min-h-[400px] bg-white rounded-xl p-6 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: data.body || "<p class='text-gray-400'>Nothing to preview yet.</p>" }}
                />
              )}

              <div className="mt-3 text-xs text-gray-500">
                Supports full HTML. Use &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;strong&gt;, &lt;blockquote&gt;, &lt;table&gt; tags.
              </div>
            </div>
          </div>

          {/* Sidebar settings */}
          <div className="space-y-4">
            {/* Publish status */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Publish Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`relative w-10 h-6 rounded-full transition ${data.published ? "bg-green-500" : "bg-gray-600"}`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={data.published}
                      onChange={(e) => set("published", e.target.checked)}
                    />
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.published ? "translate-x-4" : ""}`} />
                  </div>
                  <span className="text-sm text-gray-300">{data.published ? "Published" : "Draft"}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`relative w-10 h-6 rounded-full transition ${data.featured ? "bg-yellow-500" : "bg-gray-600"}`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={data.featured}
                      onChange={(e) => set("featured", e.target.checked)}
                    />
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.featured ? "translate-x-4" : ""}`} />
                  </div>
                  <span className="text-sm text-gray-300">⭐ Featured Post</span>
                </label>
              </div>
            </div>

            {/* Category */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select
                value={data.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1a1a2e]">{c}</option>
                ))}
              </select>
            </div>

            {/* Cover Image */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <label className="block text-sm text-gray-400 mb-2">Cover Image URL</label>
              <input
                type="url"
                value={data.coverImage}
                onChange={(e) => set("coverImage", e.target.value)}
                placeholder="https://images.unsplash.com/…"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              {data.coverImage && data.coverImage.startsWith("http") && (
                <img
                  src={data.coverImage}
                  alt="Cover preview"
                  className="mt-3 w-full h-32 object-cover rounded-lg"
                />
              )}
              <p className="text-xs text-gray-500 mt-2">Leave blank to use category default image.</p>
            </div>

            {/* Tags */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <label className="block text-sm text-gray-400 mb-2">Tags</label>
              <input
                type="text"
                value={data.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="express entry, CRS, PR 2025"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Comma separated</p>
            </div>

            {/* Author */}
            <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
              <label className="block text-sm text-gray-400 mb-2">Author</label>
              <input
                type="text"
                value={data.author}
                onChange={(e) => set("author", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition disabled:opacity-50"
              >
                {saving ? "Saving…" : mode === "create" ? "🚀 Publish Post" : "💾 Update Post"}
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-xl transition disabled:opacity-50 text-sm"
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
