import Link from "next/link";
import { BlogCardSection } from "@/components/blog-card-section";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 pb-10 pt-20 text-center sm:pt-28">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            HTML-first · Next.js · TypeScript · Tailwind
          </span>

          <h1 className="animate-fade-up mt-6 text-balance text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            A blog standard
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              built with plain HTML
            </span>
          </h1>

          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-zinc-400">
            No Markdown. No MDX. Every post is a typed HTML string you control
            completely, rendered with full styling per tag. Fork it, star it,
            make it better.
          </p>

          <div className="animate-fade-up mt-9 flex items-center justify-center gap-3">
            <a
              href="https://github.com/Aryayama/html_blog"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              View on GitHub
            </a>
            <Link
              href="#articles"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Read the articles
            </Link>
          </div>
        </div>
      </section>

      <BlogCardSection />
    </main>
  );
}
