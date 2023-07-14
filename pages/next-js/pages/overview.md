# Pages

Pages are React components exported from `.tsx` modules under the `pages`
directory. Page routing is achieved using directories and file-naming
conventions.

For example, the following page is accessible at `/hello`:

pages/hello.tsx

```typescript
export default function Hello() {
  return <h1>Hello!</h1>;
}
```

Dynamic routes are supported using filenames with brackets.

For example, the following will match routes such as /`users/1`, /`users/2`, etc.:

pages/users/[userId].tsx

```typescript
import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  const { userId } = router.query;
  return <p>User: {userId}</p>;
}
```

## Page rendering

We'll go into the various page rendering strategies in depth, because these have
implications for configuration on GCP.

By default, all pages are pre-rendered. Next.js performs **automatic static
optimization** when it determines that a page is static by the absence
of `getServerSideProps` and `getInitialProps` in the page.

Static optimization involves setting `Cache-Control` headers. When running locally, however, these headers are overwritten to prevent caching locally.

Being static does not mean a page is not interactive.

Check these [Next.js docs](https://nextjs.org/docs/going-to-production) before going to production.

A significant benefit of pre-rendered pages is that they can be statically served by a content distribution network (CDN).

Using pre-rendered pages is how the HSA will demonstrate the benefits of Cloud CDN.

A page can opt out of pre-rendering by exporting a function called `getInitialProps` (discussed later).

Next.js supports the following:

- Pre-rendering (default)
  - Static generation
    - Also called Static Site Generation (SSG)
    - Next.js includes a variant called Incremental Static Regeneration (ISR)
  - Server-Side Rendering (SSR)
- Client-Side Rendering (CSR)
- Static HTML export

A next.js app can have pages rendered using a different method from other pages; the rendering method is chosen at the page level, as described next.

An app that only uses CSR is called a single page application (SPA).

**Static HTML Export**

In addition to all the rendering methods supported on a per-page basis, Next.js is able to [export an entire app to static HTML](https://nextjs.org/docs/advanced-features/static-html-export) ("[Jamstack](https://jamstack.org/)"). Because an exported site can be served statically without a Node.js server, there are a number of Next.js features (include build-time features) that are [not supported](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features).
