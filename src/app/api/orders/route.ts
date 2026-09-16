import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRef } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, total, name, phone, email, location, notes, method } = body;

    if (!items || !Array.isArray(items) || items.length === 0 || !name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reference = generateRef("ORD");
    const order = await prisma.order.create({
      data: {
        reference,
        items: JSON.stringify(items),
        total: Number(total) || 0,
        name,
        phone,
        email: email || null,
        location: location || null,
        notes: notes || null,
        method: method || "checkout",
      },
    });

    return NextResponse.json({ reference: order.reference }, { status: 201 });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Could not place order" }, { status: 500 });
  }
}