import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "mc_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 jam

function getSecret(): string {
  return process.env.SESSION_SECRET || "dev-only-secret-change-me";
}

function sign(value: string): string {
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(value);
  return hmac.digest("hex");
}

export function createSessionToken(username: string): string {
  const payload = `${username}.${Date.now() + SESSION_MAX_AGE * 1000}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [username, expiresAt, signature] = decoded.split(".");
    if (!username || !expiresAt || !signature) return false;
    const payload = `${username}.${expiresAt}`;
    const expected = sign(payload);
    if (expected !== signature) return false;
    if (Date.now() > Number(expiresAt)) return false;
    return true;
  } catch {
    return false;
  }
}

export function checkCredentials(username: string, password: string): boolean {
  const validUser = process.env.ADMIN_USERNAME || "admin";
  const validPass = process.env.ADMIN_PASSWORD || "admin123";
  return username === validUser && password === validPass;
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE;
