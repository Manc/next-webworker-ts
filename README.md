# Next.js example with TypeScript and Web Worker

This is an experimental example project with the aim to figure out how to properly use (dedicated) [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) written in TypeScript in a [Next.js](https://nextjs.org/) project. I could not find one comprehensive solution on the internet that covers all my requirements (listed below). Hopefully this repository encourages others to contribute so we end up with a good solution that everybody can apply to their own projects.


## Requirements

1. ✅ Code must use **TypeScript** for the Next.js app and Web Worker scripts.
2. ❌ Project must be compatible with the **latest version of Next.js**.
3. ❌ Web Worker scripts must be **minified** in the production build.
4. ❌ Initialization of the Web Worker script must be **cross-origin** proof; i.e. the worker script must not be fetched from an origin other than the page’s own origin if the Next app is configured to use an `assetPrefix` with a different host (usually for hosting static assets on a CDN).
	- Avoid iframe hacks.
	- Maybe make an exception and serve the main worker script from the page’s own domain.
	- Maybe inline the main worker script, but avoid inlining potential large dependencies.

> This is work in progress – currently not all requirements are met. Please help find a solution.


## Repository branches

As there may be different approaches to solve the problem, a number of Git branches may be created over time to experiment with, so don’t forget to not only check the `main` branch.

Currently the `main` branch roughly follows the official [with-web-worker](https://github.com/vercel/next.js/tree/canary/examples/with-web-worker) example. It relies on the WebPack plugin [worker-plugin](https://github.com/GoogleChromeLabs/worker-plugin).


## Setup

```sh
yarn            # Install dependencies
yarn run dev    # Run in development mode
yarn run build  # Build for production
yarn run start  # Start the production server
```


## How to use the demo app

- This sample app only has one page (`pages/index.tsx`), the index page (open http://localhost:3000/ after starting in dev mode).
- Open the browser console to see a bit more what is going on.
- A click on the “Init Web Worker” button should load and initialize the WebWorker script.
- A click on the “Send Message” button should do the following:
	- It sends the current timestamp as number to the worker script.
	- The worker script “processes” the number by creating a human readable string.
	- The worker sends that string as message back to the main script.
	- The main script should receive that message and set the value to the page component’s state in order to present it on the page.


## Verify success

- First step is to make the app work in development mode.
- Then, generate a production build (`yarn run build`).
- Start the Next.js server in production mode (`yarn run start`).
	- Keep an eye on the Network tab of your browser’s developer tools. When you click the “Init Web Worker” button on the project’s [home page](http://localhost:3000/), you should see the worker script being fetched form the server. Check the source code of the file to see if it is minified like the other `.js` files or full of comments.
- To verify requirement number 4 (no cross-site loading of the worker script):
	- The `next.config.js` has the option `assetPrefix` set to `http://127.0.0.1:3000` for the production build, i.e. if you access the page from `localhost:3000` (not `127.0.0.1:3000`!), the assets will be fetched from `127.0.0.1:3000`. Although this points effectively to the same machine, from a browser’s perspective both are different origins. This is a simple way to simulate hosting assets from a different domain like a CDN.
	- So, load the page from http://localhost:3000/ and click the “Init Web Worker” button.
	- If the worker fails to load due to the cross-site restriction, condition 4 is not met.
