import '@/styles/globals.css'

// The initial page load is server side generated, not just an empty div (like in React, which waits for the JS rendered elements), which is good for SEO!.

// This app component is next.js way of initialising pages. The returned 'component' is whatever the CURRENT page is.
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
