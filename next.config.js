const WorkerPlugin = require('worker-plugin');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
	// future: {
	// 	webpack5: true,
	// },

	/* Use this option to simulate a different assets origin only in the production build: */
	assetPrefix: isProd ? 'http://127.0.0.1:3000' : '',

	/* Use this option to simulate a different assets origin in development and production: */
	// assetPrefix: 'http://127.0.0.1:3000',

	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.plugins.push(
				new WorkerPlugin({
					// Use `self` as the global object when receiving hot updates.
					globalObject: 'self',
				})
			);
		}
		return config;
	},
};

module.exports = nextConfig;
