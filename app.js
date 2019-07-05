const http = require('http');
const express = require('express');
const websocket = require('websocket');
const app = express();

var clientsList = [];

app.get('/', function (req, res) {
  console.log('Serving index.html');
  res.sendFile( __dirname + "/" + "index.html" );
});

// Set up server
var server = app.listen(process.env.PORT || 8081, () => {
   console.log("EffingVote listening at 8081");
});

var wsServer = new websocket.server({httpServer: server});

wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  var index = clientsList.push(connection) - 1
  console.log('Opened connection to client #', index);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type !== 'utf8') { return; }
    console.log('incoming message', message);

    for (var i=0; i < clientsList.length; i++) {
      if (i != index) {
        console.log('sending to client #', i);
        clientsList[i].sendUTF(message['utf8Data'])
      }
    }
  });

  connection.on('close', function(connection) {
    console.log('Closing connection to client #', index);
    clientsList.split(index, 1)
  });
  console.log('request done');
});

