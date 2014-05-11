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