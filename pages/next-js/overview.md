# Overview

The purpose of the Next.js framework **is to render pages using one or more rendering methods** from a Node.js app that conforms to a specific structure and set of conventions.

## Pages

Pages are React components exported from `.tsx` modules under the `pages` directory. Page routing is achieved using directories and file-naming conventions.

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

By default, all pages are pre-rendered. Next.js performs **automatic static optimization** when it determines that a page is static by the absence of `getServerSideProps` and `getInitialProps` in the page.

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

### Static Generation

Also known as Static Site Generation (SSG), this method creates pages at build-time instead of runtime. To pass data to pre-render the page at build-time, the page must export a function called `getStaticProps`.

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

Using `getStaticProps` will result in rendering static `HTML` and `JSON` files that are cacheable on a CDN.

Use `getStaticProps` when:

- All the data needed for page rendering is availabe at build-time (even if the data is fetched over the network)
- The data is cacheable
- The page must be pre-rendered for SEO
- The page must load fast

Assuming these requirements can be met, static generation at build-time is the generally recommended method of pre-rendering for runtime performance because pages are automatically cacheable by a CDN.

Because `getStaticProps` runs on the server and is never bundled for the client, it can be used to run any other code that runs on the server. For example, it can query a database using the same `/lib/database.ts` adapter code that might also be getting used by app APIs (`pages/api/*.ts`) to serve requests at runtime.

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

In other words, because the page is rendered at build-time with static data, it doesn't need to use fetch to make a dynamic GET request to a backend (hosted) app API.

Technically, Next.js generates both an HTML and a JSON file per page. The JSON file contains the build-time pre-computed data resulting from running `getStaticProps`.

`getStaticProps` is executed on every request in development mode (npm run dev).

#### **Incremental Static Regeneration (ISR).**

Next.js also supports updating static pages on a per-page basis _after_ build-time using a method called Incremental Static Generation. To use ISR, a `revalidate` property needs be added to `getStaticProps`, as shown below.

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

There are more details regarding pre-rendering paths at build-time and server-rendering at runtime (on-demand) if a path doesn't exist using `getStaticPaths`. See the Next.js [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) docs.

### Server-Side Rendering (SSR)

With server-side rendering, HTML pages are generated per HTTP request. Server-side rendering is used when a page exports an async function called `getServerSideProps`.

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

- The page must be rendered server-side using data that must be fetched for each request

If the page does not need to be rendered server-side, consider [fetching data on the client side](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#fetching-data-on-the-client-side).

Errors during SSR rendering return HTTP 500 errors. See [Customizing the 500 Page](https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-500-page).

SSR pages can also be cached, but only if [cache-control headers](https://nextjs.org/docs/going-to-production#caching) are [explicitly configured](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr).

### Client-Side Rendering

This is the standard React app rendering method. In a standard React app, the browser fetches an empty HTML shell and JavaScript for rendering and wiring up the UI. To opt into client-side rendering (for either a page or a component), use React's `useEffect()` hook or [useSWR](https://swr.vercel.app/).

Next.js pre-rendering is generally preferable to client-side rendering for performance (to give the user a fully-constructed HTML page).

## APIs

API routing is achieved using the same directory and file-naming conventions used by page routing. The directory location for an API is under `pages/api` and the hosted API is available at `/api`.

TODO: Show example

# Testing

**Unit testing**

- [Jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest) (as suggested in [Next.js testing doc](https://nextjs.org/docs/testing))
  - Every [component](https://docs.google.com/document/d/1lYwAQwtL6u9jWeJunvqDx1JaMvgq384srQryE_g1cio/edit?resourcekey=0-6MRuAvKCh0JOtfWsbAoLPA#bookmark=id.tkxe0xiiokvy) (includes [containers](https://docs.google.com/document/d/1lYwAQwtL6u9jWeJunvqDx1JaMvgq384srQryE_g1cio/edit?resourcekey=0-6MRuAvKCh0JOtfWsbAoLPA#bookmark=id.h6atpco1ggp7)) listed should have a single unit test that, at minimum, covers the more obvious edge cases and tests the main action of the component
  - External libraries/functions should be stubbed/mocked

**E2E Integration testing**

- [Playwright](https://playwright.dev/) (as suggested by [Next.js testing doc](https://nextjs.org/docs/testing))
  - 3 main user flows to verify:
    - As an unauthenticated user, I should only be able to access the login page and click on the login button, which redirects me to the correct route to complete authentication.
    - As a brand-new authenticated user, I should be able to access the main game view and complete one game session.
    - As a returning authenticated user, I should be able to open up the `/completed-sessions` page and see my past session results.

```text
npm test
npm run test:watch

# or
yarn test
yarn test:watch

# or
pnpm test
pnpm test:watch
```

[ts-jest](https://kulshekhar.github.io/ts-jest/) is installed as a dev dependency to support writing tests in TypeScript. The jest configuration (`jest.config.js`) sets `preset: "ts-jest"` to enable this.

Initial test example is located at `src/lib/__test__/database.test.ts`.

Jest tests should be created for:

- database: `src/lib/__test__/database.test.ts`
- APIs: `src/pages/api/__test__/api.test.ts`
- models: `src/models/__test__/models.test.ts`

# Security

There are two parts to security: **authentication** and **authorization**.

The app uses the [NextAuth.js](https://next-auth.js.org/) open source solution integration with Next.js to handle both. NextAuth.js provides [OAuth](https://www.rfc-editor.org/rfc/rfc6749) support to use the [Google Identity](https://developers.google.com/identity) provider to authenticate end users during sign in. NextAuth.js handles creating a JSON Web Token ([JWT](https://jwt.io/)) for the [session strategy](https://next-auth.js.org/configuration/options#session), which is used for authorizing access to Next.js routes for pages and APIs during the user's session.

## Authentication

The Google ID authentication provider is configured in `src/pages/auth/[...nextauth].ts`.

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import assert from "node:assert";

assert(process.env.GOOGLE_CLIENT_ID);
assert(process.env.GOOGLE_CLIENT_SECRET);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
```

The environment variable values for the credentials are obtained and configured as described in the

NextAuth.js automatically creates very simple pages to handle sign in, sign out, error messages, etc., based the provider. Custom pages can be substituted by setting the `pages` option:

```typescript
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
};
```

When using this configuration, ensure that these pages actually exist. For example: `'auth/signin'` refers to a page file at `pages/auth/signin.tsx`.

See [here](https://next-auth.js.org/configuration/pages) for more details on query parameters, error codes, and theming custom auth pages.

### Google Identity authentication provider

The following screenshots describe the steps for setting up Google Identity app credentials for development and testing.

1. Navigate to the **Credentials** console page for the project:

2. **Create credentials** for **OAuth client ID**:

3. Choose **Application type**: **Web application** and personalize the name.

4. Set **Authorized JavaScript origins** and **Authorized redirect URIs**.

**Authorized JavaScript origins**

http://localhost:3000

**Authorized redirect URIs**

http://localhost:3000/api/auth/callback/google

5. Copy **Client ID** and **Client Secret** to paste into `.env.local` (see step #6).

6. Paste **Client ID** and **Client Secret** into a **.env.local** file at the top level of the repo for the following variables. This file is ignored by git (.gitignore) and not stored in version control, so you'll need to create it.

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Authorization

### Securing Pages

Pages can be secured client side or server side depending on rendering method.

#### **Client Side**

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

#### **Server Side**

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

### Securing API routes

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
