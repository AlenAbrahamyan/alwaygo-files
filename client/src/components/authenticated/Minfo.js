import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');

function get_messages(cb) {
  socket.on('get_messages', msg_arr => cb(null, msg_arr));
  
}
export default  get_messages ; 