import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRef } from "@/lib/utils";
import { readJson, validateQuote } from "@/lib/validate";

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const result = validateQuote(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const q = result.data;
  try {
    const reference = generateRef("QT");
    const quote = await prisma.quote.create({
      data: {
        reference,
        serviceType: q.serviceType,
        serviceCategory: q.product || null,
        propertyType: q.propertyType,
        location: q.location,
        phone: q.phone,
        email: q.email || null,
        requirements: q.requirements || null,
        preferredDate: q.preferredDate || null,
        budgetRange: q.budgetRange || null,
        dynamicAnswers: JSON.stringify(q.dynamicAnswers || {}),
      },
    });

    return NextResponse.json({ reference: quote.reference }, { status: 201 });
  } catch (err) {
    console.error("Quote error:", err);
    return NextResponse.json({ error: "Could not submit quote request" }, { status: 500 });
  }
}