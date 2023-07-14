# Authentication

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

## Google Identity authentication provider

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
