# ember-resolver
(Universal simply extendable ember resolver)

## Install

	$ npm install ember-resolver


## Usage with node, webpack and bower [Example](https://github.com/seeden/ember-resolver/tree/master/example)

### Folder structure:

	| - public/
	| --- app/
	| ------ templates/
	| --------- todos.hbs
	| ------ routers/
	| ---------- main.js
	| ------ index.js
	| --- dist/
	| --- lib/
	| - .bowerrc
	| - bower.json
	| - webpack.config.js
	| - package.json

### Configuration of webpack (webpack.config.js):

	module.exports = {
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
	};

### Configuration of bower:

Content of bower.json

	{
		"name": "MyProject",
		"version": "1.0",
		"dependencies": {
			"jquery": "~1.11.1",
			"ember": "~1.5.1"
		}
	}

Content of .bowerrc

	{
	  "directory": "public/lib",
	  "storage": {
			  "packages": ".bower-cache",
			  "registry": ".bower-registry"
	  },
	  "tmp": ".bower-tmp"
	}

### Configuration of nodejs (package.json):

	{
		"name": "MyProject",
		"version": "1.0.0",
		"engines": {
			"node": ">= 0.10.0"
		},
		"dependencies": {
			"bower": "~1.2.8",
			"webpack": "~1.1.10",
			"ember-templates-loader": "~0.2.1",
			"script-loader": "~0.5.2",
			"ember-resolver": "~1.0.1"
		}
	}

### Content of public application:

Content of index.js:

	require('script!jquery/dist/jquery');
	require('script!handlebars/handlebars');
	require('script!ember/ember');

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


Content of templates/todos.hbs:

	CONTENT OF TODOS :)	

This resolver is able to resolve modules with predefined ember folder structure like such:

	| - templates/
	| --- index.hbs
	| - routers/
	| --- main.js
	| - views/
	| --- myview.js