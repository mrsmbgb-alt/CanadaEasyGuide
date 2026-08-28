import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const rows = await db.select().from(siteSettings);
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.name} />
      <SettingsClient initialSettings={settings} />
    </div>
  );
}
