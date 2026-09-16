// Build-time database provider switcher
//
// Prisma does not allow `env()` in the `provider` field, so this script
// rewrites prisma/schema.prisma based on DATABASE_PROVIDER:
//   - "postgresql" -> provider = "postgresql" (production / Vercel + Neon)
//   - otherwise     -> provider = "sqlite"    (local development)
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const schemaPath = resolve(process.cwd(), "prisma", "schema.prisma");
const provider = (process.env.DATABASE_PROVIDER || "sqlite").toLowerCase();

let schema = readFileSync(schemaPath, "utf8");

if (provider === "postgresql") {
  schema = schema.replace(/provider = "sqlite"/, 'provider = "postgresql"');
} else {
  schema = schema.replace(/provider = "postgresql"/, 'provider = "sqlite"');
}

writeFileSync(schemaPath, schema);
console.log(`[db-provider] schema.prisma provider set to: ${provider}`);