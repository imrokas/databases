var db = require('../db');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (cb) {
      db.query("SELECT m.text, m.createdAt, m.objectId, u.username, r.roomname FROM messages m, users u, room r WHERE m.userId=u.id AND r.id=m.roomNameId", function(err, data){
        cb(err, data);
      });
    }, // a function which produces all the messages
    post: function(msg, cb) {
      var q = bluebird.promisify(db.query);
      var getUser = "SELECT id FROM users WHERE username ='" + msg.username + "'";
      var insertUser = "INSERT into users (username) values ('"+ msg.username+"')";
      var getRoom = "SELECT id FROM room WHERE roomname ='" + msg.roomname + "'";
      var insertRoom = "INSERT into room (roomname) values ('"+ msg.roomname+"')";
      //var insertMessage = "INSERT into messages (userId, text, roomNameId) values ('"+userId+"','" + msg.text +"','"+roomId+"')";
      var userId, roomId;
      db.query(getUser, function(err, data) {
        if(err){
          console.log(err);
        }
        if(data.length === 0){
          db.query(insertUser, function(err, data){
            userId = data.insertId;
          });
        }else{
          userId = data[0].id;
        }
        //get room
        db.query(getRoom, function(err,data){
          if(err){
            console.log(err);
          }
          if(data.length === 0){
            db.query(insertRoom, function(err, data){
              cb(err, data);
              roomId = data.insertId;
              db.query("INSERT into messages (userId, text, roomNameId) values ('"+userId+"','" + msg.text +"','"+roomId+"')", function(err, data){
                cb(err,data.insertId);
              });
            });
          }else{
            roomId = data[0].id;
          }
          //insert message
          db.query("INSERT into messages (userId, text, roomNameId) values ('"+userId+"','" + msg.text +"','"+roomId+"')", function(err, data){
            cb(err,data.insertId);
          });
        });
        
      });
    }// a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
      
    get: function (cb) {
      db.query("SELECT username FROM users", function(err, data){
        cb(err, data);
      });
    },
    post: function(username, cb){
      var insertUser = "INSERT into users (username) values ('"+username+"')";
      db.query(insertUser, function(err,data){
        cb(err,data.insertId);
      });
    }
  }
  
};
