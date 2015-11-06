import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.query('greeting', {user: params.user_id});
  },
  actions: {
    addGreeting: function() {
      var greeting = this.store.createRecord('greeting', {
        title: this.controller.get('title'),
        user: this.controllerFor('application').get('user')
      });
      greeting.save().then(() => {
        console.log('save successful');
        this.controller.set('title',null);
        this.refresh();
      }, function() {
        console.log('save failed');
      });
    }
  }
});



