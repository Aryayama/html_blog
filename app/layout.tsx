import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://html-blog.rm.xyz"),
  title: {
    default: "HTML Blog — render your blog with plain HTML",
    template: "%s · HTML Blog",
  },
  description:
    "An HTML-first blog standard built with Next.js, TypeScript and Tailwind CSS. No Markdown, no MDX — just typed HTML and full styling control.",
  keywords: [
    "html blog",
    "nextjs blog",
    "typescript blog",
    "tailwindcss",
    "no markdown",
  ],
  openGraph: {
    type: "website",
    siteName: "HTML Blog",
    title: "HTML Blog — render your blog with plain HTML",
    description:
      "An HTML-first blog standard built with Next.js, TypeScript and Tailwind CSS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Blog",
    description:
      "An HTML-first blog standard built with Next.js, TypeScript and Tailwind CSS.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
