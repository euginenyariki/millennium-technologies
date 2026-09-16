import {
  Award,
  PenLine,
  Puzzle,
  ShieldCheck,
  Timer,
  Wallet,
} from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui";

const edgeItems = [
  {
    icon: Award,
    title: "Experienced Technicians",
    desc: "Skilled professionals with hands-on expertise across all our service lines.",
  },
  {
    icon: Puzzle,
    title: "Integrated Solutions",
    desc: "Security, connectivity and IT solutions designed to work together seamlessly.",
  },
  {
    icon: Timer,
    title: "Prompt Response",
    desc: "Fast response times and reliable support when you need it most.",
  },
  {
    icon: PenLine,
    title: "Customized Approach",
    desc: "Every solution is tailored specifically to your site and requirements.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    desc: "Clear, competitive pricing with no hidden costs or surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Commitment",
    desc: "We use certified components and follow industry best practices — always.",
  },
];

export default function Edge() {
  return (
    <section className="section-pad-alt">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Why Choose Us"
            title="The Millennium edge"
            sub="We combine technical expertise with a customer-first approach to deliver solutions that truly make a difference."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {edgeItems.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 60}>
              <div className="card h-full">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10">
                  <e.icon className="h-5 w-5 text-green-400" />
                </span>
                <h3 className="text-base font-semibold text-white">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{e.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}