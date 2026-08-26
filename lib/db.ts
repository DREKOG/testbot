import fs from "fs/promises";
import path from "path";
import type { SiteData } from "./types";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

async function ensureDb(): Promise<void> {
  try {
    await fs.access(DB_PATH);
  } catch {
    throw new Error(
      "Database file data/db.json tidak ditemukan. Pastikan file seed tersedia."
    );
  }
}

export async function readDb(): Promise<SiteData> {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as SiteData;
}

export async function writeDb(data: SiteData): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function updateDb<K extends keyof SiteData>(
  key: K,
  value: SiteData[K]
): Promise<SiteData> {
  const db = await readDb();
  db[key] = value;
  await writeDb(db);
  return db;
}

export function genId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}
