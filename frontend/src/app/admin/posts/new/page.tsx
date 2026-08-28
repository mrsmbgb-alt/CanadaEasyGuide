import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import PostEditorClient from "../PostEditorClient";

export default async function NewPostPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.name} />
      <PostEditorClient mode="create" />
    </div>
  );
}
