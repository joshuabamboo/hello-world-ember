import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('register');
  this.route('login');
  this.route('greetings', { path:"greetings/:user_id"},  function() {
    this.route('greets', { path:"greets/:greeting_id"});
  });
});

export default Router;
