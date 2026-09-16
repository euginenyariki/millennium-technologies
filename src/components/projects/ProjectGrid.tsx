"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data";
import { Reveal } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function ProjectGrid() {
  const [filter, setFilter] = useState<string>("all");
  const list = PROJECTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            filter === "all"
              ? "border-green-500/40 bg-green-500/10 text-green-400"
              : "border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white"
          )}
        >
          All
        </button>
        {PROJECT_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === c
                ? "border-green-500/40 bg-green-500/10 text-green-400"
                : "border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 60}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-green-500/25 hover:shadow-xl hover:shadow-green-500/[0.06]"
            >
              <div className="relative">
                <ProductImage art={p.art} className="aspect-[16/10]" />
                <div className="absolute inset-0 bg-gradient-to-t from-mt-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-mt-950/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
                  {p.category}
                </span>
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-mt-950/80 text-white opacity-0 backdrop-blur transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-gray-500">{p.location} · {p.clientType}</p>
                <h3 className="mt-1 text-base font-semibold text-white transition-colors group-hover:text-green-300">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-400">{p.solution}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-16 text-center text-gray-500">No projects in this category yet.</p>
      )}
    </div>
  );
}