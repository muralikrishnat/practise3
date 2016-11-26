((c) => {
    if (c.app) {
        var ajaxServiceClass = function (sandbox) {
            // var requestObject = {
            //     Method: 'GET',
            //     QueryParams: { param1: 'value1' },
            //     Url: 'url' 
            //     PostData: { Name: 'Murali' }
            // }
            var getRequest = function (requestObject, res) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '/');
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var resObject = JSON.parse(xhr.responseText);
                        res(resObject);
                    }
                    else {
                        res({ err: xhr });
                    }
                };
                xhr.onerror = function (err) {
                    res({ err: err });
                };
                xhr.send();
            };
            var makeRequest = function (requestObject) {
                return new Promise((res, rej) => {
                    res();
                });
            };

            this.post = function (requestObject) {
                requestObject.Method = "POST";
                return makeRequest(requestObject);
            };
            this.get = function (requestObject) {
                requestObject.Method = "GET";
                return makeRequest(requestObject);
            };

            this.send = function (requestObject) {
                return makeRequest(requestObject);
            };
        };
        a.registerModule('ajaxService', ajaxServiceClass);
    }
})(window.core);