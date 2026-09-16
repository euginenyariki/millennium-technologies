import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthed } from "@/lib/admin-auth";

const TABS = ["quotes", "bookings", "messages", "orders"] as const;

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tab = (req.nextUrl.searchParams.get("tab") || "quotes") as (typeof TABS)[number];
  const limit = Number(req.nextUrl.searchParams.get("limit") || 100);

  try {
    if (tab === "quotes") {
      const rows = await prisma.quote.findMany({ orderBy: { createdAt: "desc" }, take: limit });
      return NextResponse.json({ rows });
    }
    if (tab === "bookings") {
      const rows = await prisma.serviceBooking.findMany({ orderBy: { createdAt: "desc" }, take: limit });
      return NextResponse.json({ rows });
    }
    if (tab === "messages") {
      const rows = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: limit });
      return NextResponse.json({ rows });
    }
    const rows = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: limit });
    return NextResponse.json({ rows });
  } catch (err) {
    console.error("Admin data error:", err);
    return NextResponse.json({ error: "Could not load data" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { tab, id, status } = body;
  try {
    if (tab === "quotes") {
      await prisma.quote.update({ where: { id }, data: { status } });
    } else if (tab === "bookings") {
      await prisma.serviceBooking.update({ where: { id }, data: { status } });
    } else if (tab === "orders") {
      await prisma.order.update({ where: { id }, data: { status } });
    } else {
      return NextResponse.json({ error: "Status updates not supported for this tab" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin update error:", err);
    return NextResponse.json({ error: "Could not update" }, { status: 500 });
  }
}