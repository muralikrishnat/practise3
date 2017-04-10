var {createServer } = require('http');

var server = createServer((request, response) => {
    if (request.url === '/' && request.method === 'GET') {
        response.writeHead(200, { "Content-type": "text/html" });
        response.end("Simple Server");
    }
});

server.listen(3434, (t) => {
    console.log("Server started listing on port 3434");
});


var messages = [],
    users = [],
    connectionPool = [],
    userNo = 0,
    messageId = 0;
class Message {
    constructor(id, m, s) {
        this.Id = id;
        this.Msg = m;
        this.Sender = s;
    }
}
class User {
    constructor(id, n) {
        this.Id = id;
        this.Name = n;
    }

}

class UserConnection {
    constructor(user, connection) {
        this.User = user;
        this.connection = connection;
    }
}

var broadCasts = (broadCastType) => {
    connectionPool.forEach((uc) => {
        var responseObj = {
            Users: users,
            Messages: messages,
        };
        if (broadCastType.IsNewUser) {
            if (uc.User.Id === broadCastType.CurrentUser.Id) {
                responseObj.broadCastType = broadCastType;
                responseObj.broadCastType.LoadMessages = true;
            }
            else {
                responseObj.broadCastType = { IsNewUser: true, addedUser: broadCastType.CurrentUser };
            }
        } else if (broadCastType.IsNewMessage) {
            responseObj.broadCastType = broadCastType;
        }

        uc.connection.sendUTF(JSON.stringify(responseObj));
    });
};

var { server: WebSocketServer } = require('websocket');

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        console.log('Client: ', message.utf8Data);
        //connection.sendUTF(JSON.stringify( message.utf8Data));
        var { Sender, Msg } = JSON.parse(message.utf8Data);
        messageId = messageId + 1;
        var message = new Message(messageId, Msg, Sender);
        messages.push(message);
        broadCasts({ IsNewMessage: true, AddedMessage: message });

    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

    if (connection.connected) {
        // connection.sendUTF("Connected connection");
        userNo = userNo + 1;
        var user = new User(userNo, "Guest" + userNo);
        users.push(user);
        connectionPool.push(new UserConnection(user, connection));
        broadCasts({ IsNewUser: true, CurrentUser: user });
    }
});