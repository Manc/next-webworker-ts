/*
 * This is a simple static Web Worker written in plain JavaScript.
 * To use it in the Next.js, use this line in `pages/index.tsx`:
 * 
 * ```
 * const worker = new Worker('/static.worker.js');
 * ```
 */

self.addEventListener('message', (event) => {
	const timestamp = event.data;
	console.log('Worker received message:', timestamp);
	const date = new Date(timestamp);
	const messageToMain = `${date.toLocaleString()}.${date.getMilliseconds()}`;
	self.postMessage(messageToMain);
});
