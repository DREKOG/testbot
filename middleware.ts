import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "mc_admin_session";

// Catatan: middleware berjalan di Edge Runtime yang tidak mendukung modul
// `crypto` Node.js sepenuhnya, jadi di sini hanya dicek keberadaan cookie
// sesi. Verifikasi tanda tangan (signature) penuh dilakukan di server
// (Node.js runtime) lewat isAuthenticated() pada layout /admin — lihat
// app/admin/layout.tsx. Ini mencegah akses tanpa cookie sama sekali,
// sementara validasi kriptografis tetap terjadi sebelum data ditampilkan.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
