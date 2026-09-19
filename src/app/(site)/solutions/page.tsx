import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SOLUTIONS, solutionMap } from "@/lib/data";
import { Reveal } from "@/components/ui";
import CTABand from "@/components/home/CTABand";
import { cn } from "@/lib/utils";

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Solutions"
        title={
          <>
            Integrated solutions. <span className="gradient-text">Engineered together.</span>
          </>
        }
        sub="Eight specialised lines, one accountable team. Every system is designed to work as part of a single, reliable security and technology infrastructure."
      />

      <div className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6 lg:px-8">
        {SOLUTIONS.map((s, i) => {
          const reversed = i % 2 === 1;
          return (
            <Reveal key={s.slug}>
              <div id={s.slug} className={cn("grid scroll-mt-24 items-center gap-10 lg:grid-cols-2", reversed && "lg:[&>*:first-child]:order-2")}>
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.07]">
                  <Image
                    src={s.photo}
                    alt={`${s.title} — NexGuard Technologies`}
                    width={1024}
                    height={640}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mt-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-green-500/25 bg-mt-950/80 px-4 py-1.5 font-mono text-sm text-green-400 backdrop-blur">
                    {s.number} / {String(SOLUTIONS.length).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <span className="badge mb-4">{s.subtitle}</span>
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                    {s.desc}
                  </p>

                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <p key={p} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.apps.map((a) => (
                      <span key={a} className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                        <MapPin className="h-3 w-3 text-green-500/70" />
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/quote" className="btn-primary">
                      Get a Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/products?category=${solutionMap[s.slug]?.slug ?? ""}`}
                      className="btn-secondary"
                    >
                      View Related Products
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <CTABand />
    </>
  );
}