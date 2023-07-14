# Client-Side Rendering

This is the standard React app rendering method. In a standard React app, the
browser fetches an empty HTML shell and JavaScript for rendering and wiring up
the UI. To opt into client-side rendering (for either a page or a component),
use React's `useEffect()` hook or [useSWR](https://swr.vercel.app/).

Next.js pre-rendering is generally preferable to client-side rendering for
performance (to give the user a fully-constructed HTML page).
