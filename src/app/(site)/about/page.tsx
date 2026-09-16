import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  CheckCircle2,
  Eye,
  Heart,
  Lock,
  Rocket,
  Target,
  type LucideIcon,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/site";
import { Reveal, SectionHeader } from "@/components/ui";
import Process from "@/components/home/Process";
import CTABand from "@/components/home/CTABand";

const visionIcons: Record<string, LucideIcon> = {
  vision: Eye,
  mission: Target,
};

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Millennium Technologies Ltd — our vision, mission, values and the standards we uphold in security, technology and solar installations across Kenya.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Millennium Technologies"
        title={
          <>
            Protecting assets. <span className="gradient-text">Powering connectivity.</span>
          </>
        }
        sub="Millennium Technologies Ltd is a technology-driven company delivering smart security and reliable connectivity solutions for homes, businesses, and institutions."
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.07]">
              <Image
                src="/images/photos/quality-work.jpg"
                alt="Millennium Technologies team on site"
                width={960}
                height={540}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mt-950/80 via-transparent to-transparent" />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <p className="badge mb-4">Who we are</p>
              <h2 className="text-3xl font-bold tracking-tight text-white text-balance">
                Technology you can trust, workmanship you can see
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-gray-400 sm:text-base">
                Millennium Technologies Ltd is a technology-driven company delivering smart security
                and reliable connectivity solutions for homes, businesses, and institutions. We
                specialize in CCTV surveillance, access control systems, electric fencing, solar,
                networking, and computer maintenance — combining modern technology with professional
                installation and dependable support.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                Our focus is simple: protect what matters, connect what&apos;s important, and keep
                systems running seamlessly. From initial consultation to installation and long-term
                maintenance, we design solutions that are clean, efficient, and built to last.
              </p>
              <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/[0.05] p-5">
                <p className="text-sm font-medium italic text-green-400">
                  &ldquo;We don&apos;t just install systems — we build secure environments,
                  strong networks, and technology you can trust.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad-alt">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {[
            {
              type: "vision",
              title: "Our Vision",
              text: SITE.tagline + ". To be a trusted and reliable provider of smart security and IT solutions that enhance safety, efficiency, and connectivity for every client we serve.",
            },
            {
              type: "mission",
              title: "Our Mission",
              text: "To deliver high-quality, scalable, and cost-effective technology solutions through professional installation, dependable maintenance, and customer-focused service.",
            },
          ].map((item) => {
            const Icon = visionIcons[item.type] ?? Eye;
            return (
              <Reveal key={item.type}>
                <div className="card h-full">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-green-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-400">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Our Values"
              title="Values that define us"
              sub="Every project is approached with precision, quality workmanship, and attention to detail — because security and technology should work quietly, reliably, and without compromise."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SITE.values.map((v, i) => {
              const vIcons = [CheckCircle2, Award, Heart, Lock, Rocket];
              const Icon = vIcons[i] ?? CheckCircle2;
              return (
                <Reveal key={v.letter} delay={(i % 3) * 60}>
                  <div className="card h-full">
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/25 bg-green-500/10 font-mono text-lg font-bold text-green-400">
                      {v.letter}
                    </span>
                    <h3 className="text-base font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Process />
      <CTABand />
    </>
  );
}