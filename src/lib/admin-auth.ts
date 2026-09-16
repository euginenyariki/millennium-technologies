import { createHmac } from "crypto";
import type { NextRequest } from "next/server";

export function makeToken() {
  const password = process.env.ADMIN_PASSWORD || "";
  return createHmac("sha256", "mt-admin").update(password).digest("hex");
}

export function isAuthed(req: NextRequest) {
  return req.cookies.get("mt_admin_token")?.value === makeToken();
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}