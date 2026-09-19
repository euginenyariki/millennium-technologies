"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { formatPrice, whatsappLink } from "@/lib/utils";
import { SITE } from "@/lib/site";

export default function CartPage() {
  const { items, total, count, setQty, remove, clear } = useCart();

  const checkoutWhatsapp = () => {
    const lines = items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name}${i.install ? " + Installation" : ""} × ${i.qty} — ${formatPrice(i.price + (i.install ? i.installPrice : 0))}`
      )
      .join("\n");
    const text = `Hello NexGuard Technologies,\n\nI would like to order:\n\n${lines}\n\nTotal: ${formatPrice(total)}\nPlease confirm availability and the next steps.`;
    window.open(whatsappLink(SITE.whatsapp, text), "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center pt-28">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <ShoppingCart className="h-7 w-7 text-gray-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="mt-3 text-gray-400">Browse our product catalogue and add equipment to your cart.</p>
        <Link href="/products" className="btn-primary mt-8">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Your Cart <span className="text-lg font-normal text-gray-400">({count} items)</span>
        </h1>
        <button onClick={clear} className="text-sm text-gray-500 transition-colors hover:text-red-400">
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.slug}-${item.install}`} className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {formatPrice(item.price)} per unit
                  {item.install && (
                    <span className="text-green-400"> + {formatPrice(item.installPrice)} installation</span>
                  )}
                </p>
                <p className="mt-1 text-sm font-bold text-white">
                  {formatPrice((item.price + (item.install ? item.installPrice : 0)) * item.qty)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-xl border border-white/[0.1] p-1">
                  <button onClick={() => setQty(item.slug, item.install, item.qty - 1)} className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white" aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">{item.qty}</span>
                  <button onClick={() => setQty(item.slug, item.install, item.qty + 1)} className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white" aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={() => remove(item.slug, item.install)} className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400" aria-label={`Remove ${item.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
          <h2 className="text-lg font-semibold text-white">Order Summary</h2>
          <div className="mt-4 space-y-3 border-b border-white/[0.06] pb-4 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Items</span>
              <span>{count}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery</span>
              <span>Confirmed on order</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">Total</span>
            <span className="text-xl font-bold text-white">{formatPrice(total)}</span>
          </div>
          <div className="mt-5 grid gap-2.5">
            <Link href="/checkout" className="btn-primary w-full">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <button onClick={checkoutWhatsapp} className="btn-secondary w-full">
              Order via WhatsApp
            </button>
            <Link href="/products" className="py-2 text-center text-sm text-gray-500 transition-colors hover:text-green-400">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}