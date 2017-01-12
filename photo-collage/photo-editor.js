HTMLElement.prototype.insertAfter = function(newNode) {
    this.parentNode.insertBefore(newNode, this.nextSibling);
}

class Layer {
    constructor(defaults) {
        this.defaults = defaults;
        this.elemId = null;
        this.$div = null;
    }

    bindEvents($div) {
        var events = this.defaults.events;
        Object.keys(events).forEach((k) => {
            $div[k] = events[k];
        });
    }

    render(isUpdate) {
        var $div = document.createElement('div');
        $div.className = `layer ${this.defaults.LayerType} box-shadow`;
        this.bindEvents($div);
        document.querySelector('.photo-editor').appendChild($div);
        this.$div = $div;
    }
}

var photoEditor = new(function() {
    var layers = [],
        layerEvents = {},
        photoEditorElem = document.querySelector('.photo-editor'),
        dragSelected = null,
        x_pos = 0,
        y_pos = 0,
        x_elem = 0,
        y_elem = 0;
    layerEvents.onmousedown = function() {
        dragSelected = this;
        x_elem = x_pos - dragSelected.offsetLeft;
        y_elem = y_pos - dragSelected.offsetTop;
    };

    layerEvents.onmouseup = function() {
        var $elem = this,
            selectedElem = document.querySelector('.photo-editor .selected');
        if (selectedElem) {
            selectedElem.className = selectedElem.className.replace('selected', '');
        }
        $elem.className = ($elem.className.indexOf('selected') >= 0) ?
            $elem.className :
            ($elem.className + ' selected');
    };
    this.addLayer = (layerType) => {
        var l = new Layer({ LayerType: layerType, events: layerEvents });
        layers.push(l);
        l.render();
    };

    this.renderLayers = () => {
        document.querySelector('.photo-editor').innerHTML = '';
        layers.forEach((l) => {
            l.render();
        });
    };

    this.updateLayer = (srcElem) => {
        var selectedElem = document.querySelector('.photo-editor .selected');
        document.querySelectorAll('.menu.active [data-menu-style]').forEach((x) => {
            if (x.value) {
                selectedElem.style[x.getAttribute('data-menu-style')] = x.value;
            }
        });
        srcElem.closest('.menu').style.top = '100%';
        srcElem.closest('.menu').className = srcElem.closest('.menu').className.replace('active', '');
    };

    this.unselectLayer = () => {
        document.querySelectorAll('.photo-editor .selected').forEach((x) => {
            x.className = x.className.replace('selected', '');
        })
    }

    this.openMenu = (menuType, elem) => {
        var menuToShow = document.querySelector('.menu.' + menuType);
        if (menuToShow) {
            var menu_X = elem.offsetLeft,
                elemComputedStyles = getComputedStyle(elem, null),
                menu_Y = elem.offsetTop + (elemComputedStyles.height ?
                    parseInt(elemComputedStyles.height.replace('px', '')) :
                    0);
            menuToShow.className += ' active';
            menuToShow.style.top = menu_Y + 'px';
            menuToShow.style.left = menu_X + 'px';
        }
    };

    this.closeMenu = (elem) => {
        elem.closest('.menu').style.top = '100%';
        elem.closest('.menu').className = elem.closest('.menu').className.replace('active', '');
    };

    photoEditorElem.onclick = (e) => {
        if (e.target.className.indexOf('layer') < 0) {
            document.querySelectorAll('.photo-editor .selected').forEach((x) => {
                x.className = x.className.replace('selected', '');
            })

        }
    };

    function _move_elem(e) {
        x_pos = document.all ?
            window.event.clientX :
            e.pageX;
        y_pos = document.all ?
            window.event.clientY :
            e.pageY;
        if (dragSelected !== null) {
            dragSelected.style.left = (x_pos - x_elem) + 'px';
            dragSelected.style.top = (y_pos - y_elem) + 'px';
        }
    }

    function _destroy() {
        dragSelected = null;
    }

    document.onmousemove = _move_elem;
    document.onmouseup = _destroy;

    this.layers = layers;
})();