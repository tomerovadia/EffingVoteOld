const http = require('http');
var express = require('express');
const app = express();

app.get('/', function (req, res) {
  console.log('Serving index.html');
  res.sendFile( __dirname + "/" + "index.html" );
});


// Set up server
var server = app.listen(process.env.PORT || 8081, () => {
   console.log("EffingVote listening at 8081");
});