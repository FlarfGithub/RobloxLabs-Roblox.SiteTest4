const path = require('path');

module.exports = {
	entry: './Roblox/ProdJS/webpack.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'webpack.js',
		path: path.resolve(__dirname, 'StaticPages/Roblox.JS'),
	},
};
