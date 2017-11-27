const path = require('path');


const webpackConfig = {
	context: __dirname,
	entry: ['./www-js/index.js'],
	output: {
		path: path.join(__dirname, 'www'),
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['.js', '.json']
	},

	stats: {
		colors:true,
		reasons:true,
		chunks:true
	},

	devtool: 'cheap-eval-source-map',

	module: {
		rules: [
			{
				test:/\.js?$/,
				loader: 'eslint-loader',
				exclude: '/node_modules'
			}
		]
	}

}






module.exports = webpackConfig;