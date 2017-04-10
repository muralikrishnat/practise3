


//loading 'http' pre-defined module and storing in http variable
var http = require('http');

//creating server  with simply sending text as response to every GET request
var server = http.createServer((request, response) => {
    //Checking request url path and http method of request
    if (request.url === '/' && request.method === 'GET') {
        //Setting 200 as responseCode to make it as success and content type
        response.writeHead(200, { "Content-type": "text/html"});
        //Sending 'Simple Server' text as response to client
        response.end("Simple Server");
    }
});

//Setting server listing port on 3434 
server.listen(3434, (t) => {
    console.log("Server started listing on port 3434");
});


var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
wsServer.on('request', function(request) { 
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        console.log('Received Message: ', message.utf8Data);
        connection.sendUTF(JSON.stringify( message.utf8Data));
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

    if(connection.connected){
        connection.sendUTF("Connected connection");
    }
});



