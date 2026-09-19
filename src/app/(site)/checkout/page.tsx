"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { formatPrice, whatsappLink } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { Honeypot } from "@/components/Honeypot";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const honeyRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !phone || items.length === 0) {
      setError("Please complete the required fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: i.name,
            sku: i.slug,
            qty: i.qty,
            price: i.price,
            install: i.install,
            installPrice: i.installPrice,
          })),
          total,
          name,
          phone,
          email,
          location,
          notes,
          method: "checkout",
          _website: honeyRef.current?.value || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order");
      setRef(data.reference);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order");
    } finally {
      setSending(false);
    }
  };

  if (ref) {
    const text = `Hello NexGuard Technologies,\n\nOrder Reference: ${ref}\nName: ${name}\nPhone: ${phone}\nTotal: ${formatPrice(total)}\n\nPlease confirm my order and arrange delivery/pickup.`;
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center pt-28">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/25 bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Order received</h1>
        <p className="mt-3 text-gray-400">
          Thank you, {name.split(" ")[0]}. Our team will confirm your order and the next steps by phone.
        </p>
        <p className="mt-6 inline-block rounded-xl border border-green-500/25 bg-green-500/[0.06] px-6 py-3 font-mono text-sm text-green-400">
          Reference: {ref}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={whatsappLink(SITE.whatsapp, text)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Confirm on WhatsApp
          </a>
          <Link href="/products" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center pt-28">
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
        <Link href="/products" className="btn-primary mt-6">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/cart" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-white">Checkout</h1>
      <p className="mt-2 text-sm text-gray-400">
        Place your order now and confirm via WhatsApp, or request a formal quotation.
      </p>

      <form onSubmit={submit} className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
        <Honeypot ref={honeyRef} />
        <h2 className="text-base font-semibold text-white">Items</h2>
        <ul className="mt-3 space-y-2 border-b border-white/[0.06] pb-5">
          {items.map((i) => (
            <li key={`${i.slug}-${i.install}`} className="flex justify-between gap-3 text-sm text-gray-300">
              <span>
                {i.name}
                {i.install && <span className="text-green-400"> + Installation</span>}
                <span className="ml-1 text-gray-500">× {i.qty}</span>
              </span>
              <span className="shrink-0 font-medium text-white">
                {formatPrice((i.price + (i.install ? i.installPrice : 0)) * i.qty)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="o-name" className="mb-2 block text-sm font-medium text-gray-300">
              Full name <span className="text-green-400">*</span>
            </label>
            <input id="o-name" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="o-phone" className="mb-2 block text-sm font-medium text-gray-300">
              Phone <span className="text-green-400">*</span>
            </label>
            <input id="o-phone" type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="o-email" className="mb-2 block text-sm font-medium text-gray-300">
              Email (optional)
            </label>
            <input id="o-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="o-location" className="mb-2 block text-sm font-medium text-gray-300">
              Delivery / pickup location
            </label>
            <input id="o-location" className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Town / address" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="o-notes" className="mb-2 block text-sm font-medium text-gray-300">
              Notes
            </label>
            <textarea id="o-notes" className="input min-h-20 resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know about the order…" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
          <span className="text-sm text-gray-400">Total</span>
          <span className="text-xl font-bold text-white">{formatPrice(total)}</span>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
        )}

        <button type="submit" disabled={sending} className="btn-primary mt-6 w-full disabled:opacity-60">
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          Place Order
        </button>
      </form>
    </div>
  );
}