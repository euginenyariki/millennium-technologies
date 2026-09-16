"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Contact,
  Loader2,
  Package,
  Paperclip,
} from "lucide-react";
import {
  BUDGET_RANGES,
  PRODUCTS,
  PROPERTY_TYPES,
  QUOTE_QUESTIONS,
  QUOTE_SERVICES,
  type QuoteFlow,
} from "@/lib/data";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/utils";

const flowGoal: Record<string, QuoteFlow> = {
  cctv: "cctv",
  "access-control": "access-control",
  "electric-fence": "electric-fence",
  "gate-automation": "gate-automation",
  solar: "solar",
  networking: "networking",
  "it-equipment": "it-support",
};

const FLOW_STEPS = [
  { key: "service", label: "Service", icon: Package },
  { key: "property", label: "Property", icon: Building2 },
  { key: "details", label: "Details", icon: ClipboardList },
  { key: "contact", label: "Contact", icon: Contact },
] as const;

type Answers = Record<string, string | string[] | number>;

function QuoteWizard() {
  const params = useSearchParams();
  const productSlug = params.get("product") || "";
  const product = PRODUCTS.find((p) => p.slug === productSlug);

  const [step, setStep] = useState(0);
  const [flow, setFlow] = useState<QuoteFlow>(
    (product && flowGoal[product.category]) || "cctv"
  );
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [requirements, setRequirements] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState("");

  const questions = QUOTE_QUESTIONS[flow];

  const steps = useMemo(() => {
    if (product) {
      return [
        { key: "service", label: `Product: ${product.name}`, icon: Package },
        ...FLOW_STEPS.slice(1),
      ];
    }
    return FLOW_STEPS;
  }, [product]);

  const canContinue = () => {
    if (step === 0) return Boolean(flow);
    if (step === 1) return Boolean(propertyType && location.trim());
    if (step === 2) {
      for (const q of questions) {
        if (q.required && !answers[q.id]) return false;
      }
      return true;
    }
    if (step === 3) return Boolean(name.trim() && phone.trim());
    return true;
  };

  const next = () => {
    setError("");
    if (!canContinue()) {
      setError("Please complete the required fields on this step.");
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const setAnswer = (id: string, value: string | string[] | number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleOption = (id: string, value: string) => {
    setAnswers((prev) => {
      const cur = (prev[id] as string[]) || [];
      return {
        ...prev,
        [id]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value],
      };
    });
  };

  const submit = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: flow,
          propertyType,
          location,
          phone,
          email,
          requirements,
          preferredDate: date,
          budgetRange: budget,
          dynamicAnswers: answers,
          product: productSlug || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not submit");
      setRef(data.reference);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your request");
    } finally {
      setSending(false);
    }
  };

  if (ref) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/25 bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Request received</h1>
        <p className="mt-3 leading-relaxed text-gray-400">
          Thank you, {name.split(" ")[0]}. Your request has been received. Our technical team will
          review your requirements and contact you within one business day.
        </p>
        <p className="mt-6 inline-block rounded-xl border border-green-500/25 bg-green-500/[0.06] px-6 py-3 font-mono text-sm text-green-400">
          Reference: {ref}
        </p>
        {files.length > 0 && (
          <p className="mt-5 text-sm text-gray-400">
            To attach your {files.length} photo{files.length > 1 ? "s" : ""}, send them on WhatsApp
            with the reference{" "}
            <span className="font-mono text-green-400">{ref}</span>.
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappLink(
              SITE.whatsapp,
              `Hello Millennium Technologies,\n\nReference: ${ref}\nI'd like to attach site photos/videos for my quotation request.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Attach photos via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <p className="badge">Smart Quotation System</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Request a free quotation
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-400">
          Answer a few questions and our technical team will design a tailored solution with clear,
          transparent pricing — no hidden costs.
        </p>
      </div>

      <ol className="mt-10 mb-8 flex items-center gap-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const active = i === step;
          const done = i < step;
          return (
            <li key={s.label} className={cn("flex flex-1 items-center gap-2", i < steps.length - 1 && "after:h-px after:flex-1 after:bg-white/10")}>
              <span
                className={cn(
                  "flex items-center gap-2 text-xs font-medium sm:text-sm",
                  active ? "text-white" : done ? "text-green-400" : "text-gray-600"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                    active && "border-green-500/50 bg-green-500/10",
                    done && "border-green-500/40 bg-green-500/10",
                    !active && !done && "border-white/10 bg-white/[0.03]"
                  )}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white">What do you need?</h2>
            <p className="mt-1 text-sm text-gray-400">
              {product ? "Product selected — the related service questions will be used." : "Select the service that matches your needs."}
            </p>
            {product && (
              <div className="mt-4 rounded-xl border border-green-500/25 bg-green-500/[0.05] p-4 text-sm text-gray-300">
                Selected product: <span className="font-medium text-white">{product.name}</span>{" "}
                (SKU {product.sku})
              </div>
            )}
            {!product && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {QUOTE_SERVICES.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => {
                      setFlow(s.slug);
                      setAnswers({});
                    }}
                    className={cn(
                      "flex items-center justify-between rounded-xl border p-4 text-left text-sm transition-colors",
                      flow === s.slug
                        ? "border-green-500/40 bg-green-500/[0.07] text-white"
                        : "border-white/[0.08] text-gray-300 hover:border-green-500/25"
                    )}
                  >
                    {s.name}
                    {flow === s.slug && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-white">Tell us about the property</h2>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Property type <span className="text-green-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PROPERTY_TYPES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPropertyType(p)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm transition-colors",
                      propertyType === p
                        ? "border-green-500/40 bg-green-500/[0.07] text-white"
                        : "border-white/[0.08] text-gray-300 hover:border-green-500/25"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="q-location" className="mb-2 block text-sm font-medium text-gray-300">
                Location / Town <span className="text-green-400">*</span>
              </label>
              <input
                id="q-location"
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nairobi, Westlands"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-white">
              {flow === "general" ? "Your requirements" : "System details"}
            </h2>
            <div className="mt-5 space-y-5">
              {questions.map((q) => (
                <div key={q.id}>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    {q.label}
                    {q.required && <span className="text-green-400"> *</span>}
                  </label>
                  {q.type === "checkbox" && (
                    <div className="flex flex-wrap gap-2">
                      {q.options?.map((o) => {
                        const checked = ((answers[q.id] as string[]) || []).includes(o);
                        return (
                          <button
                            key={o}
                            type="button"
                            onClick={() => toggleOption(q.id, o)}
                            className={cn(
                              "rounded-xl border px-4 py-2 text-sm transition-colors",
                              checked
                                ? "border-green-500/40 bg-green-500/[0.07] text-green-400"
                                : "border-white/[0.08] text-gray-300 hover:border-green-500/25"
                            )}
                          >
                            {checked && "✓ "}
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {q.type === "radio" && (
                    <div className="flex flex-wrap gap-2">
                      {q.options?.map((o) => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => setAnswer(q.id, o)}
                          className={cn(
                            "rounded-xl border px-4 py-2 text-sm transition-colors",
                            answers[q.id] === o
                              ? "border-green-500/40 bg-green-500/[0.07] text-green-400"
                              : "border-white/[0.08] text-gray-300 hover:border-green-500/25"
                          )}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  )}
                  {q.type === "select" && (
                    <select
                      className="select"
                      value={String(answers[q.id] ?? "")}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                    >
                      <option value="">Select…</option>
                      {q.options?.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  )}
                  {q.type === "number" && (
                    <input
                      type="number"
                      min={0}
                      className="input"
                      placeholder={q.placeholder}
                      value={String(answers[q.id] ?? "")}
                      onChange={(e) => setAnswer(q.id, Number(e.target.value))}
                    />
                  )}
                  {q.type === "text" && (
                    <input
                      className="input"
                      placeholder={q.placeholder}
                      value={String(answers[q.id] ?? "")}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-white">Your contact details</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="q-name" className="mb-2 block text-sm font-medium text-gray-300">
                  Full name <span className="text-green-400">*</span>
                </label>
                <input id="q-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="q-phone" className="mb-2 block text-sm font-medium text-gray-300">
                  Phone <span className="text-green-400">*</span>
                </label>
                <input id="q-phone" type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XX XXX XXX" />
              </div>
              <div>
                <label htmlFor="q-email" className="mb-2 block text-sm font-medium text-gray-300">
                  Email (optional)
                </label>
                <input id="q-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="q-budget" className="mb-2 block text-sm font-medium text-gray-300">
                  Budget range
                </label>
                <select id="q-budget" className="select" value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option value="">Select…</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="q-date" className="mb-2 block text-sm font-medium text-gray-300">
                  Preferred installation date
                </label>
                <input id="q-date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-req" className="mb-2 block text-sm font-medium text-gray-300">
                  Additional requirements
                </label>
                <textarea id="q-req" className="input min-h-24 resize-y" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Anything else we should know…" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Paperclip className="h-4 w-4 text-green-400" />
                  Site photos / videos
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="input cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-green-500/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-green-400"
                  onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
                />
                <p className="mt-2 text-xs text-gray-500">
                  {files.length > 0
                    ? `${files.length} file(s) selected — attach them on WhatsApp after submitting using your reference number.`
                    : "Select photos or videos of your site. They will be attached securely after submission via WhatsApp."}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button onClick={back} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <button onClick={next} className="btn-primary">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={submit} disabled={sending} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  Submit Request <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        Free consultation · No obligation · Response within one business day
      </p>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-500">Loading…</div>}>
      <QuoteWizard />
    </Suspense>
  );
}