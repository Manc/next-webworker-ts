/**
 * Converts a timestamp to a string with date, time, including milliseconds.
 */
function processTimestamp(timestamp: number): string {
	// This comment should not end up in the build. [2]
	const date = new Date(timestamp);
	return `${date.toLocaleString()}.${date.getMilliseconds()}`;
}

export default processTimestamp;
