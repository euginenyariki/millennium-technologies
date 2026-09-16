import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  DoorOpen,
  Fingerprint,
  Monitor,
  Network,
  Satellite,
  ShieldAlert,
  Sun,
} from "lucide-react";
import { SOLUTIONS } from "@/lib/data";
import { Reveal, SectionHeader } from "@/components/ui";

const icons = {
  cctv: Camera,
  access: Fingerprint,
  fence: ShieldAlert,
  gate: DoorOpen,
  solar: Sun,
  network: Network,
  starlink: Satellite,
  it: Monitor,
} as const;

export default function SolutionsGrid() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Core Solutions"
            title={
              <>
                Everything you need. <span className="gradient-text">One technology partner.</span>
              </>
            }
            sub="Eight integrated solution lines — designed, supplied and installed by one accountable team. No juggling contractors, no passing responsibility."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((s, i) => {
            const Icon = icons[s.slug as keyof typeof icons] ?? ShieldAlert;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 60}>
                <Link
                  href={`/solutions#${s.slug}`}
                  className="group card flex h-full flex-col"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-green-400 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs text-gray-600">{s.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-green-500/70">
                    {s.subtitle}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-400">
                    {s.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Learn more
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}