import { SITE } from "@/lib/site";
import { Reveal, SectionHeader } from "@/components/ui";

export default function Process() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="How We Work"
            title="A structured process, every project"
            sub="Our structured approach ensures every project is delivered with precision, quality, and reliability — from first contact to long-term support."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {SITE.process.map((step, i) => (
            <Reveal key={step.num} delay={(i % 5) * 60}>
              <div className="card relative h-full">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 font-mono text-sm font-semibold text-green-400">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}