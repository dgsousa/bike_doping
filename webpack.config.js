module.exports = {
	context: __dirname + "/app",
	entry: "./app.js",
	output: {
		path: 'public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
					{
						test: /\.js$/,
						exclude: /mnode_modules/,
						loader: "babel-loader"
					}
		]
	}
}