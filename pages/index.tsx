import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
	const [workerRequested, setWorkerRequested] = useState(false);
	const [workerReady, setWorkerReady] = useState(false);
	const [workerMessage, setWorkerMessage] = useState<string>();
	const workerRef = useRef<Worker>();

	useEffect(() => {
		if (workerRequested && !workerRef.current) {
			console.log('Initializing Web Worker...');
			try {
				const worker = new Worker('../workers/example.worker', { type: 'module' });
				worker.onmessage = ((event: MessageEvent<string>) => {
					setWorkerMessage(event.data);
				});
				workerRef.current = worker;
				setWorkerReady(true);
			} catch (err) {
				console.error(err);
				setWorkerMessage('Worker initialization failed. See console for details.');
			}
		}

		return () => {
			if (workerRef.current) {
				console.log('Terminating Web Worker...');
				workerRef.current.terminate();
				workerRef.current = undefined;
				setWorkerRequested(false);
				setWorkerReady(false);
				setWorkerMessage(undefined);
			}
		};
	}, [workerRequested]);

	return (
		<>
			<Head>
				<title>Next.js example with TypeScript and WebWorker</title>
			</Head>

			<div className={styles.main}>
				<h1 className={styles.title}>
					<a href="https://nextjs.org">Next.js</a> example
					with TypeScript and WebWorker
				</h1>

				<div className={styles.buttons}>
					<button
						className={styles.button}
						type="button"
						onClick={() => {
							setWorkerRequested(true);
						}}
						disabled={workerRequested}
					>
						Init Web Worker
					</button>

					<button
						className={styles.button}
						type="button"
						onClick={() => {
							const messageToWorker = Date.now();
							console.log('Sending message to worker:', messageToWorker);
							workerRef.current?.postMessage(messageToWorker);
						}}
						disabled={!workerReady}
					>
						Send Message
					</button>
				</div>

				<div className={styles.response}>
					{workerMessage || 'No message received yet.'}
				</div>
			</div>
		</>
	)
}
