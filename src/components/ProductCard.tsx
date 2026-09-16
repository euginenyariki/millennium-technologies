import Link from "next/link";
import { Plus } from "lucide-react";
import ProductImage from "./ProductImage";
import { availabilityLabel, categoryMap, type Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const avail = availabilityLabel[product.availability];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-green-500/25 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-green-500/[0.06]"
    >
      <ProductImage art={product.art} slug={product.slug} label={product.name.split("—")[0].trim()} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-green-500/80">
            {categoryMap[product.category].name}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className={`h-1.5 w-1.5 rounded-full ${avail.dot}`} />
            {avail.label}
          </span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-green-300">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-400">{product.short}</p>
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div>
            <p className="text-base font-bold text-white">{formatPrice(product.price)}</p>
            <p className="text-[11px] text-gray-500">
              {product.warranty === "N/A" ? "No warranty" : product.warranty}
            </p>
          </div>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-green-500/25 bg-green-500/10 text-green-400 transition-colors group-hover:bg-green-500 group-hover:text-mt-950"
            aria-label="View product"
          >
            <Plus className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}