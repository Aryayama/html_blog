import { whyIRenderBlogsWithHtml } from "./articles/why-i-render-blogs-with-html";
import { theAnatomyOfAGoodBlogCard } from "./articles/the-anatomy-of-a-good-blog-card";

/**
 * The shape of a single blog post.
 *
 * `article` holds the raw HTML for the post body. Because it is just a string,
 * it is fully typed, tree-shakeable and importable from anywhere in the app.
 */
export type Blog = {
  /** Short label used in lists / SEO. */
  name: string;
  /** One-line summary shown on the card and in meta tags. */
  description: string;
  /** Full <h1> title of the article. */
  title: string;
  /** URL slug, also used as the [slug] route param. */
  slug: string;
  /** ISO date string (e.g. "2026-07-16"). */
  createdAt: string;
  /** Canonical link to the rendered post. */
  link: string;
  /** Cover image URL (used by the card and Open Graph). */
  image: string;
  /** SEO keywords. */
  keywords: string[];
  /** The article body as an HTML string. */
  article: string;
};

/**
 * `article.ts` is the single source of truth: an array of blog objects.
 *
 * Each `article` value is imported from its own file under `content/articles/`,
 * so every post lives in its own, easy-to-find TypeScript module.
 */
export const blogs: Blog[] = [
  {
    name: "Why I Render Blogs with HTML",
    description:
      "Markdown is fine — I just don't like it. Here is the HTML-first blog standard I built for myself, and why it gives me total control.",
    title: "Why I Render My Blogs with HTML (Not Markdown)",
    slug: "why-i-render-blogs-with-html",
    createdAt: "2026-07-16",
    link: "/blog/why-i-render-blogs-with-html",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    keywords: [
      "html blog",
      "no markdown",
      "nextjs",
      "react-html-parser",
      "blog standard",
    ],
    article: whyIRenderBlogsWithHtml,
  },
  {
    name: "The Anatomy of a Good Blog Card",
    description:
      "A breakdown of the gradient blog card used across this site — layout, hover states, motion and the small details that make it feel premium.",
    title: "The Anatomy of a Good Blog Card",
    slug: "the-anatomy-of-a-good-blog-card",
    createdAt: "2026-07-10",
    link: "/blog/the-anatomy-of-a-good-blog-card",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
    keywords: [
      "blog card",
      "tailwindcss",
      "ui design",
      "gradient",
      "nextjs components",
    ],
    article: theAnatomyOfAGoodBlogCard,
  },
];

/** Convenience accessor used by pages/components. */
export function getBlogs(): Blog[] {
  return blogs;
}
