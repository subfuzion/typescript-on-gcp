# Authorization

## Securing Pages

Pages can be secured client side or server side depending on rendering method.

### **Client Side**

While NextAuth.js can secure pages individually, the recommended way to secure pages uses the middleware pattern, as shown below:

src/middleware.ts

```typescript
export { default } from "next-auth/middleware";
```

With this alone, the entire app is secured. To only secure a subset of pages, export a `config` object with a `matcher`:

```typescript
export { default } from "next-auth/middleware";
export const config = { matcher: ["/main"] };
```

[https://nextjs.org/docs/advanced-features/middleware#matcher](https://nextjs.org/docs/advanced-features/middleware#matcher)

`matcher` supports various path matching patterns as well as regular expressions. See [Matcher](https://nextjs.org/docs/advanced-features/middleware#matcher) for details.

The middleware pattern is implemented by the `withAuth` middleware. Currently this only supports the `jwt` session strategy. To secure client-side pages individually to work with other session strategies, such as using a custom Firestore database adapter, use the `getSession` React Hook (see [docs](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#client-side)).

### **Server Side**

When using SSR (pages that use `getServerSideProps`), every page to be secured needs to look like this:

```typescript
src / pages / server - side - rendered - example.tsx;
import { Database } from "../../lib/database";

import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

// Next.js will call this function for every request
export async function getServerSideProps() {
  const db = new Database();
  const data = await db.getData();

  // passed to the page component as props
  return {
    props: {
      data,
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}

export default function Page(props) {
  const { data: session } = useSession();

  if (typeof window === "undefined") return null;

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>Access Granted</p>
      </>
    );
  }
  return <p>Access Denied</p>;
}
```

## Securing API routes

API routes (under `src/pages/api/`) are secured using `getServerSession`, as shown here:

```typescript
src / pages / api / api - example.ts;
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // Authorized (signed in)
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    // Not authorized
    res.status(401);
  }
  res.end();
};
```
