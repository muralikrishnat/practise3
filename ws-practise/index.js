var http = require('http');
var server = http.createServer(function (req, res) {
    var headers = {};

    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Credentials'] = true;

    console.log(req.method);

    res.writeHead(200, headers);
    res.end("This is default Route changed");
});


var getArgument = (name, args) => {
    var val = '';
    args.forEach(function (a) {
        console.log('a', a);
        if (a.indexOf('=') > 0) {
            var a1 = a.split('=')[0];
            if (a1 === name || a1 === '--' + name) {
                val = a.split('=')[1];
            }
        }
    }, this);
    return val;
};
console.log(getArgument('test', process.argv));

server.listen(2323, () => {
    console.log('started!!!!!!!!!!!!!!!!!');
});

