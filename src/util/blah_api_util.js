import $ from "jquery";
import { receiveMessage } from '../index';
const io = require('socket.io-client');

export const fetchSocketClient = () => {
  return new Promise((resolve, reject) => {
    const socket = io('http://192.168.0.106:8080');
    socket.on('message', receiveMessage);
    resolve(socket);
  });
}
 
export const getBlah = (availability) => {
  return $.ajax({
    method: 'get',
    url: `/blah`,
  });
};