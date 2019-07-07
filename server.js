const express = require('express');
// const websocket = require('websocket');
const app = express();
const http = require('http').createServer(app);;
const path = require('path');
var io = require('socket.io')(http);

var clientsList = [];

app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   console.log('Serving index.html');
//   res.sendFile( __dirname + "/public/" + "index.html" );
// });

app.get('/blah', function (req, res) {
  console.log('Serving the blah');
  res.send("blahblah");
});

// Set up server
// var server = app.listen(process.env.PORT || 8080, () => {
//   console.log("EffingVote listening at 8080");
// });
// 
// var wsServer = new websocket.server({httpServer: server});

io.on('connection', function(socket) {
  console.log('Socket.io user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(message){
    console.log('message: ' + message);
    socket.broadcast.emit('chat message', message);
  });
});

http.listen(process.env.PORT || 8080, function() {
  console.log('listening on *:8080');
});

// wsServer.on('request', function(request) {
//   var connection = request.accept('echo-protocol', request.origin);
//   var index = clientsList.push(connection) - 1;
//   console.log('Opened connection to client #', index);
// 
//   // This is the most important callback for us, we'll handle
//   // all messages from users here.
//   connection.on('message', function(message) {
//     if (message.type !== 'utf8') { return; }
//     console.log('incoming message', message);
// 
//     for (var i=0; i < clientsList.length; i++) {
//       if (i != index) {
//         console.log('sending to client #', i);
//         clientsList[i].sendUTF(message['utf8Data']);
//       }
//     }
//   });
// 
//   connection.on('close', function(connection) {
//     console.log('Closing connection to client #', index);
//     clientsList.splice(index, 1);
//   });
//   console.log('request done');
// });
