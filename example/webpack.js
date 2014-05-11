var webpack = require("webpack");

webpack({
	entry:  './public/app',
	output: {
		path: './public/dist/',
		filename: 'app.js'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'public/lib']
	},
	module: {
		loaders: [{
			test: /\.hbs$/,
			loader: 'ember-templates-loader'
		}]
	},
	externals: {
		Ember: 'Ember',
		jQuery: 'jQuery',
	}
}, function(err, stats) {
	if(err) {
		throw err;
	}

	console.log(stats.toString({
		colors: true
	}));
});

