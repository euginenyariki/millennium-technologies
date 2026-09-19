import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image
          src="/images/photos/hero-bg.jpg"
          alt="Security technology installation by NexGuard Technologies"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mt-950/85 via-mt-950/80 to-mt-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-green-950/30 via-transparent to-transparent" />
      </div>

      {/* Security grid */}
      <div
        className="pointer-events-none absolute inset-0 animate-grid-fade opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.4) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
        <div className="animate-scan h-full w-full bg-gradient-to-b from-transparent via-green-500/[0.06] to-transparent" />
      </div>

      {/* Network nodes */}
      <div className="pointer-events-none absolute right-[8%] top-[24%] hidden md:block">
        {[
          "left-0 top-0",
          "left-24 top-8",
          "left-48 top-0",
          "left-10 top-20",
          "left-36 top-24",
        ].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse-slow`}
            style={{ animationDelay: `${i * 0.4}s`, opacity: 0.5 }}
          />
        ))}
        <svg className="absolute left-2 top-0 h-40 w-48 opacity-20" aria-hidden>
          {[
            [0, 0, 96, 32],
            [96, 32, 192, 0],
            [40, 80, 144, 96],
            [0, 0, 144, 96],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(74,222,128,0.6)" strokeWidth="1.5" />
          ))}
        </svg>
      </div>

      {/* Energy particles */}
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] hidden md:block">
        {["bottom-0 left-4", "bottom-10 left-14", "bottom-4 left-24", "bottom-14 left-0"].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} h-2 w-2 rounded-full border border-green-500/60 animate-pulse-slow`}
            style={{ animationDelay: `${i * 0.6}s`, opacity: 0.4 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/[0.07] px-4 py-1.5 backdrop-blur">
          <ShieldCheck className="h-4 w-4 text-green-400" />
          <span className="text-xs font-medium tracking-wide text-green-300">
            {SITE.tagline}
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
          Smart Security.
          <br />
          <span className="gradient-text">Reliable Technology.</span>
          <br />
          Sustainable Energy.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 text-pretty sm:text-lg">
          {SITE.heroSub}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/quote" className="btn-primary w-full sm:w-auto">
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/solutions" className="btn-secondary w-full sm:w-auto">
            <Zap className="h-4 w-4 text-green-400" />
            Explore Our Solutions
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
          {["CCTV & Surveillance", "Access Control", "Electric Fencing", "Solar Energy", "Starlink", "IT Support"].map(
            (t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-green-500/60" />
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}