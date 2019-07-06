import $ from "jquery";
var W3CWebSocket = require('websocket').w3cwebsocket;

export const fetchWSClient = () => {
  return new Promise((resolve, reject) => {
    var client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');
    
    client.onerror = function() {
        console.log('Connection Error');
    };
    
    client.onopen = function() {
        console.log('WebSocket Client Connected');
        // sendNumber()
    };
    
    client.onclose = function() {
        console.log('echo-protocol Client Closed');
    };
    
    client.onmessage = function(e) {
        if (typeof e.data === 'string') {
            console.log("Received: '" + e.data + "'");
        }
    };
    resolve(client);
  });
}

export const sendMessage = (client) => {
    if (client.readyState === client.OPEN) {
        var number = Math.round(Math.random() * 0xFFFFFF);
        client.send(number.toString());
    }
}
 
export const getBlah = (availability) => {
  return $.ajax({
    method: 'get',
    url: `/blah`,
  });
};
