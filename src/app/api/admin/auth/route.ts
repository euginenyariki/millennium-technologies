import { NextRequest, NextResponse } from "next/server";
import { makeToken } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const password = process.env.ADMIN_PASSWORD || "";
  if (!password) {
    return NextResponse.json({ error: "Admin password not configured on server." }, { status: 500 });
  }
  if (body.password === password) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("mt_admin_token", makeToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;
  }
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}