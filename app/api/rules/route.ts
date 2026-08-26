import { NextRequest, NextResponse } from "next/server";
import { genId, readDb, updateDb } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import type { Rule } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  const sorted = [...db.rules].sort((a, b) => a.order - b.order);
  return NextResponse.json(sorted);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!body.text) {
      return NextResponse.json(
        { error: "Isi peraturan wajib diisi." },
        { status: 400 }
      );
    }
    const db = await readDb();
    const newRule: Rule = {
      id: genId("r"),
      text: body.text,
      order: db.rules.length + 1,
    };
    const updated = [...db.rules, newRule];
    await updateDb("rules", updated);
    return NextResponse.json(newRule, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}
