import Link from "next/link";
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
import { SITE } from "@/lib/site";
import { Reveal, SectionHeader } from "@/components/ui";

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

export default function IndustriesStrip() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Built for every property type"
            sub="From single homes to multi-site institutions, the same standard of design, workmanship and support."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITE.industries.map((ind, i) => {
            const Icon = icons[ind.slug as keyof typeof icons] ?? Building2;
            return (
              <Reveal key={ind.slug} delay={(i % 4) * 60}>
                <Link
                  href="/industries"
                  className="card group flex h-full flex-col items-start"
                >
                  <Icon className="mb-3 h-6 w-6 text-green-500" />
                  <h3 className="text-sm font-semibold text-white">{ind.title}</h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-400">
                    {ind.desc}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <div className="mt-10 text-center">
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300">
              Explore industries we serve
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}