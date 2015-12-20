var models = require('../models');
var bluebird = require('bluebird');


module.exports = {
  messages: {
    get: function (req, res) {
      var g = bluebird.promisify(models.messages.get);
      res.writeHead(200, {'Content-type': 'application/json'});
      //data = models.messages.get();
      g().then(function(data) {
        console.log(JSON.stringify(data));
        res.end(JSON.stringify({results: data}));
      }); 
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var msg = req.body;
      var q = bluebird.promisify(models.messages.post);
      q(msg)
        .then(function(data){
          res.writeHead(200, {'Content-type': 'application/json'});
          console.log('data inside post = ' + JSON.stringify(data));
          res.end(JSON.stringify({results: [{objectId: data}]}));
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      var g = bluebird.promisify(models.users.get);
      res.writeHead(200, {'Content-type': 'application/json'});
      g().then(function(data) {
        res.end(JSON.stringify(data));
      });
    },
    post: function (req, res) {
      var msg = req.body;
      var q = bluebird.promisify(models.users.post);
      q(msg.username)
        .then(function(data){
          res.writeHead(200, {'Content-type': 'application/json'});
          //console.log('data inside post = ' + JSON.stringify(data));
          res.end(JSON.stringify({results: [{objectId: data}]}));
        });
    }
  }
};

