import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, MapPin, Wrench } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import ProductImage from "@/components/ProductImage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.description };
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-28 pb-24 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-green-400">Home</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li><Link href="/projects" className="hover:text-green-400">Projects</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li className="text-gray-300">{project.title}</li>
        </ol>
      </nav>

      <div className="overflow-hidden rounded-3xl border border-white/[0.07]">
        <ProductImage art={project.art} className="aspect-[16/10]" />
        <div className="flex flex-wrap items-center gap-4 bg-mt-900 px-6 py-4 text-sm text-gray-400">
          <span className="badge">{project.category}</span>
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-green-500/70" />{project.location}</span>
          <span>{project.clientType}</span>
          <span className="ml-auto text-xs text-gray-500">Completed {project.date}</span>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{project.title}</h1>
          <p className="mt-1 text-sm text-green-400">{project.solution}</p>
          <p className="mt-6 text-sm leading-relaxed text-gray-400">{project.description}</p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
            <Wrench className="h-4 w-4 text-green-400" /> Equipment &amp; Components
          </h3>
          <ul className="mt-4 space-y-2">
            {project.equipment.map((e) => (
              <li key={e} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500/60" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07]">
          <div className="h-48 bg-red-950/30" />
          <div className="absolute inset-0 flex items-center justify-center bg-mt-950/60">
            <span className="rounded-xl border border-white/10 bg-mt-950/80 px-4 py-2 text-sm text-gray-400">
              Before — placeholder image
            </span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07]">
          <ProductImage art={project.art} className="h-48" />
          <div className="absolute inset-0 flex items-center justify-center bg-mt-950/60">
            <span className="rounded-xl border border-green-500/20 bg-mt-950/80 px-4 py-2 text-sm text-green-400">
              After — project complete
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300">
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
}