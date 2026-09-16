"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PRODUCTS, type CategorySlug } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

type Filter = CategorySlug | "all";

export default function ProductGrid() {
  const params = useSearchParams();
  const initial = (params.get("category") as Filter) || "all";
  const [filter, setFilter] = useState<Filter>(
    CATEGORIES.some((c) => c.slug === initial) ? initial : "all"
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const catOk = filter === "all" || p.category === filter;
      const queryOk =
        !q || p.name.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q);
      return catOk && queryOk;
    });
  }, [filter, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 sm:flex">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Category
          </span>
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === "all"
                ? "border-green-500/40 bg-green-500/10 text-green-400"
                : "border-white/[0.08] bg-white/[0.02] text-gray-400 hover:border-green-500/25 hover:text-white"
            )}
          >
            All
          </button>
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                onClick={() => setFilter(c.slug)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === c.slug
                    ? "border-green-500/40 bg-green-500/10 text-green-400"
                    : "border-white/[0.08] bg-white/[0.02] text-gray-400 hover:border-green-500/25 hover:text-white"
                )}
              >
                {c.name}
                <span className="ml-1.5 text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="input pl-10"
            aria-label="Search products"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-gray-400">No products match your search.</p>
          <button
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
            className="btn-secondary mt-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}