import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.query('greet', {greeting:params.greeting_id});
  },
  actions: {
    addgreet: function() {
      this.store.findRecord('greeting',
        this.paramsFor('greetings.greets').greeting_id).then(
          (greeting) => {
            console.log(greeting);
            var greet = this.store.createRecord('greet', {
              title : this.controller.get('title'),
              greeting: greeting
            });
            console.log(greet);
            greet.save().then(() => {
              console.log('save successful');
              this.controller.set('title',null);
              this.refresh();
            }, function() {
              console.log('save failed');
            });
        });
    },
    deleteGreet: function(greet) {
      console.log('deleting greet with title ' + greet.get('title'));
      greet.deleteRecord();
      greet.save();
    }
  }
});
