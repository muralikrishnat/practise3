(function (w) {

    if (!('Promise' in window)) {
        window.Promise = function (fn) {
            var cbP, resP, thenFn;
            this.then = function (cb) {
                if (cbP) {
                    cb(resP);
                } else {
                    thenFn = cb;
                }
            };
            fn(function (res) {
                cbP = true;
                resP = res;
                thenFn(res);
            });
        };
    }

    //('locaStorage' in window) && localStorage.setItem('test', 'test');

    var modules = [],
        app = {},
        util = {},
        sandbox = {},
        shardModuleInstances = {};

    util.checkModuleName = function (mName) {

    };

    util.getQueryParam = function () {

    };

    // var sandbox = 38;
    // Object.defineProperty(o, 'b', {
    //     get: function () { return bValue; },
    //     set: function (newValue) { bValue = newValue; },
    //     enumerable: true,
    //     configurable: true
    // });


    util.loadScript = function (src, callback) {
        var s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onreadystatechange = s.onload = function () {
            if (!callback.done && (!s.readyState || /loaded|complete/.test(s.readyState))) {
                callback.done = true;
                callback();
            }
        };
        document.querySelector('head').appendChild(s);
    };

    app.registerModule = function (moduleName, moduleCode, options) {
        try {
            modules.push({
                Name: moduleName,
                Fn: moduleCode,
                Details: options
            });
            if (!shardModuleInstances[moduleName[0]]) {
                shardModuleInstances[moduleName[0]] = {};
            }
            shardModuleInstances[moduleName[0]][moduleName] = new moduleCode(sandbox, util);
        } catch (e) {

        }
    };

    sandbox.module = function (moduleName, options) {
        if (!moduleName && typeof moduleName != 'string') {
            return null;
        }
        return shardModuleInstances[moduleName[0]] ? shardModuleInstances[moduleName[0]][moduleName] : null;
    };

    util.dom = function (selector) {
        return ((typeof selector === 'string') ? document.querySelector(selector) : document);
    };

    w.app = app;
    w.util = util;

})(window);