import parse, {
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";

/**
 * The heart of the "HTML blog" standard.
 *
 * Every article is authored as a plain HTML string (typed, importable
 * TypeScript). To render it we run it through `html-react-parser` and, for each
 * DOM node, inject Tailwind classes via `transformNode` (the `replace`
 * callback below). That gives us 100% control over how every `<h1>`, `<p>`,
 * `<a>`, `<code>`, `<blockquote>`, … looks — without a single line of Markdown.
 *
 * Note: we use `html-react-parser` (the actively maintained successor to the
 * now-deprecated `react-html-parser`), because the original package does not
 * support React 19. The API and the mental model are the same.
 */

const TAG_STYLES: Record<string, string> = {
  h1: "mt-2 mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl",
  h2: "mt-12 mb-4 text-3xl font-bold tracking-tight text-white",
  h3: "mt-9 mb-3 text-2xl font-semibold tracking-tight text-white",
  h4: "mt-8 mb-3 text-xl font-semibold tracking-tight text-white",
  p: "mb-5 text-[1.05rem] leading-8 text-zinc-300",
  a: "font-medium text-indigo-400 underline decoration-indigo-400/40 underline-offset-2 transition hover:text-indigo-300",
  ul: "mb-6 list-disc space-y-2 pl-6 text-zinc-300 marker:text-indigo-500/70",
  ol: "mb-6 list-decimal space-y-2 pl-6 text-zinc-300 marker:text-indigo-500/70",
  li: "leading-8 [&>p]:mb-0",
  blockquote:
    "my-7 border-l-4 border-indigo-500/60 bg-indigo-500/5 py-2 pl-5 italic text-zinc-300",
  code: "rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[0.85em] text-pink-300",
  pre: "my-7 overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/80 p-4 shadow-lg shadow-black/30",
  img: "my-8 w-full rounded-xl border border-white/10",
  hr: "my-10 border-white/10",
  strong: "font-semibold text-white",
  em: "italic text-zinc-200",
  table: "my-7 w-full border-collapse overflow-hidden rounded-lg text-sm",
  th: "border border-white/10 bg-white/5 px-3 py-2 text-left font-semibold text-white",
  td: "border border-white/10 px-3 py-2 text-zinc-300",
};

/** The styling function — equivalent to react-html-parser's `transformNode`. */
function transformNode(domNode: DOMNode): void {
  if (!(domNode instanceof Element)) return;

  // Inline <code> gets a pill style; <code> inside <pre> is handled by `pre`.
  if (
    domNode.name === "code" &&
    domNode.parent instanceof Element &&
    domNode.parent.name === "pre"
  ) {
    return;
  }

  const style = TAG_STYLES[domNode.name];
  if (!style) return;

  const existing = domNode.attribs.class ?? "";
  domNode.attribs = {
    ...domNode.attribs,
    class: existing ? `${existing} ${style}` : style,
  };
}

export function ArticleRenderer({ html }: { html: string }) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      transformNode(domNode);
      return undefined;
    },
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-14">
      <article className="article-content">{parse(html, options)}</article>
    </div>
  );
}
