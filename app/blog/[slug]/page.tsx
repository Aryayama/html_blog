import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogSlugs } from "@/content/functions/get-all-blog-slugs";
import { getBlog } from "@/content/functions/get-blog";
import { ArticleRenderer } from "@/components/article-renderer";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render one static page per blog slug at build time. */
export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

/** Per-post <title>, description, keywords and social cards. */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) {
    return { title: "Not found" };
  }

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.keywords,
    alternates: { canonical: blog.link },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.description,
      url: blog.link,
      images: [blog.image],
      publishedTime: blog.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="pb-10">
      {/* Article header */}
      <header className="mx-auto max-w-3xl px-5 pt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white"
        >
          <span aria-hidden>&larr;</span> All articles
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
          <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
          <span aria-hidden>&middot;</span>
          <span className="text-indigo-400">{blog.name}</span>
        </div>

        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {blog.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-400">
          {blog.description}
        </p>
      </header>

      {/* Cover image */}
      <div className="mx-auto mt-8 max-w-4xl px-5">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Body — raw HTML rendered through the styled parser */}
      <ArticleRenderer html={blog.article} />
    </main>
  );
}
