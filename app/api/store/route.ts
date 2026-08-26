import { NextRequest, NextResponse } from "next/server";
import { genId, readDb, updateDb } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import type { StorePackage } from "@/lib/types";

export async function GET() {
  const db = await readDb();
  const sorted = [...db.store].sort((a, b) => a.order - b.order);
  return NextResponse.json(sorted);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Nama dan harga paket wajib diisi." },
        { status: 400 }
      );
    }
    const db = await readDb();
    const newPackage: StorePackage = {
      id: genId("s"),
      name: body.name,
      price: body.price,
      currency: body.currency || "IDR",
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
      imageUrl: body.imageUrl || "",
      highlighted: Boolean(body.highlighted),
      order: db.store.length + 1,
    };
    const updated = [...db.store, newPackage];
    await updateDb("store", updated);
    return NextResponse.json(newPackage, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
}
