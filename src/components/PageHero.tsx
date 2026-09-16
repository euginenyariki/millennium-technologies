import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function PageHero({
  eyebrow,
  title,
  sub,
  children,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-white/[0.06] pt-28 pb-16", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/40 via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className={cn("relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", align === "center" ? "text-center" : "text-left")}>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {eyebrow}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400 text-pretty">{sub}</p>}
        {children && <div className={cn("mt-8", align === "center" && "flex justify-center")}>{children}</div>}
      </div>
    </section>
  );
}