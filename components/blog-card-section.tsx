import { blogs } from "@/content/article";
import { BlogCard } from "./blog-card";

export function BlogCardSection() {
  return (
    <section
      id="articles"
      className="mx-auto max-w-5xl px-5 py-16 sm:py-20"
    >
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
            The Blog
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Latest articles
          </h2>
        </div>
        <p className="hidden text-sm text-zinc-500 sm:block">
          {blogs.length} article{blogs.length === 1 ? "" : "s"} · rendered with
          HTML
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <BlogCard key={blog.slug} blog={blog} index={index} />
        ))}
      </div>
    </section>
  );
}
