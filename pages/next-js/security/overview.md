# Security

There are two parts to security:

- Authentication
- Authorization

The [NextAuth.js](https://next-auth.js.org/) open source solution integrates
with Next.js to handle both.

NextAuth.js provides [OAuth](https://www.rfc-editor.org/rfc/rfc6749) support to
use the [Google Identity](https://developers.google.com/identity) provider to
authenticate end users during sign in.

NextAuth.js handles creating a JSON Web Token ([JWT](https://jwt.io/)) for the
[session strategy](https://next-auth.js.org/configuration/options#session),
which is used for authorizing access to Next.js routes for pages and APIs during
the user's session.

Additionally, there are two aspects to authorization to cover:

- Securing pages
- Securing APIs
