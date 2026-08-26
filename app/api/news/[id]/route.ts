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
    const index = db.news.findIndex((n) => n.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Berita tidak ditemukan." }, { status: 404 });
    }
    db.news[index] = { ...db.news[index], ...body, id: params.id };
    await updateDb("news", db.news);
    return NextResponse.json(db.news[index]);
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
  const filtered = db.news.filter((n) => n.id !== params.id);
  if (filtered.length === db.news.length) {
    return NextResponse.json({ error: "Berita tidak ditemukan." }, { status: 404 });
  }
  await updateDb("news", filtered);
  return NextResponse.json({ ok: true });
}
