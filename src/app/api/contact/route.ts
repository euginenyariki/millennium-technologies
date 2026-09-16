import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { readJson, validateContact } from "@/lib/validate";

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const result = validateContact(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const c = result.data;
  try {
    await prisma.contactSubmission.create({
      data: { name: c.name, email: c.email, phone: c.phone || null, subject: c.subject, message: c.message },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Could not submit message" }, { status: 500 });
  }
}