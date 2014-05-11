var Ember = require('Ember');

var Router = Ember.Router.extend({});

Router.map(function() {
    this.resource('todos', { path: '/' });
});

module.exports = Router;