import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectGrid from "@/components/projects/ProjectGrid";
import CTABand from "@/components/home/CTABand";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "A portfolio of completed security, solar, networking, gate automation, access control, IT and connectivity projects across Kenya.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title={
          <>
            Delivered with <span className="gradient-text">precision</span>
          </>
        }
        sub="A selection of completed projects — from residential CCTV and solar to corporate networking and institutional access control. Hover for details."
      />
      <ProjectGrid />
      <CTABand />
    </>
  );
}