const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, './public/index'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'app.bundle.js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loaders: ['ts-loader']
			}
		]
	}
}