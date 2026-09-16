import { NextRequest, NextResponse } from "next/server";
import { answerUser } from "@/lib/ai-context";

export async function POST(req: NextRequest) {
  let payload: { messages?: unknown } = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
    return NextResponse.json({ error: "No messages provided" }, { status: 400 });
  }

  const history = (payload.messages as { role: string; content: string }[])
    .filter((m) => typeof m.content === "string")
    .slice(-12);

  const reply = answerUser(history);
  return NextResponse.json({ reply, offline: false });
}