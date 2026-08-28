import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import PostEditorClient from "../../PostEditorClient";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.id, parseInt(id))).limit(1);
  if (!post) notFound();

  const initialData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    coverImage: post.coverImage || "",
    category: post.category,
    tags: post.tags || "",
    published: post.published,
    featured: post.featured,
    author: post.author,
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.name} />
      <PostEditorClient mode="edit" initialData={initialData} />
    </div>
  );
}
