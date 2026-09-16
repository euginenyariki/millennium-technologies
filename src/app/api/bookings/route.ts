import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRef } from "@/lib/utils";
import { readJson, validateBooking } from "@/lib/validate";

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const result = validateBooking(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const b = result.data;
  try {
    const reference = generateRef("BK");
    const booking = await prisma.serviceBooking.create({
      data: {
        reference,
        service: b.service,
        location: b.location,
        preferredDate: b.date || null,
        description: b.description || null,
        contactName: b.name,
        contactPhone: b.phone,
        contactEmail: b.email || null,
        urgent: b.urgent,
      },
    });

    return NextResponse.json({ reference: booking.reference, urgent: booking.urgent }, { status: 201 });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Could not submit booking" }, { status: 500 });
  }
}