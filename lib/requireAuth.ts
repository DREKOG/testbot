import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

/**
 * Mengembalikan NextResponse 401 jika request tidak memiliki sesi admin
 * yang valid, atau null jika request boleh dilanjutkan. API route handlers
 * berjalan di Node.js runtime secara default sehingga verifikasi HMAC penuh
 * (lib/auth.ts) bisa dipakai di sini.
 */
export async function requireAuth(): Promise<NextResponse | null> {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Tidak diotorisasi." }, { status: 401 });
  }
  return null;
}
