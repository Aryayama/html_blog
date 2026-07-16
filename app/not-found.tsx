import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          This page took a different route.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-zinc-400">
          The article you&rsquo;re looking for doesn&rsquo;t exist (or never did).
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
        >
          Back to articles
        </Link>
      </div>
    </main>
  );
}
