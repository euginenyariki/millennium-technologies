"use client";

import { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { BOOKING_SERVICES } from "@/lib/data";
import { SITE } from "@/lib/site";
import { Honeypot } from "@/components/Honeypot";

function BookingFormInner() {
  const params = useSearchParams();
  const initial = params.get("service") || "";
  const honeyRef = useRef<HTMLInputElement>(null);

  const [service, setService] = useState(initial);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [urgent, setUrgent] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ reference: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!service || !location || !name || !phone) {
      setError("Please complete the required fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, location, date, description, name, phone, email, urgent, _website: honeyRef.current?.value || "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setDone({ reference: data.reference });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your booking. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/25 bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Booking received</h1>
        <p className="mt-3 text-gray-400">
          Thank you, {name.split(" ")[0]}. Your service request has been received. Our technical
          team will contact you shortly to confirm.
        </p>
        <p className="mt-5 inline-block rounded-xl border border-green-500/25 bg-green-500/[0.06] px-5 py-3 font-mono text-sm text-green-400">
          Reference: {done.reference}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="btn-secondary">
            Call us: {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <button onClick={() => window.history.back()} className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-3xl font-bold tracking-tight text-white">Book a service</h1>
      <p className="mt-3 text-gray-400">
        Fill in the details and our technical team will confirm your slot. Starred fields are required.
      </p>

      <form onSubmit={submit} className="mt-10 grid gap-6 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
        <Honeypot ref={honeyRef} />
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-300">
              Service <span className="text-green-400">*</span>
            </label>
            <select id="service" className="select" value={service} onChange={(e) => setService(e.target.value)} required>
              <option value="">Select a service…</option>
              {BOOKING_SERVICES.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
              <option value="emergency">Emergency / Urgent Support</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-300">
              Location / Town <span className="text-green-400">*</span>
            </label>
            <input id="location" className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Nairobi, Ruiru" required />
          </div>
          <div>
            <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-300">
              Preferred date
            </label>
            <input id="date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-300">
              Phone <span className="text-green-400">*</span>
            </label>
            <input id="phone" type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XX XXX XXX" required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
              Full name <span className="text-green-400">*</span>
            </label>
            <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
              Email (optional)
            </label>
            <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="desc" className="mb-2 block text-sm font-medium text-gray-300">
              Describe what you need
            </label>
            <textarea id="desc" className="input min-h-28 resize-y" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell us about the site, system size, issue, or requirements…" />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-4">
          <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-red-500" />
          <span>
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              This is urgent / an emergency
            </span>
            <span className="mt-1 block text-xs text-gray-400">
              Tick if your security or connectivity system is down and needs priority response.
            </span>
          </span>
        </label>

        {error && (
          <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
        )}

        <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Calendar className="h-4 w-4" /> Submit Booking Request
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-500">
          By submitting you agree to be contacted by NexGuard Technologies about this request.
        </p>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-500">Loading…</div>}>
      <BookingFormInner />
    </Suspense>
  );
}