import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { readDb } from "@/lib/db";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const db = await readDb();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar general={db.general} />
      <main className="flex-1">{children}</main>
      <Footer general={db.general} />
    </div>
  );
}
