import $ from "jquery";
import { receiveMessage, receiveConnectionStatus } from '../index';
const io = require('socket.io-client');

export const fetchSocketClient = () => {
  console.log("fetchSocketClient");
  return new Promise((resolve, reject) => {
    console.log("fetchSocketClient Promise");
    const socket = io();

    socket.on('message', receiveMessage);
    socket.on('connect', () => console.log('Your id is: ' + socket.id));

    resolve(socket);
  });
}

// Example API call
export const getBlah = (availability) => {
  return $.ajax({
    method: 'get',
    url: `/blah`,
  });
};
