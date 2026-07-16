const GITHUB_URL = "https://github.com/Aryayama/html_blog";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Built with Next.js, TypeScript &amp; Tailwind CSS. HTML-first, no
          Markdown.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-200"
          >
            GitHub
          </a>
          <a
            href="https://html-blog.rm.xyz"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-200"
          >
            Live demo
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
