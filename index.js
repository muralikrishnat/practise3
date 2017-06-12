// require('./fe-server')({ fePort: 3434, folder: 'react-practise' });
require('./fe-server')({ fePort: 3435, folder: 'pics-slider' });


// var { createServer } = require('http');
// var { createProxyServer } = require('http-proxy');
// var proxy = createProxyServer({});

// createServer((req, res) => {
//     if (req.headers.host.indexOf('api') === 0) {
//         proxy.web(req, res, { target: 'http://localhost:1212' });
//     } else if (req.headers.host.indexOf('web') === 0) {
//         proxy.web(req, res, { target: 'http://localhost:3434' });
//     } else {
//         res.write("Proxy is working");
//         res.end();
//     }
// }).listen(80, () => {
//     console.log('Proxy is started listening');
// });