declare const self: DedicatedWorkerGlobalScope;

import processTimestamp from './process-timestamp';

self.addEventListener('message', (event: MessageEvent<number>) => {
	const timestamp = event.data;
	console.log('Worker received message:', timestamp);
	const messageToMain = '[Example Worker] ' + processTimestamp(timestamp);
	self.postMessage(messageToMain);
});

//This comment should not end up in the build. [1]

console.log('Script example.worker has been executed.');
