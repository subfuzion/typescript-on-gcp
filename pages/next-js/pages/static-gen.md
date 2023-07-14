## Static Generation

Also known as Static Site Generation (SSG), this method creates pages at
build-time instead of runtime. To pass data to pre-render the page at
build-time, the page must export a function called `getStaticProps`.

```typescript
// Next.js will call this function at build-time
export async function getStaticProps(context: any) {
  // passed to the page component as props
  return {
    props: {},
  };
}

export default function Page(props: any) {
  // Render...
}
```

Using `getStaticProps` will result in rendering static `HTML` and `JSON` files
that are cacheable on a CDN.

Use `getStaticProps` when:

- All the data needed for page rendering is availabe at build-time (even if the
  data is fetched over the network)
- The data is cacheable
- The page must be pre-rendered for SEO
- The page must load fast

Assuming these requirements can be met, static generation at build-time is the
generally recommended method of pre-rendering for runtime performance because
pages are automatically cacheable by a CDN.

Because `getStaticProps` runs on the server and is never bundled for the client,
it can be used to run any other code that runs on the server. For example, it
can query a database using the same `/lib/database.ts` adapter code that might
also be getting used by app APIs (`pages/api/*.ts`) to serve requests at
runtime.

```typescript
import { Database } from "../../lib/database";

// Next.js will call this function at build-time
export async function getStaticProps(context: any) {
  const db = new Database();
  const mazeResources = await db.getMazeResources();
  return {
    props: { mazeResources },
  };
}

export default function Page({ mazeResources }) {}
```

In other words, because the page is rendered at build-time with static data, it
doesn't need to use fetch to make a dynamic GET request to a backend (hosted)
app API.

Technically, Next.js generates both an HTML and a JSON file per page. The JSON
file contains the build-time pre-computed data resulting from
running `getStaticProps`.

`getStaticProps` is executed on every request in development mode (npm run dev).

#### **Incremental Static Regeneration (ISR).**

Next.js also supports updating static pages on a per-page basis _after_
build-time using a method called Incremental Static Generation. To use ISR,
a `revalidate` property needs be added to `getStaticProps`, as shown below.

```typescript
// Next.js will call this function at build-time
export async function getStaticProps(context) {
  return {
    props: {}, // passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
```

There are more details regarding pre-rendering paths at build-time and
server-rendering at runtime (on-demand) if a path doesn't exist
using `getStaticPaths`. See the
Next.js [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
docs.
