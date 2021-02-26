const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
	/* Use this option to simulate a different assets origin only in the production build: */
	assetPrefix: isProd ? 'http://127.0.0.1:3000' : '',

	/* Use this option to simulate a different assets origin in development and production: */
	// assetPrefix: 'http://127.0.0.1:3000',

	webpack: (config, { isServer, defaultLoaders }) => {
		config.module.rules.unshift({
			test: /\.worker\.ts$/,
			use: [
				{
					loader: 'worker-loader',
					options: {
						filename: 'static/[hash].xxx.worker.js',
						publicPath: '/_next/', // Does not seem to work; https://github.com/webpack-contrib/worker-loader/issues/281
						inline: 'no-fallback', // Still provides a fallback. It's what we want more or less, but it seems odd?!
					},
				},
				// defaultLoaders.babel,
			],
		});

		// config.output.globalObject = 'self';
		
		return config;
	},
};

module.exports = nextConfig;
