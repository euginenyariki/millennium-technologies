import { ShieldCheck, Users, ThumbsUp, Headphones } from "lucide-react";

const statItems = [
  { value: "5+", label: "Years Experience", icon: ShieldCheck },
  { value: "200+", label: "Projects Completed", icon: Users },
  { value: "98%", label: "Client Satisfaction", icon: ThumbsUp },
  { value: "24/7", label: "Support Available", icon: Headphones },
];

export default function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-mt-900/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {statItems.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2 px-4 py-4 text-center">
            <s.icon className="h-5 w-5 text-green-500" />
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {s.value}
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}