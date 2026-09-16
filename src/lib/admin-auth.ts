import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

const PEPPER = "mt-admin";
const DAY_MS = 86_400_000;

function tokenForDay(day: number): string {
  const password = process.env.ADMIN_PASSWORD || "";
  return createHmac("sha256", PEPPER).update(`${password}::${day}`).digest("hex");
}

function dayIndex(now = Date.now()): number {
  return Math.floor(now / DAY_MS);
}

export function makeToken(): string {
  return tokenForDay(dayIndex());
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) {
    return false;
  }
  const ba = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function passwordMatches(password: string): boolean {
  const target = process.env.ADMIN_PASSWORD || "";
  return timingSafeEqualHex(
    createHmac("sha256", PEPPER).update(password).digest("hex"),
    createHmac("sha256", PEPPER).update(target).digest("hex")
  );
}

export function isAuthed(req: NextRequest) {
  const token = req.cookies.get("mt_admin_token")?.value;
  if (!token) return false;
  const now = dayIndex();
  // Accept today's token plus a one-day grace window so a session started
  // just before midnight is not dropped immediately.
  return timingSafeEqualHex(token, tokenForDay(now)) || timingSafeEqualHex(token, tokenForDay(now - 1));
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}