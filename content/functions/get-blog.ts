import { blogs, type Blog } from "../article";

/**
 * Fetch a single blog post by its slug.
 *
 * Equivalent to the transcript's `getBlogBySlug`. In the local standard this
 * is a synchronous in-memory lookup; swap the body for an API/DB call if you
 * move to the CMS variant.
 */
export function getBlog(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

/** Alias kept for parity with the documented naming. */
export const getBlogBySlug = getBlog;
