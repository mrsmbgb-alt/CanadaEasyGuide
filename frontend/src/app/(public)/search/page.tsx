"use client";

import { useState, useEffect, useCallback } from "react";
import PostCard from "@/components/PostCard";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  tags?: string | null;
  views: number;
  author: string;
  createdAt: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/posts?search=${encodeURIComponent(term)}&limit=20`);
      const data = await res.json();
      setResults(data.posts || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (q) {
      setQuery(q);
      doSearch(q);
    }
  }, [q, doSearch]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a1a2e] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h1 className="text-3xl font-bold mb-6">Search Articles</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for immigration guides, Express Entry, PNP…"
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && searched && (
          <div>
            <p className="text-gray-600 mb-6 text-sm">
              Found <strong>{results.length}</strong> results for &ldquo;<strong>{q}</strong>&rdquo;
            </p>
            {results.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-5xl mb-3">🔍</p>
                <p className="text-xl font-medium">No results found</p>
                <p className="text-sm mt-2">Try different keywords like &ldquo;Express Entry&rdquo;, &ldquo;study permit&rdquo;, &ldquo;PNP&rdquo;</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-3">🍁</p>
            <p className="text-lg">Type a keyword to search immigration guides.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
