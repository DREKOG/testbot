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
    const index = db.rules.findIndex((r) => r.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Peraturan tidak ditemukan." }, { status: 404 });
    }
    db.rules[index] = { ...db.rules[index], ...body, id: params.id };
    await updateDb("rules", db.rules);
    return NextResponse.json(db.rules[index]);
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
  const filtered = db.rules.filter((r) => r.id !== params.id);
  if (filtered.length === db.rules.length) {
    return NextResponse.json({ error: "Peraturan tidak ditemukan." }, { status: 404 });
  }
  await updateDb("rules", filtered);
  return NextResponse.json({ ok: true });
}
