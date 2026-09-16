import Link from "next/link";
import {
  ArrowRight,
  Camera,
  DoorOpen,
  Fingerprint,
  HeartPulse,
  Monitor,
  Network,
  Satellite,
  ShieldAlert,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { BOOKING_SERVICES } from "@/lib/data";
import { Reveal, SectionHeader } from "@/components/ui";
import Process from "@/components/home/Process";
import CTABand from "@/components/home/CTABand";

const serviceIcons: Record<string, LucideIcon> = {
  "cctv-installation": Camera,
  "cctv-repair": Wrench,
  "cctv-maintenance": Wrench,
  "electric-fence-installation": ShieldAlert,
  "access-control-installation": Fingerprint,
  "solar-installation": Sun,
  "gate-automation": DoorOpen,
  networking: Network,
  "starlink-installation": Satellite,
  "it-support": Monitor,
};

export const metadata: Metadata = {
  title: "Services & Booking",
  description:
    "Book CCTV installation and repair, electric fencing, solar, gate automation, networking, Starlink and IT support. Emergency and urgent service options available.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & Booking"
        title={
          <>
            Expert installation. <span className="gradient-text">Reliable aftercare.</span>
          </>
        }
        sub="Book any of our services online — pick a service, tell us where and when, and our technical team will confirm. Urgent and emergency support is available."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/book" className="btn-primary">
            Book a Service
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/quote" className="btn-secondary">
            Request a Quote
          </Link>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Book Online"
              title="Choose a service"
              sub="Select a service to book directly, or use the quotation system for custom design requirements."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BOOKING_SERVICES.map((s, i) => {
              const Icon = serviceIcons[s.slug] ?? Wrench;
              return (
                <Reveal key={s.slug} delay={(i % 3) * 60}>
                  <div className="card group flex h-full flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-green-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-semibold text-white">{s.name}</h3>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-gray-400">{s.desc}</p>
                    <Link
                      href={`/book?service=${s.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-green-400 transition-colors hover:text-green-300"
                    >
                      Book this service
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={240}>
              <div className="gradient-border flex h-full flex-col rounded-2xl bg-mt-800 p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10">
                  <HeartPulse className="h-5 w-5 text-green-400" />
                </span>
                <h3 className="text-base font-semibold text-white">Emergency Support</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                  System down? Property at risk? Our team provides rapid response for urgent
                  security and connectivity failures — 24/7.
                </p>
                <Link href="/book?service=emergency" className="btn-primary mt-5 w-full">
                  Request Emergency Support
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Process />
      <CTABand />
    </>
  );
}