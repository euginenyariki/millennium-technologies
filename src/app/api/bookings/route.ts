import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRef } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      service,
      location,
      date,
      description,
      name,
      phone,
      email,
      urgent,
    } = body;

    if (!service || !location || !name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reference = generateRef("BK");
    const booking = await prisma.serviceBooking.create({
      data: {
        reference,
        service,
        location,
        preferredDate: date || null,
        description: description || null,
        contactName: name,
        contactPhone: phone,
        contactEmail: email || null,
        urgent: Boolean(urgent),
      },
    });

    return NextResponse.json({ reference: booking.reference, urgent: booking.urgent }, { status: 201 });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Could not submit booking" }, { status: 500 });
  }
}