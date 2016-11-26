(function (app) {
    if (!app) {
        return;
    }

    var ajaxServiceClass = function (sandbox, util) {
        var makeRequest = function (reqObj) {
            return new Promise(function (res, rej) {
                var xhr = new XMLHttpRequest();
                xhr.open(reqObj.method, reqObj.url);
                if (reqObj.isCORS) {
                    xhr.withCredentials = true;
                }
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function () {
                    try {
                        if (xhr.status === 200) {
                            res({ response: JSON.parse(xhr.responseText) });
                        } else {
                            res({ err: { code: 5002, details: xhr }});
                        }
                    } catch (e) {
                        res({ err: { code: 5001, msg: 'JSON Parsing Error', details: xhr }, response: xhr.responseText });
                    }
                };

                xhr.onerror = function () {
                    res({ err: { code: 5000, msg: 'On Error', details: xhr } });
                };

                if (reqObj.postData) {
                    xhr.send(JSON.stringify(reqObj.postData));
                } else {
                    xhr.send();
                }
            });
        };

        this.get = function (reqObj) {
            reqObj.method = 'GET';
            return makeRequest(reqObj);
        };

        this.post = function (reqObj) {
            reqObj.method = 'POST';
            return makeRequest(reqObj);
        };
    };
    app.registerModule('ajax-service', ajaxServiceClass);
})(window.app);