# Server-Side Rendering (SSR)

With server-side rendering, HTML pages are generated per HTTP request.
Server-side rendering is used when a page exports an async function
called `getServerSideProps`.

```typescript
import { Database } from "../../lib/database";

// Next.js will call this function for every request
export async function getServerSideProps() {
  const db = new Database();
  const data = await db.getData();

  // passed to the page component as props
  return {
    props: { data },
  };
}

export default function Page(props) {
  // Render...
}
```

Use `getServerSideProps` when:

- The page must be rendered server-side using data that must be fetched for each
  request

If the page does not need to be rendered server-side,
consider [fetching data on the client side](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#fetching-data-on-the-client-side).

Errors during SSR rendering return HTTP 500 errors.
See [Customizing the 500 Page](https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-500-page).

SSR pages can also be cached, but only
if [cache-control headers](https://nextjs.org/docs/going-to-production#caching)
are [explicitly configured](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr).
