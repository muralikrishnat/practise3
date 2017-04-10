var formidable = require('formidable');
module.exports = {
    parseRequestFields: function (req) {
        return new Promise((res, rej) => {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                res({ err, fields });
            });
        });
    },
  
    RouteClass: function (u, fn) {
        this.rParams = u.split('/').filter((h) => { return h.length > 0 });
        this.Url = u;
        this.Fn = fn;
    },
    sendResponse: (res, headers, resObject, resCode) => {
        headers["Content-Type"] = "text/json";
        res.writeHead(resCode, headers);
        resObject = typeof resObject === 'object' ? JSON.stringify(resObject) : resObject;
        res.end(resObject);
    },
    getQueryParamSync: function (name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        var queryParamVal = null;
        if (!results) {
            return queryParamVal;
        }
        if (!results[2]) {
            return queryParamVal;
        }
        queryParamVal = decodeURIComponent(results[2].replace(/\+/g, " "));
        return queryParamVal;
    },
    checkParams: function (urlParams, routeParams) {
        var paramMatchCount = 0, paramObject = {};
        for (var i = 0; i < urlParams.length; i++) {
            var rtParam = routeParams[i];
            if (rtParam.indexOf(':') >= 0) {
                paramObject[rtParam.split(':')[1]] = urlParams[i];
                paramMatchCount += 1;
            } else if(urlParams[i] === rtParam){
                paramMatchCount += 1;
            }
        }
        if (paramMatchCount === urlParams.length) {
            return paramObject;
        }
        return false;
    },
    getUrlParams: (urlToParse) => {
        if (!urlToParse) {
            return [];
        }
        if (urlToParse.indexOf('?') >= 0) {
            urlToParse = urlToParse.substr(0, urlToParse.indexOf('?'))
        }
        return urlToParse.split('/').filter((h) => { return h.length > 0; });
    }
};