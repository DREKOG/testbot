import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import type { GeneralSettings } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.general);
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as GeneralSettings;
    if (!body.serverName || !body.serverIp) {
      return NextResponse.json(
        { error: "Nama server dan IP wajib diisi." },
        { status: 400 }
      );
    }
    const db = await updateDb("general", body);
    return NextResponse.json(db.general);
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}
