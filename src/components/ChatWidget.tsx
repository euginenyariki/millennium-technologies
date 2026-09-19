"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageSquare, Send, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const QUICK = [
  "Prices of CCTV cameras",
  "Book an installation",
  "Gate automation cost",
  "Request a quotation",
];

const INITIAL: Message[] = [
  {
    role: "assistant",
    content: `Hi! 👋 I'm the NexGuard Technologies assistant. Ask me about our CCTV, access control, electric fences, gate automation, solar, networking and IT — prices, products, or how to book. How can I help?`,
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [messages, open, busy]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput("");
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setBusy(true);
    setOffline(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      if (data.offline) setOffline(true);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the assistant just now. Try again, or message us on WhatsApp at +254 794 273 995.",
        },
      ]);
      setOffline(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-all",
          open
            ? "border-white/15 bg-white/10 text-white"
            : "border-green-500/40 bg-green-500 text-mt-950 hover:scale-105"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-auto max-h-[75vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-mt-900/95 shadow-2xl backdrop-blur-xl sm:right-5">
          <div className="flex items-center gap-3 border-b border-white/[0.08] bg-mt-950/80 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
              <Bot className="h-5 w-5 text-green-400" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">NexGuard Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <span className={cn("h-1.5 w-1.5 rounded-full", busy ? "animate-pulse bg-amber-400" : "bg-green-500")} />
                {busy ? "Thinking…" : "Online · Powered by AI"}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" style={{ maxHeight: "calc(75vh - 130px)" }}>
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-green-500 text-mt-950"
                      : "rounded-bl-sm border border-white/[0.07] bg-white/[0.04] text-gray-200"
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                Typing…
              </div>
            )}
          </div>

          <div className="border-t border-white/[0.08] bg-mt-950/80 px-3 pb-3 pt-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {QUICK.map((q) => (
                <button
                  key={q}
                  disabled={busy}
                  onClick={() => send(q)}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-gray-300 transition-colors hover:border-green-500/30 hover:text-green-400 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about products, prices, or services…"
                aria-label="Chat message"
                className="input flex-1 !py-2.5 text-sm"
              />
              <button
                onClick={() => send()}
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 text-mt-950 transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {offline && (
              <div className="mt-2 text-center">
                <a
                  href={whatsappLink(SITE.whatsapp, "Hello NexGuard Technologies, I need help.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-green-400 hover:underline"
                >
                  Talk to a human on WhatsApp →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}