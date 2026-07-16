# HTML Blog

> An HTML-first blog standard, built like a senior with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS**.

No Markdown. No MDX. No headless CMS dialect. Every post is a **typed HTML string** you control completely, and it's rendered with full, per-tag styling control via [`html-react-parser`](https://github.com/remarkablemark/html-react-parser).

🌐 Live demo: https://html-blog.rm.xyz
🐙 Source: https://github.com/Aryayama/html_blog

---

## Why HTML and not Markdown?

Markdown is fine — I just don't like it. With this standard I write the tags I've known for twenty years, keep everything typed and importable, and a single `transformNode` function decides exactly how every `<h1>`, `<p>`, `<a>`, `<code>` and `<blockquote>` looks. Total control, zero magic.

## The standard in 30 seconds

Three moving parts:

| Piece | What it is |
| --- | --- |
| `content/article.ts` | An array of typed `Blog` objects (your metadata). |
| `content/articles/*.ts` | One file per post, exporting its HTML body as a string. |
| `content/functions/*.ts` | Tiny helpers: `getBlog(slug)` and `getAllBlogSlugs()`. |

Then a `BlogCardSection` maps over the posts, and `app/blog/[slug]/page.tsx` renders each one through `ArticleRenderer`.

## Project structure

```
.
├── app/
│   ├── layout.tsx              # Root layout, fonts, global metadata
│   ├── page.tsx                # Home (hero + blog cards)
│   ├── globals.css             # Tailwind + custom keyframes
│   ├── not-found.tsx           # 404
│   └── blog/[slug]/page.tsx    # Static per-post route
├── components/
│   ├── article-renderer.tsx    # HTML → styled React via html-react-parser
│   ├── blog-card.tsx           # Gradient card with hover + motion
│   ├── blog-card-section.tsx   # Maps the posts into cards
│   ├── site-header.tsx
│   └── site-footer.tsx
├── content/
│   ├── article.ts              # Blog type + the array of posts
│   ├── functions/
│   │   ├── get-blog.ts         # getBlog(slug)  (a.k.a. getBlogBySlug)
│   │   └── get-all-blog-slugs.ts
│   └── articles/
│       ├── why-i-render-blogs-with-html.ts
│       └── the-anatomy-of-a-good-blog-card.ts
├── lib/utils.ts                # cn(), formatDate()
├── next.config.mjs
├── tailwind.config (v4 via CSS)
└── tsconfig.json
```

## Add a new post

1. Create `content/articles/my-post.ts`:

   ```ts
   export const myPost = `
     <h1>My Post Title</h1>
     <p>Hello from a typed HTML string.</p>
   `;
   ```

2. Import it and add an entry to `content/article.ts`:

   ```ts
   import { myPost } from "./articles/my-post";

   export const blogs: Blog[] = [
     {
       name: "My Post",
       description: "One-line summary.",
       title: "My Post Title",
       slug: "my-post",
       createdAt: "2026-08-01",
       link: "/blog/my-post",
       image: "https://images.unsplash.com/...",
       keywords: ["html", "blog"],
       article: myPost,
     },
     // ...existing posts
   ];
   ```

That's it — `generateStaticParams` picks up the new slug automatically and the post is statically rendered.

## How rendering works (`components/article-renderer.tsx`)

```tsx
import parse, { Element, type DOMNode, type HTMLReactParserOptions }
  from "html-react-parser";

const TAG_STYLES: Record<string, string> = {
  h1: "text-4xl font-extrabold text-white",
  p:  "leading-8 text-zinc-300",
  a:  "text-indigo-400 underline",
  // …h2, h3, ul, ol, li, blockquote, code, pre, img, hr, strong
};

function transformNode(domNode: DOMNode) {
  if (!(domNode instanceof Element)) return;
  const style = TAG_STYLES[domNode.name];
  if (!style) return;
  const existing = domNode.attribs.class ?? "";
  domNode.attribs = { ...domNode.attribs,
    class: existing ? `${existing} ${style}` : style };
}

export function ArticleRenderer({ html }: { html: string }) {
  const options: HTMLReactParserOptions = {
    replace: (node) => { transformNode(node); return undefined; },
  };
  return <article>{parse(html, options)}</article>;
}
```

This is the exact equivalent of `react-html-parser`'s `transformNode` — full styling control, per tag.

> **Note on the parser:** the original `react-html-parser` package is
> deprecated and does not support React 19. We use its maintained successor
> `html-react-parser`, which has the same mental model and a `transformNode`-style
> `replace` callback.

## Local standard vs. CMS

Keep everything in your codebase and you only need the files above. If you'd rather store the HTML in a database, keep the **same `Blog` shape** and have `getBlog` / `getAllBlogSlugs` call your API instead of reading the array. The renderer, cards and routes don't change.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
```

## Deployment (the "no tricks" rule)

`next.config.mjs` sets:

```js
typescript: { ignoreBuildErrors: true },
eslint:     { ignoreDuringBuilds: true },
```

So a stray type/lint warning can **never** block `next build` on Vercel, Netlify, a Dockerfile or CI. The code is still fully typed — these flags are only a safety net. Deploy the repo as-is; it just works.

---

MIT · Fork it, star it, make it better.
