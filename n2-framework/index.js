var M = function (selector) {
    return document.querySelectorAll(selector);
};
var getTimeStamp = function () {
    return 'U' + (new Date).getTime();
};

function init() {
    var app = {},
        elemCache = {};
    app.Name = "Murali";
    app.Project = {
        Name: 'N2-Framework'
    };
    app.Plans = [
        {
            Name: 'Plan 1'
        },
        {
            Name: 'Plan 2'
        },
        {
            Name: 'Plan 3'
        }
    ];
    HTMLElement.prototype.attr = function (key, val) {
        var elem = this;
        if (!val) {
            return elem.getAttribute(key)
        } else {
            elem.setAttribute(key, val);
            return elem;
        }
    };
    HTMLElement.prototype.find = function (selector) {
        var elem = this;
        return elem.querySelectorAll(selector);
    };
    HTMLElement.prototype.render = function () {
        var elem = this;
        elem.find('[n2-bind]').forEach((el) => {
            var prop = el.attr('n2-bind'),
                scopeObj = app;
            if (prop.indexOf('.') >= 0) {
                prop.split('.').forEach((x) => {
                    if (scopeObj[x]) {
                        scopeObj = scopeObj[x];
                    }
                });

            } else {
                scopeObj = scopeObj[prop];
            }
            el.innerHTML = scopeObj;
        });

        elem.find('[n2-repeat]').forEach((el) => {
            
        });
    };
    HTMLElement.prototype.data = function (key, val) {
        var elem = this,
            timeStamp = getTimeStamp();
        if (!elem.N2Id) {
            elem.N2Id = timeStamp;
        }
        if (!elemCache[elem.N2Id]) {
            elemCache[elem.N2Id] = {};
        }
        elemCache[elem.N2Id][key] = val;
    };
    M('[n2-modal]').forEach((elemToRender) => {
        elemToRender.render();
    });

}