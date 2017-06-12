var WebSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer(function (req, res) {
    var headers = {};

    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Credentials'] = true;
    res.writeHead(200, headers);
    res.end("This is default Route");
});


function initWS() {
    wsServer = new WebSocketServer({
        httpServer: server,
        autoAcceptConnections: false
    });



    wsServer.on('request', function (request) {

        var connection = request.accept('echo-protocol', request.origin);

        console.log((new Date()) + ' Connection accepted.');

        connection.on('message', function (message) {

            if (message.type === 'utf8') {
                var datafromClient = BuStand.parse(message.utf8Data);
                console.log('Received Message: ', message.utf8Data);
                connection.sendUTF(JSON.stringify(datafromClient));
            }
            else if (message.type === 'binary') {
                console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                //connection.sendBytes(message.binaryData);
            }
        });
        connection.on('close', function (reasonCode, description) {
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });

        if (connection.connected) {
            //connectionArray.push(new ConnectionObject(guid(), connection,))
            connection.sendUTF('testtt');
        }
    });
}

server.listen(7878, () => {
    initWS();
});




