import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Factory,
  Home,
  School,
  ShoppingBag,
  Stethoscope,
  TreePalm,
  UtensilsCrossed,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/site";
import { Reveal, SectionHeader } from "@/components/ui";
import CTABand from "@/components/home/CTABand";

const icons = {
  residential: Home,
  corporate: Building2,
  schools: School,
  hospitals: Stethoscope,
  retail: ShoppingBag,
  industrial: Factory,
  hospitality: UtensilsCrossed,
  agriculture: TreePalm,
} as const;

const highlights: Record<string, string[]> = {
  residential: ["CCTV surveillance", "Perimeter & electric fencing", "Gate automation", "Solar backup power"],
  corporate: ["Access control & audit trails", "Structured cabling & LAN", "CCTV & monitoring", "IT support contracts"],
  schools: ["Monitored environments", "Perimeter security", "Student & staff access control", "Connectivity for learning"],
  hospitals: ["24/7 surveillance", "Restricted-area access control", "Starlink & connectivity backup"],
  retail: ["Shoplifting deterrence", "Till & entry monitoring", "Reliable Wi-Fi for customers"],
  industrial: ["Large-scale CCTV", "Boom barriers & gate control", "Electric fencing", "Solar for operations"],
  hospitality: ["Guest & staff access", "High-density Wi-Fi", "Perimeter security", "Backup power"],
  agriculture: ["Solar water pumping", "Starlink in remote areas", "Perimeter protection", "Farm monitoring"],
};

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Security, technology and solar solutions for residential homes, corporate offices, schools, hospitals, retail, industrial facilities, hotels, farms and institutions.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Serve"
        title={
          <>
            Industries & <span className="gradient-text">applications</span>
          </>
        }
        sub="Every property has different risks and different needs. Our solutions adapt to the environment — from single homes to large institutions."
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl space-y-6">
          {SITE.industries.map((ind, i) => {
            const Icon = icons[ind.slug as keyof typeof icons] ?? Building2;
            return (
              <Reveal key={ind.slug} delay={i * 30}>
                <div className="card grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-center">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-green-400">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-white">{ind.title}</h2>
                      <p className="mt-1 text-sm text-gray-400">{ind.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    {highlights[ind.slug]?.map((h) => (
                      <span key={h} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-pad-alt">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Project Capability"
              title="Small homes to large-scale deployments"
              sub="From single residential installations to large corporate deployments, we handle projects of varying complexity with the same level of professionalism, care, and attention to detail."
              center
            />
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/projects" className="btn-primary">
                View Our Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/quote" className="btn-secondary">Request a Quote</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}