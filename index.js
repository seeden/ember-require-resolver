define(['ember'], function(Ember) {
	/**
	 * Resolver class
	 * @param {Object} options Additional parameters for resolver
	 */
	function Resolver(options) {
		this.options = options || {};

		if(!options.require) {
			throw new Error('Require is undefined');
		}

		this.require = options.require;

		this.defaultExt = options.defaultExt || '';
		this.exts = options.exts || {
			template: '.hbs'
		};

		this._prepareEmberResolver();
	}

	/**
	 * Prepare Ember resolver from defaultResolver
	 */
	Resolver.prototype._prepareEmberResolver = function () {
		var self = this;

		var resolve = function(parsedName) {
			var resolved = this._super(parsedName);

			if (resolved) { 
				return resolved; 
			}

			var module = self._resolve(parsedName);
			if(module !== null) {
				if (parsedName.root && parsedName.root.LOG_MODULE_RESOLVER) {
	      			Ember.Logger.info('hit', parsedName.fullName);
	    		}
				return module
			}

			if (parsedName.root && parsedName.root.LOG_MODULE_RESOLVER) {
	        	Ember.Logger.info('miss', parsedName.fullName);
	      	}
	      	
			return resolved;
		};

		this.ember = Ember.DefaultResolver.extend({
	    	resolveOther: resolve,
	    	resolveTemplate: resolve,
			resolveModel: resolve
		});
	};

	/**
	 * Resolve module
	 * @param  {Object} parsedName Ember structure for resolving of modules
	 * @return {Object|null}            Ember module
	 */
	Resolver.prototype._resolve = function(parsedName) {
		//if there no exists resolver
		var type = parsedName.type;
		var fullName = parsedName.fullNameWithoutType;
		var path = this._preparePath(type, fullName);

		return this.require(type, fullName, path);
	};

	/**
	 * Prepare basic path for resolve of module
	 * @param  {String} type     Type of Ember module (template, router, view)
	 * @param  {String} fullName Fullname of Ember module (main)
	 * @return {String}          Path for require module (templates/todos)
	 */
	Resolver.prototype._preparePath = function(type, fullName) {
		fullName = fullName.replace(/\./g, '/').toLowerCase();
		var path = type + 's/' + fullName + this._getExt(type);

		return path;
	};

	/**
	 * Get ext by type of module
	 * @param  {String} type Type of Ember module (template, router, view)
	 * @return {String}      Extension of file
	 */
	Resolver.prototype._getExt = function(type) {
		var exts = this.exts;
		if(exts[type]) {
			return exts[type];
		}

		return this.defaultExt;
	};

	return Resolver;
});