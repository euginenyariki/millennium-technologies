"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  center = true,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={cn("mb-12 max-w-3xl", center && "mx-auto text-center")}>
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          light ? "text-white" : "text-white"
        )}
      >
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-gray-400">{sub}</p>}
    </div>
  );
}