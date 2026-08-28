"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  postId: number;
  slug: string;
  published: boolean;
}

export default function PostActionsClient({ postId, slug, published }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this post permanently?")) return;
    setDeleting(true);
    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete post.");
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/post/${slug}`}
        target="_blank"
        className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
      >
        View
      </Link>
      <Link
        href={`/admin/posts/${postId}/edit`}
        className="px-2.5 py-1.5 text-xs text-blue-400 hover:text-blue-300 rounded-lg hover:bg-blue-900/20 transition"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 rounded-lg hover:bg-red-900/20 transition disabled:opacity-50"
      >
        {deleting ? "…" : "Delete"}
      </button>
    </div>
  );
}
