import Link from "next/link";
import { formatDate, CATEGORY_COLORS } from "@/lib/utils";

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
  createdAt: Date | string;
}

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  "Express Entry": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80",
  "Provincial Nominee": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80",
  "Study in Canada": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
  "Work Permits": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  "Family Sponsorship": "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80",
  Citizenship: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&q=80",
  "Cost of Living": "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?w=600&q=80",
  "Settlement Tips": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
};

export default function PostCard({ post, featured = false }: PostCardProps) {
  const imgSrc =
    post.coverImage && post.coverImage.startsWith("http")
      ? post.coverImage
      : PLACEHOLDER_IMAGES[post.category] ||
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80";

  const catClass = CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-700";

  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block">
        <article className="relative rounded-2xl overflow-hidden shadow-lg card-hover bg-white h-full">
          <div className="relative h-64 overflow-hidden">
            <img
              src={imgSrc}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${catClass}`}>
              {post.category}
            </span>
          </div>
          <div className="p-5">
            <h2 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatDate(post.createdAt)}</span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views.toLocaleString()}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/post/${post.slug}`} className="group block">
      <article className="rounded-xl overflow-hidden shadow-sm card-hover bg-white h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imgSrc}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold ${catClass}`}>
            {post.category}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h2 className="font-bold text-base text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1.5">
            {post.title}
          </h2>
          <p className="text-gray-500 text-sm line-clamp-2 flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
            <span>{formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views.toLocaleString()}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
