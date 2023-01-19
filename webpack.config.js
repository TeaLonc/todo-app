const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: './src/scripts/main.js',
  	output: {
    	path: path.resolve(__dirname, 'dist'),
    	filename: 'scripts.js'
  	},
	mode: 'development',
	watch: true,
	devtool: false,
	optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
        ],
    }
};
