(function (app) {
    if(!app){
        return;
    }

    var serviceClass = function (sandbox, util) {
        
        this.config = function () {

        };
    };
    app.registerModule('routing', serviceClass);
})(window.app);