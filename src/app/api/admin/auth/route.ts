import { NextRequest, NextResponse } from "next/server";
import { makeToken, passwordMatches, adminConfigured } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "Admin password not configured on server." }, { status: 500 });
  }

  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const password = body.password;
  if (typeof password !== "string" || password.length === 0 || password.length > 100) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  if (passwordMatches(password)) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("mt_admin_token", makeToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return res;
  }
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}