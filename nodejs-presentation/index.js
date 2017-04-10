
// var heros = [
//     {
//         Name: 'Barry Allen'
//     },
//     {
//         Name: 'Cisco Ramon'
//     }
// ];

// heros.forEach((x) => {
//     console.log(`${x.Name}`);
// })

var net = require('net');
var server = net.createServer((socket) => {
    socket.end('goodbye\n');
}).on('error', (err) => {
    // handle errors here
    throw err;
});

// grab a random port.
server.listen(3434, () => {
    console.log('opened server on', server.address());
});

// //loading 'net' pre-defined module and storing in net variable
// var net = require('net');
// //creating socket server  with simply sending back same text coming from socket
// var wsServer = net.createServer((socket) => {
//     //Sending data on socket
//     socket.write('Echo Server \n');
// });

// //Setting socket server listing port on 3434 
// wsServer.listen(3434, () => {
//     console.log('socket listening on 3434');
// });





// var { interpolate } = require('./first-module');

// var templateStr = 'Hi ${Name}, Welcome to NodeJS. You are residing at ${Location}';

// var nicolasData = {
//     Name: 'Nicolas',
//     Location: 'Mars'
// }
// var compiledString = interpolate(templateStr, nicolasData);
// console.log('Template String : ', templateStr);
// console.log('Compiled String : ', compiledString);