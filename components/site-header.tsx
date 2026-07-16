import Link from "next/link";

const GITHUB_URL = "https://github.com/Aryayama/html_blog";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
            &lt;/&gt;
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            HTML Blog
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-zinc-400 transition hover:text-white"
          >
            Articles
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-3 py-2 text-zinc-400 transition hover:text-white"
          >
            GitHub
          </a>
          <a
            href={`${GITHUB_URL}/blob/main/README.md`}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Star the repo
          </a>
        </nav>
      </div>
    </header>
  );
}
