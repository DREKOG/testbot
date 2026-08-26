import { NextRequest, NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const db = await readDb();
    const host = db.general.serverIp;
    const port = db.general.serverPort || "25565";

    const res = await fetch(
      `https://api.mcstatus.io/v2/status/java/${host}:${port}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json(
        { online: false, error: "Gagal menghubungi mcstatus.io" },
        { status: 200 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      online: Boolean(data.online),
      players: {
        online: data.players?.online ?? 0,
        max: data.players?.max ?? 0,
      },
      version: data.version?.name_clean ?? data.version?.name ?? null,
      motd: data.motd?.clean ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      { online: false, error: "Terjadi kesalahan saat memeriksa status server." },
      { status: 200 }
    );
  }
}
