import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: { name, email, phone: phone || null, subject, message },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Could not submit message" }, { status: 500 });
  }
}