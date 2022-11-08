const io = require('socket.io')( process.env.PORT || 52300);
console.log('io server started')
module.exports = io;

