import { NextRequest, NextResponse } from "next/server";
import { genId, readDb, updateDb } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import type { NewsPost } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  const sorted = [...db.news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Judul dan isi pengumuman wajib diisi." },
        { status: 400 }
      );
    }
    const db = await readDb();
    const newPost: NewsPost = {
      id: genId("n"),
      title: body.title,
      content: body.content,
      date: body.date || new Date().toISOString().slice(0, 10),
    };
    const updated = [...db.news, newPost];
    await updateDb("news", updated);
    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}
