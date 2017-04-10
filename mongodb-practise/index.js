var { createServer } = require('http');
var { parse } = require('url');
var {
    RouteClass,
    getUrlParams,
    checkParams,
    parseRequestFields
} = require('./lib');
var {
    fallBackRoute,
    tableHandler
} = require('./routing');
var headers = {},
    routings = [];
headers['Access-Control-Allow-Origin'] = 'http://web.evoke.com';
headers['Access-Control-Allow-Credentials'] = true;
headers['Access-Control-Allow-Headers'] = 'content-type';
headers['Access-Control-Allow-Methods'] = 'DELETE,GET,POST';

routings.push(new RouteClass('/', fallBackRoute));
routings.push(new RouteClass('/table/:tablename', tableHandler));
createServer((req, res) => {
    var isRouteFound = false,
        fnToCall = null,
        reqUrl = parse(req.url),
        reqUrlParams = getUrlParams(req.url),
        routeParams = null;

    for (let i = 0, len = routings.length, rItem = routings[i]; i < len; i++ , rItem = routings[i]) {
        var routingParams = getUrlParams(rItem.Url);
        if (rItem.Url === reqUrl.pathname) {
            isRouteFound = true;
            fnToCall = rItem.Fn;
            break;
        } else if (reqUrlParams.length === routingParams.length) {
            routeParams = checkParams(reqUrlParams, routingParams);
            if (routeParams) {
                isRouteFound = true;
                fnToCall = rItem.Fn;
            }
            break;
        }
    }

    if (isRouteFound && fnToCall) {
        parseRequestFields(req).then(({ err, fields }) => {
            if (!err) {
                fnToCall.call(null, {req, res, headers, routeParams, formParams:fields});
            } else {
                sendResponse(res, headers, { err, Msg: "Forms are not parsed" }, 200);
            }
        });
    } else {
        fallBackRoute(req, res, headers);
    }
}).listen(1212, () => {
    console.log('API is listening on 1212');
});