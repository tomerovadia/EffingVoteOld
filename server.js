const express = require('express');
const app = express();
const http = require('http').createServer(app);;
const path = require('path');
var io = require('socket.io')(http);
const redis = require('redis');
const bluebird = require('bluebird');

// Key for waiting room Redis set.
const waitingRoomKey = 'waitingroom';

// Bluebird is supposed to create xxxAsync methods.
// https://github.com/NodeRedis/node_redis
bluebird.promisifyAll(redis);
var redisClient = redis.createClient(process.env.REDISCLOUD_URL);

// var redisSubClient = redis.createClient(process.env.REDISCLOUD_URL);
// var redisPubClient = redis.createClient(process.env.REDISCLOUD_URL);
// redisSubClient.subscribe('mychannel');

// Event listener for when this server receives a message from Redis, 
// sends to all browser clients
// redisSubClient.on('message', function(channel, message) {
//   io.sockets.emit('message', message);
// });

// Serves the front-end
app.use(express.static(path.join(__dirname, 'build')));

app.get('/blah', function(req, res) {
  console.log('Serving the blah');
  res.send("blahblah");
});

// Event listener for when a browser client connects to this server
// Use an `async` function, so we can use `await` below.
io.on('connection', async function(socket) {
  // TODO: Get a client ID from the browser, so we can be resilient to broken	
  // FE / BE connections. For now we'll use the socket ID.	
  const userID = 'user-' + socket.id;	
  console.log(userID, 'Socket.io user connected.');	

  var redisSubClient = redis.createClient(process.env.REDISCLOUD_URL);	
  var chatChannel;	
  // Loop until we find a chat partner or the waiting room is empty.	
  // TODO: Switch to a finite loop that sends failure info to the FE.	
  while (true) {	
    chatChannel = await redisClient.spopAsync(waitingRoomKey);	
    if (chatChannel == null) {	
      console.log(userID, 'No channels in waiting room.');	
      break;	
    }	
    // Check if the acquired channel is still active.	
    var numsub = await redisClient.pubsubAsync('NUMSUB', chatChannel);	
    console.log(userID, 'numsub:', numsub);	
    numsub = numsub[1];	
    if (numsub == 0) {	
      console.log(userID, 'Dropping channel:', chatChannel, numsub);	
    } else if (numsub == 1) {	
      console.log(userID, 'Selecting channel:', chatChannel, numsub);	
      break;	
    } else {	
      console.log(	
          'WARNING: Too many subscribers in waiting-room channel: ', numsub);	
      exit();	
    }	
  }  // End while.	

   // If we didn't find a partner channel, put own channel in waiting room.	
  // Else subscribe to that channel.	
  if (chatChannel == null) {	
    chatChannel = userID;	
    redisSubClient.subscribe(chatChannel);	
    await redisClient.saddAsync(waitingRoomKey, chatChannel);	
    console.log(userID, 'Subscribing to own channel:', chatChannel);	
  } else {	
    redisSubClient.subscribe(chatChannel);	
    // redisClient.publish(chatChannel, socket.id + ' has joined.');
    console.log(userID, 'Subscribing to channel: ', chatChannel);	
  }	

   // Set up incoming message event handler.	
  redisSubClient.on('message', function(channel, message) {	
    console.log(userID, 'incoming message from redis', message);	
    socket.send(message);	
  });
  
  redisSubClient.on('subscribe', function(channel, count) {	
    console.log('subscribe event ', count);
  });
  
  // Event listener for when a browser client disconnects to this server
  socket.on('disconnect', function(){
    console.log(userID, 'user disconnected');
  });
  
  // Event listener for when a browser client sends a message to this server
  socket.on('message', function(message){
    console.log(userID, 'sending message to redis: ' + message);
    redisClient.publish(chatChannel, message);
  });
});

http.listen(process.env.PORT || 8080, function() {
  console.log('listening on *:8080');
});