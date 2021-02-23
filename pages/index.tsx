import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
	const [activated, setActivated] = useState(false);
	const [workerMessage, setWorkerMessage] = useState<string>();

	useEffect(() => {
		if (activated) {
			console.log('Init Web Worker...');
		}
	}, [activated]);

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
							setActivated(true);
						}}
						disabled={activated}
					>
						Init Web Worker
					</button>

					<button
						className={styles.button}
						type="button"
						onClick={() => {
							console.log('TODO: Send Message');
						}}
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
