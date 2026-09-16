"use client";

import { useState, useRef } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { Honeypot } from "@/components/Honeypot";

export default function ContactForm() {
  const honeyRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !subject || !message) {
      setError("Please complete all required fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, _website: honeyRef.current?.value || "" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Could not submit");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/25 bg-green-500/10">
          <CheckCircle2 className="h-7 w-7 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Message sent</h3>
        <p className="mt-3 text-gray-400">
          Thank you, {name.split(" ")[0]}. We&apos;ll respond as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
      <Honeypot ref={honeyRef} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-gray-300">
            Name <span className="text-green-400">*</span>
          </label>
          <input id="c-name" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="c-phone" className="mb-2 block text-sm font-medium text-gray-300">
            Phone
          </label>
          <input id="c-phone" type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-gray-300">
            Email <span className="text-green-400">*</span>
          </label>
          <input id="c-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-subject" className="mb-2 block text-sm font-medium text-gray-300">
            Subject <span className="text-green-400">*</span>
          </label>
          <input id="c-subject" className="input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="mb-2 block text-sm font-medium text-gray-300">
            Message <span className="text-green-400">*</span>
          </label>
          <textarea id="c-message" className="input min-h-32 resize-y" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
      </div>
      {error && (
        <p className="mt-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}
      <button type="submit" disabled={sending} className="btn-primary mt-6 w-full disabled:opacity-60">
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
        Send Message
      </button>
    </form>
  );
}