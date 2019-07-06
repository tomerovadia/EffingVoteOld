const http = require('http');
const express = require('express');
const websocket = require('websocket');
const redis = require('redis');
const app = express();

var clientsList = [];

app.get('/', function (req, res) {
  console.log('Serving index.html');
  res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/blah', function (req, res) {
  console.log('Serving the blah');
  res.send("blahblah");
});

// Set up server
var server = app.listen(process.env.PORT || 8080, () => {
   console.log('EffingVote listening at 8080');
});

var wsServer = new websocket.server({httpServer: server});

wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  var index = clientsList.push(connection) - 1;
  console.log('Opened connection to client #', index);
  var redisSubClient = redis.createClient();
  var redisPubClient = redis.createClient();

  redisSubClient.subscribe('channel');
  redisSubClient.on('message', function(channel, message) {
    connection.sendUTF(message)
  });

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type !== 'utf8') { return; }
    console.log('incoming message', message);
    redisPubClient.publish('channel', message['utf8Data']);
  });

  connection.on('close', function(connection) {
    console.log('Closing connection to client #', index);
    clientsList.splice(index, 1)
  });
  console.log('request done');
});
