import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { adPlacements } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

// GET /api/ads - public (returns active ad codes)
export async function GET() {
  const ads = await db.select().from(adPlacements).where(eq(adPlacements.isActive, true));
  return NextResponse.json({ ads });
}

// POST /api/ads - create new placement (admin)
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const [ad] = await db
    .insert(adPlacements)
    .values({
      name: data.name,
      adsterraCode: data.adsterraCode || "",
      isActive: data.isActive ?? true,
      applyToAll: data.applyToAll ?? true,
    })
    .returning();

  return NextResponse.json({ ad }, { status: 201 });
}

// PUT /api/ads - bulk update all placements (one-click global update)
export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { placements } = await req.json();
  if (!Array.isArray(placements)) {
    return NextResponse.json({ error: "placements array required" }, { status: 400 });
  }

  const updated = [];
  for (const p of placements) {
    const [ad] = await db
      .update(adPlacements)
      .set({
        adsterraCode: p.adsterraCode,
        isActive: p.isActive,
        applyToAll: p.applyToAll ?? true,
        updatedAt: new Date(),
      })
      .where(eq(adPlacements.id, p.id))
      .returning();
    if (ad) updated.push(ad);
  }

  return NextResponse.json({ updated, message: `${updated.length} ad placements updated. Changes applied to all posts automatically.` });
}
