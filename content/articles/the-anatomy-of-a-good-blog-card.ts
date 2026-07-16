/**
 * Article body for "the-anatomy-of-a-good-blog-card".
 * Plain, typed HTML — styled later by `ArticleRenderer`.
 */
export const theAnatomyOfAGoodBlogCard = `
<h1>The Anatomy of a Good Blog Card</h1>

<p>A blog card is the first thing a reader touches. It has about 200 milliseconds to feel <em>premium</em>. Here is how the card on this site is put together, and the small details that make it land.</p>

<img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80" alt="A clean, minimal desk setup that mirrors the calm of a good UI" />

<h2>Layout: image, then text</h2>

<p>The structure is deliberately boring because boring is readable:</p>

<ol>
  <li>A 16:9 cover image that bleeds to the edges.</li>
  <li>A date, set small and uppercase, in an accent colour.</li>
  <li>The title, bold and tight.</li>
  <li>A three-line clamped description.</li>
  <li>A quiet &ldquo;Read article &rarr;&rdquo; affordance.</li>
</ol>

<h2>The gradient border trick</h2>

<p>Instead of a hard border, the card uses a 1px gradient wrapper. At rest it is nearly invisible; on hover it lights up from indigo to fuchsia:</p>

<pre><code>&lt;Link className="rounded-2xl bg-gradient-to-br
  from-white/10 to-white/0 p-px
  transition hover:from-indigo-400/40
  hover:to-fuchsia-400/30"&gt;
  &lt;article className="rounded-2xl bg-zinc-950"&gt;
    {/* card content */}
  &lt;/article&gt;
&lt;/Link&gt;</code></pre>

<p>That single wrapper gives you a glowing border for the price of one utility class.</p>

<h2>Motion that respects the user</h2>

<p>The cards fade up on load with a tiny stagger. The stagger is just an inline <code>animationDelay</code> computed from the index:</p>

<pre><code>style={{ animationDelay: \`\${index * 90}ms\` }}
className="animate-fade-up"</code></pre>

<p>Critically, the animation is disabled under <code>prefers-reduced-motion</code>. A premium feel should never cost accessibility.</p>

<blockquote>
  Details are not the details. They make the design.
</blockquote>

<h2>Why plain HTML wins here too</h2>

<p>None of this required a CMS or a Markdown processor. The card is a typed React component, the data is a typed object, and the article you are reading right now is a typed HTML string. The same discipline that makes the card feel good makes the whole blog easy to maintain.</p>

<h3>Quick checklist</h3>

<ul>
  <li>Image with a gradient scrim for text legibility.</li>
  <li>One accent colour, used sparingly.</li>
  <li>Line-clamped description so heights stay even.</li>
  <li>Hover state that <em>earns</em> attention, not screams for it.</li>
  <li>Reduced-motion fallback.</li>
</ul>

<p>Build it once, drop it in <code>BlogCardSection</code>, and let the grid do the rest.</p>
`;
