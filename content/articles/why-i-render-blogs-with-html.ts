/**
 * Article body for "why-i-render-blogs-with-html".
 *
 * This is plain, typed HTML. No MDX, no Markdown, no content layer — just a
 * string you control completely. The styling is applied later by
 * `ArticleRenderer` via its `transformNode` function.
 */
export const whyIRenderBlogsWithHtml = `
<h1>Why I Render My Blogs with HTML (Not Markdown)</h1>

<p>I have a confession to make: I hate Markdown. Every time I see someone render their blog with Markdown, MDX or a headless CMS that spits out Markdown, something in me cringes. I can&rsquo;t give you a technical reason — I just don&rsquo;t like it. I prefer HTML.</p>

<p>Looking around the interwebs (and on X) there isn&rsquo;t really a clear, standard way of rendering blogs with HTML. So I made one for myself, and I want to share it with you.</p>

<h2>The mental model</h2>

<p>There are only three moving parts:</p>

<ul>
  <li><strong>article.ts</strong> &mdash; an array of blog objects (your metadata).</li>
  <li><strong>content/articles/*.ts</strong> &mdash; one file per post, exporting its HTML body as a string.</li>
  <li><strong>content/functions/*.ts</strong> &mdash; tiny helpers to fetch a post by slug and list all slugs.</li>
</ul>

<p>That&rsquo;s the whole standard. Let&rsquo;s look at each piece.</p>

<h2>1. The blog object</h2>

<p>Every post is described by a typed object. Name, description, title, slug, created date, link, cover image and SEO keywords — nothing surprising:</p>

<pre><code>export type Blog = {
  name: string;
  description: string;
  title: string;
  slug: string;
  createdAt: string;
  link: string;
  image: string;
  keywords: string[];
  article: string; // raw HTML
};</code></pre>

<p>Because <code>article</code> is just a string, you get full editor support, type safety and zero magic.</p>

<h2>2. Each article is its own file</h2>

<p>Instead of one giant file, every post lives in its own TypeScript module. You assign the HTML to a variable and export it:</p>

<pre><code>export const whyIRenderBlogsWithHtml = \`
  &lt;h1&gt;Why I Render My Blogs with HTML&lt;/h1&gt;
  &lt;p&gt;Markdown is fine &mdash; I just don&rsquo;t like it.&lt;/p&gt;
\`;</code></pre>

<p>Then you import that string into <code>article.ts</code> and drop it into the matching blog object. Simple, searchable, reviewable.</p>

<h2>3. Fetching by slug</h2>

<p>Two functions do all the heavy lifting. One returns a single post, the other returns every slug:</p>

<pre><code>export function getBlog(slug: string) {
  return blogs.find((b) =&gt; b.slug === slug);
}

export function getAllBlogSlugs() {
  return blogs.map((b) =&gt; b.slug);
}</code></pre>

<h2>Rendering it beautifully</h2>

<p>Here is the part I love. To render the HTML I pass it through <code>html-react-parser</code> and use its <code>transformNode</code> callback to inject Tailwind classes onto every tag:</p>

<pre><code>function transformNode(domNode) {
  if (domNode.name === "p") domNode.attribs.class = "leading-7 text-zinc-300";
  if (domNode.name === "a") domNode.attribs.class = "text-indigo-400 underline";
  if (domNode.name === "h1") domNode.attribs.class = "text-4xl font-bold text-white";
  // ...h2, h3, ul, ol, li, blockquote, code, pre, img
}</code></pre>

<p>That gives me <em>full</em> control over the styling of my article. H1 looks the way I want, links look the way I want, code blocks look the way I want — and it&rsquo;s all plain HTML underneath.</p>

<blockquote>
  I don&rsquo;t have to learn a dialect. I write the tags I&rsquo;ve known for twenty years and the renderer makes them pretty.
</blockquote>

<h2>Local standard vs. CMS</h2>

<p>If you want everything in your codebase, this standard is all you need. But if you&rsquo;d rather keep the HTML in a database — say you&rsquo;re building a full app — the same shape works perfectly behind an API. The <code>getBlog</code> / <code>getAllBlogSlugs</code> functions just call your endpoint instead of reading the array.</p>

<p>That&rsquo;s the whole thing. Fork it, star it, make it better. Am I a buffoon for wanting HTML blogs? Let me know.</p>

<hr />

<p><a href="https://github.com/Aryayama/html_blog">View the source on GitHub &rarr;</a></p>
`;
