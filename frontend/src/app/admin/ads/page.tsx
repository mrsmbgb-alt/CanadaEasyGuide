import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import AdManagerClient from "./AdManagerClient";
import { db } from "@/db";
import { adPlacements } from "@/db/schema";

export default async function AdsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const ads = await db.select().from(adPlacements).orderBy(adPlacements.id);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.name} />
      <AdManagerClient initialAds={ads} />
    </div>
  );
}
