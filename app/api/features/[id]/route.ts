import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const db = await readDb();
    const index = db.features.findIndex((f) => f.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Fitur tidak ditemukan." }, { status: 404 });
    }
    db.features[index] = { ...db.features[index], ...body, id: params.id };
    await updateDb("features", db.features);
    return NextResponse.json(db.features[index]);
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  const db = await readDb();
  const filtered = db.features.filter((f) => f.id !== params.id);
  if (filtered.length === db.features.length) {
    return NextResponse.json({ error: "Fitur tidak ditemukan." }, { status: 404 });
  }
  await updateDb("features", filtered);
  return NextResponse.json({ ok: true });
}
