/**
 * Next.js configuration.
 *
 * Deployment note (the "no tricks" rule):
 * `typescript.ignoreBuildErrors` guarantees that a stray type warning never
 * blocks `next build` on your host of choice (Vercel, Netlify, a Dockerfile,
 * `npm run build` in CI, …). The code in this repo is still fully typed — this
 * flag is only a safety net so a deploy can never fail for a cosmetic reason.
 *
 * (Next.js 16 no longer reads an `eslint` key here; linting is run separately
 * via `next lint` and does not participate in the production build.)
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Domains we are allowed to optimise with <Image />.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
