(function (app) {
    if(!app){
        return;
    }

    var serviceClass = function (sandbox, util) {

        this.method1 = function () {

        };
    };
    app.registerModule('demo-module', serviceClass);
})(window.app);