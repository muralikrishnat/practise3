(function (app) {
    if(!app){
        return;
    }

    var serviceClass = function (sandbox, util) {
        var self = this,
            privateMethods = {},
            $ = $ || util.dom;
        privateMethods.init = function () {
            $('body').on('keydown', '[n2-modal]', function () {
                console.log('test');
            });
        };
        self.method1 = function () {

        };

        self.init = function () {
            privateMethods.init();
        };
    };
    app.registerModule('render-engine', serviceClass);
})(window.core);