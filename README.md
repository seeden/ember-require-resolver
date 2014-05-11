# ember-resolver
(Universal simply extendable ember resolver)

## Install

    $ npm install ember-resolver


## Usage with webpack

Configuration of webpack:
	{
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
    }

Folder structure (public/app):

	| - templates/
	| --- todos.hbr
	| - routers/
	| --- main.js
	| - app.js


Content of app.js:

	var Resolver = require('ember-resolver');

	var resolver = new Resolver({
		require: function(type, fullName, path) {
			try {
				//you can use your own structure for code on this place
				return require('./'+ path);	
			} catch(err) {
				//module not exists
				return null;
			}
		}
	});

	var app = Ember.Application.create({
		Resolver: resolver.ember
	});


Content of routers/main.js:

	var Ember = require('Ember');

	var Router = Ember.Router.extend({});

	Router.map(function() {
		this.resource('todos', { path: '/' });
	});

	module.exports = Router;


Content of templates/todos.hbr:

	CONTENT OF TODOS :)	

This resolver is able to resolve modules with predefined ember folder structure like such:

	| - templates/
	| --- index.hbr
	| - routers/
	| --- main.js
	| - views/
	| --- myview.js