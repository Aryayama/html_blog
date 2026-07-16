import { blogs } from "../article";

/**
 * Return every blog slug.
 *
 * Used by `generateStaticParams` so Next.js can pre-render each post at build
 * time, and by any sitemap / RSS generation you add later.
 */
export function getAllBlogSlugs(): string[] {
  return blogs.map((blog) => blog.slug);
}
