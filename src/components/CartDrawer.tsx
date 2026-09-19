"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice, whatsappLink } from "@/lib/utils";
import { SITE } from "@/lib/site";

export default function CartDrawer() {
  const { items, total, count, remove, setQty, open, setOpen, clear } = useCart();

  const checkoutWhatsapp = () => {
    const lines = items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name}${i.install ? " + Installation" : ""} × ${i.qty} — ${formatPrice(i.price + (i.install ? i.installPrice : 0))}`
      )
      .join("\n");
    const text = `Hello NexGuard Technologies,\n\nI would like to order:\n\n${lines}\n\nTotal: ${formatPrice(total)}\nReference will be provided on confirmation.`;
    window.open(whatsappLink(SITE.whatsapp, text), "_blank");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/[0.08] bg-mt-900 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <ShoppingCart className="h-5 w-5 text-green-500" />
            Your Cart
            {count > 0 && <span className="text-sm font-normal text-gray-400">({count})</span>}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <ShoppingCart className="h-7 w-7 text-gray-500" />
            </div>
            <p className="text-gray-400">Your cart is empty.</p>
            <Link href="/products" className="btn-primary" onClick={() => setOpen(false)}>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div key={`${item.slug}-${item.install}`} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatPrice(item.price)}
                        {item.install && (
                          <span className="text-green-400"> + {formatPrice(item.installPrice)} installation</span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.slug, item.install)}
                      className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] p-1">
                      <button
                        onClick={() => setQty(item.slug, item.install, item.qty - 1)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-white">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.slug, item.install, item.qty + 1)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {formatPrice((item.price + (item.install ? item.installPrice : 0)) * item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">Total</span>
                <span className="text-xl font-bold text-white">{formatPrice(total)}</span>
              </div>
              <div className="grid gap-2.5">
                <button onClick={checkoutWhatsapp} className="btn-primary w-full">
                  Checkout via WhatsApp
                </button>
                <Link href="/checkout" className="btn-secondary w-full" onClick={() => setOpen(false)}>
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clear}
                  className="w-full py-2 text-center text-xs text-gray-500 transition-colors hover:text-red-400"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}