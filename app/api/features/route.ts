import { NextRequest, NextResponse } from "next/server";
import { genId, readDb, updateDb } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import type { Feature } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  const sorted = [...db.features].sort((a, b) => a.order - b.order);
  return NextResponse.json(sorted);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Judul dan deskripsi wajib diisi." },
        { status: 400 }
      );
    }
    const db = await readDb();
    const newFeature: Feature = {
      id: genId("f"),
      title: body.title,
      description: body.description,
      icon: body.icon || "sparkles",
      order: db.features.length + 1,
    };
    const updated = [...db.features, newFeature];
    await updateDb("features", updated);
    return NextResponse.json(newFeature, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}
