import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import {
  PRODUCTS,
  PROJECTS,
  SOLUTIONS,
} from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  const staticPages = [
    "",
    "/about",
    "/solutions",
    "/products",
    "/services",
    "/industries",
    "/projects",
    "/quote",
    "/book",
    "/contact",
    "/cart",
  ];

  const productRoutes = PRODUCTS.map((p) => ({
    url: url(`/products/${p.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = PROJECTS.map((p) => ({
    url: url(`/projects/${p.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const solutionRoutes = SOLUTIONS.map((s) => ({
    url: url(`/solutions#${s.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages.map((p) => ({
      url: url(p),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...productRoutes,
    ...projectRoutes,
    ...solutionRoutes,
  ];
}