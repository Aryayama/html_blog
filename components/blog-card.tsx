import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/content/article";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
  /** Used to stagger the entrance animation. */
  index?: number;
}

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
  return (
    <Link
      href={blog.link}
      style={{ animationDelay: `${index * 90}ms` }}
      className="animate-fade-up group relative block rounded-2xl bg-gradient-to-br from-white/10 to-white/0 p-px transition duration-300 hover:from-indigo-400/40 hover:to-fuchsia-400/30"
    >
      {/* Soft glow that appears on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/0 via-fuchsia-500/0 to-indigo-500/0 opacity-0 blur transition duration-500 group-hover:from-indigo-500/30 group-hover:via-fuchsia-500/20 group-hover:to-indigo-500/30 group-hover:opacity-100"
      />

      <article className="relative overflow-hidden rounded-2xl bg-zinc-950">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        </div>

        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            {formatDate(blog.createdAt)}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-white transition group-hover:text-indigo-200">
            {blog.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
            {blog.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-400">
            Read article
            <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
