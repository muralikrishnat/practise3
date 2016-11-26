(function (c) {
    var app = {},
        modules = [],
        module_instances = {},
        util = {};


    util.encodeRequestObject = function (reqObject) {

    };

    app.registerModule = function (moduleName, moduleCode) {
        modules.push({
            Name: moduleName,
            Fn: moduleCode
        });
    };

    app.module = function (moduleName) {
        if (module_instances[moduleName]) {
            return module_instances[moduleName];
        } else {
            var moduleToReturn = modules.filter((m) => { return m.Name === moduleName; });
            if (moduleToReturn.length > 0) {
                var FnClass = moduleToReturn[0]["Fn"];
                module_instances[moduleName] = new FnClass();
                return module_instances[moduleName];
            }
            return null;
        }
    };

    c.app = app;
    c.util = util;
})(window.core || (window.core = {}));