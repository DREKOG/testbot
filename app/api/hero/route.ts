import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import type { HeroSettings } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.hero);
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as HeroSettings;
    if (!body.headline) {
      return NextResponse.json(
        { error: "Headline wajib diisi." },
        { status: 400 }
      );
    }
    const db = await updateDb("hero", body);
    return NextResponse.json(db.hero);
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}
