import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const rows = await db.select().from(siteSettings);
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { settings } = await req.json();
  for (const [key, value] of Object.entries(settings as Record<string, string>)) {
    await db
      .insert(siteSettings)
      .values({ key, value: value || "" })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value: value || "", updatedAt: new Date() } });
  }

  return NextResponse.json({ success: true });
}
