import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-mt-950 px-4">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-green-500">Error 404</p>
        <h1 className="mt-4 text-5xl font-bold text-white">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </main>
  );
}