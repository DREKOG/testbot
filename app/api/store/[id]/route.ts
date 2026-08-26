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
    const index = db.store.findIndex((s) => s.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Paket tidak ditemukan." }, { status: 404 });
    }
    db.store[index] = { ...db.store[index], ...body, id: params.id };
    await updateDb("store", db.store);
    return NextResponse.json(db.store[index]);
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
  const filtered = db.store.filter((s) => s.id !== params.id);
  if (filtered.length === db.store.length) {
    return NextResponse.json({ error: "Paket tidak ditemukan." }, { status: 404 });
  }
  await updateDb("store", filtered);
  return NextResponse.json({ ok: true });
}
