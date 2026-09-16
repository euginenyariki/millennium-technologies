import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRef } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceType,
      propertyType,
      location,
      phone,
      email,
      requirements,
      preferredDate,
      budgetRange,
      dynamicAnswers,
      product,
    } = body;

    if (!serviceType || !propertyType || !location || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reference = generateRef("QT");
    const quote = await prisma.quote.create({
      data: {
        reference,
        serviceType,
        serviceCategory: product || null,
        propertyType,
        location,
        phone,
        email: email || null,
        requirements: requirements || null,
        preferredDate: preferredDate || null,
        budgetRange: budgetRange || null,
        dynamicAnswers: JSON.stringify(dynamicAnswers || {}),
      },
    });

    return NextResponse.json({ reference: quote.reference }, { status: 201 });
  } catch (err) {
    console.error("Quote error:", err);
    return NextResponse.json({ error: "Could not submit quote request" }, { status: 500 });
  }
}