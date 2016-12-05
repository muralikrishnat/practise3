
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (cb) {
        var self = this;
        for (var i = 0; i < self.length; i++) {
            cb.call(this, self[i]);
        }
    };
}
var M = function (selector) {
    return document.querySelectorAll(selector);
};
var getTimeStamp = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return 'U' + (new Date).getTime().toString(16) + s4() + s4();
};

var scopeData = function (scopeObj, prop) {
    var scope = '';
    if (prop.indexOf('.') >= 0) {
        var propsOrder = prop.split('.');
        var done = true;
        for (var i = 0; i < propsOrder.length; i++) {
            if (scopeObj[propsOrder[i]]) {
                scopeObj = scopeObj[propsOrder[i]];
            } else {
                done = false;
                break;
            }
        }
        scope = done ? scopeObj : '';
    } else {
        scope = scopeObj[prop];
    }
    return scope;
};

var renderBind = function (scope, elem) {
    elem.find('[n2-bind]').forEach(function (el) {
        var prop = el.attr('n2-bind');
        el.innerHTML = scopeData(scope, prop)
    });
};
var renderRepeater = function (repeatScope, elem) {
    elem.find('[n2-repeat]').forEach(function (el) {
        var prop = el.attr('n2-repeat'),
            listItemName,
            listName,
            lists,
            insertAfterElem = null,
            repeaterId = getTimeStamp();
        if (!el.data('repeaterId')) {
            el.data('repeaterId', repeaterId);
        } else {
            repeaterId = el.data('repeaterId');
        }
        el.parentNode.find('[data-repeater-id="' + el.data('repeaterId') + '"]').forEach(function (rem) {
            rem.remove();
        });

        listItemName = prop.indexOf(' in ') >= 0 ? prop.split(' in ')[0] : 'item';
        listName = prop.indexOf(' in ') >= 0 ? prop.split(' in ')[1] : null;
        if (listName) {
            lists = scopeData(repeatScope, listName);
            if (lists && lists instanceof Array) {
                lists.forEach(function (r) {
                    var ee = el.cloneNode(true),
                        scope = {};
                    r.$id = getTimeStamp();
                    scope[listItemName] = r;
                    ee.removeAttribute('n2-repeat');
                    ee.attr('data-repeater-id', repeaterId);
                    ee.data('$id', r.$id);
                    renderBind(scope, ee);
                    if (ee.find('[n2-repeat]').length > 0) {
                        renderRepeater(scope, ee);
                    }
                    insertAfterElem = insertAfterElem || el;
                    insertAfterElem.insertAdjacentElement('afterend', ee);
                    insertAfterElem = ee;
                });
            }
        }
    });
};

var renderElem = function () {

};

(function () {
    var modal;
    function init() {
        var app = {},
            elemCache = {},
            data = {};


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
            var scopePath = elem.attr('n2-modal') || elem.attr('data-n2-modal');
            if (scopePath) {
                var scope = modal(scopePath);
                if (scope) {
                    elem.find('[n2-bind]').forEach(function (el) {
                        var prop = el.attr('n2-bind');
                        el.innerHTML = scopeData(scope, prop)
                    });
                    renderRepeater(scope, elem);
                }
            }
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

            if (!key && !val) {
                return elemCache[elem.N2Id];
            }

            if (val) {
                elemCache[elem.N2Id][key] = val;
            } else {
                return elemCache[elem.N2Id][key];
            }
        };

        modal = function (propertyPath, val) {
            var props = propertyPath.split('.'),
                setVal = data;
            for (var i = 0; i < props.length - 1; i++) {
                var prop = props[i];
                if (!setVal[prop]) {
                    if (val) {
                        setVal[prop] = {};
                    } else {
                        return null;
                    }
                }
                setVal = setVal[prop];
            }
            if (val) {
                setVal[props[props.length - 1]] = val;
                return { set: modal, render: modal.render };
            } else {
                return setVal[props[props.length - 1]];
            }
        };
        
        modal.render = function () {
            M('[n2-modal]').forEach(function (elemToRender) {
                elemToRender.render();
            });
        };

        if (window.core.initApp) {
            window.core.initApp(modal);
        }

        window.modal = modal;
        
    }


    var lessLoaded = false,
        domLoaded = false,
        handleDomLoader = function () {
            domLoaded = true;
            if (domLoaded && lessLoaded) {
                init();
            }
        };
    if (typeof less !== 'undefined') {
        less.pageLoadFinished.then(function () {
            lessLoaded = true;
            if (domLoaded && lessLoaded) {
                init();
            }
        });
    } else {
        lessLoaded = true;
    }

    window.document.onload = handleDomLoader;
    window.onload = handleDomLoader;

    window.core = {
        initApp: null,
        init: function (cb) {
            core.initApp = cb;
        },
        module: function () {

        }
    };
    
})();
