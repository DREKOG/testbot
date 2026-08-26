import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { readDb } from "@/lib/db";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const db = await readDb();
  return {
    title: {
      default: `${db.general.serverName} — Server Minecraft Survival`,
      template: `%s — ${db.general.serverName}`,
    },
    description: db.general.description,
    openGraph: {
      title: db.general.serverName,
      description: db.general.description,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-base-950">{children}</body>
    </html>
  );
}
