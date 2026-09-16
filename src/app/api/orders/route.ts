import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRef } from "@/lib/utils";
import { readJson, validateOrder } from "@/lib/validate";

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const result = validateOrder(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const o = result.data;
  try {
    const reference = generateRef("ORD");
    const order = await prisma.order.create({
      data: {
        reference,
        items: JSON.stringify(o.items),
        total: o.total,
        name: o.name,
        phone: o.phone,
        email: o.email || null,
        location: o.location || null,
        notes: o.notes || null,
        method: o.method,
      },
    });

    return NextResponse.json({ reference: order.reference }, { status: 201 });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Could not place order" }, { status: 500 });
  }
}