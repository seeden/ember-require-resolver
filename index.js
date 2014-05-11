var Ember = require('Ember');

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

Resolver.prototype._prepareEmberResolver = function () {
	var self = this;

	var resolve = function(parsedName) {
		var resolved = this._super(parsedName);

		if (resolved) { 
			return resolved; 
		}

		var module = self._resolve(parsedName);
		if(module !== null) {
			if (Ember.ENV.LOG_MODULE_RESOLVER) {
      			Ember.Logger.info('hit', parsedName.fullName);
    		}
			return module
		}

		if (Ember.ENV.LOG_MODULE_RESOLVER) {
        	Ember.Logger.info('miss', parsedName.fullName);
      	}
		return resolved;
	};

	this.ember = Ember.DefaultResolver.extend({
    	resolveOther: resolve,
    	resolveTemplate: resolve, 
  // 	resolveModel: resolve,
    	normalize: function(fullName) {
			return Ember.String.dasherize(fullName.replace(/\./g, '/'));
		}
	});
};

Resolver.prototype._resolve = function(parsedName) {
	//if there no exists resolver
	var type = parsedName.type;
	var fullName = parsedName.fullNameWithoutType;

	//resolve by user
	return this._resolveByUser(type, fullName);
};

Resolver.prototype._resolveByUser = function(type, fullName) {
	var path = this._preparePath(type, fullName);
	return this.require(type, fullName, path);
};

Resolver.prototype._preparePath = function(type, fullName) {
	return type + 's/' + fullName + this._getExt(type);
};

Resolver.prototype._getExt = function(type) {
	var exts = this.exts;
	if(exts[type]) {
		return exts[type];
	}

	return this.defaultExt;
};

module.exports = Resolver;