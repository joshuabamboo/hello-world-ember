module.exports = function(app) {
  var express = require('express');
  var greetingsRouter = express.Router();

  // Use the body-parser library in this service
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  // Create an embedded table using nedb if it doesn't yet exist
  var nedb = require('nedb');
  var greetingDB = new nedb({ filename : 'greetings', autoload: true});
  

  greetingsRouter.get('/', function(req, res) {
    userDB.find(req.query).exec(function(error, greetings){
      res.send({
        'greetings': greetings
      });
    });
  });

  greetingsRouter.post('/', function(req, res) {
    greetingDB.find({}).sort({id : -1}).limit(1).exec(function(err,greetings) {
      if(greetings.length != 0)
        req.body.greeting.id = greetings[0].id + 1;
      else
        req.body.greeting.id = 1;

      // Insert the new record into our data store, and return the newly
      // created record to Ember Data
      greetingDB.insert(req.body.greeting, function(err,newGreeting) {
        res.status(201);
        res.send(
          JSON.stringify(
          {
            greeting : newGreeting
          }));
      });
    })
  });

  greetingsRouter.get('/:id', function(req, res) {
    res.send({
      'greetings': {
        id: req.params.id
      }
    });
  });

  greetingsRouter.put('/:id', function(req, res) {
    res.send({
      'greetings': {
        id: req.params.id
      }
    });
  });

  greetingsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/greetings', greetingsRouter);
};
