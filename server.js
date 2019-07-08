const express = require('express');
const app = express();
const http = require('http').createServer(app);;
const path = require('path');
var io = require('socket.io')(http);
const redis = require('redis');

var redisSubClient = redis.createClient(process.env.REDISCLOUD_URL);
var redisPubClient = redis.createClient(process.env.REDISCLOUD_URL);
redisSubClient.subscribe('mychannel');

// Event listener for when this server receives a message from Reddis, 
// sends to all browser clients
redisSubClient.on('message', function(channel, message) {
  io.sockets.emit('chat message', message);
});

// Serves the front-end
app.use(express.static(path.join(__dirname, 'build')));

app.get('/blah', function(req, res) {
  console.log('Serving the blah');
  res.send("blahblah");
});

// Event listener for when a browser client connects to this server
io.on('connection', function(socket) {
  console.log('Socket.io user connected');
  
  // Event listener for when a browser client disconnects to this server
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  // Event listener for when a browser client sends a message to this server
  socket.on('chat message', function(message){
    console.log('message: ' + message);
    redisPubClient.publish('mychannel', message);
  });
});

http.listen(process.env.PORT || 8080, function() {
  console.log('listening on *:8080');
});