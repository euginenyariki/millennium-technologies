"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Minus, Plus, ShoppingCart, Wrench, Zap } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { formatPrice, whatsappLink } from "@/lib/utils";
import { SITE } from "@/lib/site";
import type { Product } from "@/lib/data";

export default function ProductActions({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [install, setInstall] = useState(false);
  const [added, setAdded] = useState(false);

  const unitTotal = product.price + (install && product.installPrice ? product.installPrice : 0);

  const addToCart = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        install,
        installPrice: install && product.installPrice ? product.installPrice : 0,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const buyNow = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        install,
        installPrice: install && product.installPrice ? product.installPrice : 0,
      },
      qty
    );
    setOpen(true);
  };

  const enquire = () => {
    const text = `Hello NexGuard Technologies,\n\nI would like to enquire about:\n\n${product.name}\nSKU: ${product.sku}\nPrice: ${formatPrice(product.price)}\n${install && product.installPrice ? `With professional installation (${formatPrice(product.installPrice)})` : "Without installation"}\nQuantity: ${qty}\n\nPlease advise availability and next steps.`;
    window.open(whatsappLink(SITE.whatsapp, text), "_blank");
  };

  return (
    <div>
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
        <div className={product.availability === "out_of_stock" ? "opacity-60" : ""}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-3xl font-bold tracking-tight text-white">{formatPrice(product.price)}</p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="text-sm text-gray-500 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">Guide price. Confirm at quotation.</p>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Availability</span>
              <span className="font-medium text-green-400">
                {product.availability === "in_stock" && "In stock"}
                {product.availability === "low_stock" && "Low stock — order soon"}
                {product.availability === "out_of_stock" && "Order on request"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">SKU</span>
              <span className="font-mono text-gray-300">{product.sku}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Warranty</span>
              <span className="max-w-[60%] text-right text-gray-300">{product.warranty}</span>
            </div>
          </div>
        </div>

        {product.installable && product.installPrice ? (
          <label className={`mt-5 flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${install ? "border-green-500/40 bg-green-500/[0.07]" : "border-white/[0.08] bg-white/[0.02] hover:border-green-500/25"}`}>
            <input
              type="checkbox"
              checked={install}
              onChange={(e) => setInstall(e.target.checked)}
              className="mt-1 h-4 w-4 accent-green-500"
              disabled={product.availability === "out_of_stock"}
            />
            <span>
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <Wrench className="h-4 w-4 text-green-400" />
                Add Professional Installation
              </span>
              <span className="mt-1 block text-xs text-gray-400">
                Certified technicians, industry-standard workmanship, testing &amp; handover.
              </span>
              <span className="mt-1 block text-sm font-medium text-green-400">
                + {formatPrice(product.installPrice)}
              </span>
            </span>
          </label>
        ) : (
          <p className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-xs text-gray-500">
            Installation can be arranged on request — add it in the quotation form.
          </p>
        )}

        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.1] p-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-white">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="text-lg font-semibold text-white">
            {formatPrice(unitTotal * qty)}
            <span className="ml-1 text-xs font-normal text-gray-500">total</span>
          </p>
        </div>

        <div className="mt-5 grid gap-2.5">
          <button onClick={addToCart} disabled={product.availability === "out_of_stock"} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
            {added ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Added to cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </>
            )}
          </button>
          <button onClick={buyNow} disabled={product.availability === "out_of_stock"} className="btn-secondary w-full disabled:cursor-not-allowed disabled:opacity-50">
            <Zap className="h-4 w-4 text-green-400" /> Buy Now
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-2.5">
        <Link href={`/quote?product=${product.slug}`} className="btn-secondary w-full">
          Request a Quotation
        </Link>
        <button onClick={enquire} className="btn-secondary w-full">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-green-400" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enquire on WhatsApp
        </button>
      </div>
    </div>
  );
}