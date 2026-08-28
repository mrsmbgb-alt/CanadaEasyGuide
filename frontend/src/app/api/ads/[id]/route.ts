import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { adPlacements } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

// PUT /api/ads/[id] - update single placement
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  const [ad] = await db
    .update(adPlacements)
    .set({
      name: data.name,
      adsterraCode: data.adsterraCode,
      isActive: data.isActive,
      applyToAll: data.applyToAll,
      updatedAt: new Date(),
    })
    .where(eq(adPlacements.id, parseInt(id)))
    .returning();

  if (!ad) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ad });
}

// DELETE /api/ads/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.delete(adPlacements).where(eq(adPlacements.id, parseInt(id)));
  return NextResponse.json({ success: true });
}
