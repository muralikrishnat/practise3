var parseNumber = function (str) {
    return str.replace(/[^0-9]+/g, '');
};
//window.getComputedStyle(document.querySelector('.flex-item'), null)["border-left-width"]
var $ = function (selector) {
    //return document.querySelector(selector); //Element
    //document.querySelectorAll(selector);NodeList
    var $Element = function () {
        return this;
    };
    // var elems = document.querySelectorAll(selector);
    // elems.first= function () {
    //     return 
    // };

    //return $Element.call()
};
var getStyles = function (selector) {
    return window.getComputedStyle(document.querySelector(selector), null);
};
function moveSlider(isNext) {
    var widthOfSlide = getStyles('.flex-item')["width"];
    var sliderLeft = getStyles('.container')["left"];
    var sliderWidth = parseNumber(getStyles('.container')["width"]);
    widthOfSlide = widthOfSlide ? parseNumber(widthOfSlide) : null;
    sliderLeft = sliderLeft ? parseNumber(sliderLeft) : '0';

    if (widthOfSlide && sliderLeft) {
        var leftToMove = (parseFloat(sliderLeft) + parseFloat(widthOfSlide));
        console.log(widthOfSlide, sliderLeft, leftToMove, sliderWidth);
        if (leftToMove <= (parseFloat(sliderWidth) - widthOfSlide)) {
            document.querySelector('.container').style.left = '-' + leftToMove + 'px';
            var transitionEndHandler = function (event) {
                console.log('transition Done!', event);
                document.querySelector('.container').removeEventListener("transitionend", transitionEndHandler, false);
            };
            document.querySelector('.container').addEventListener("transitionend", transitionEndHandler, false);
        }
    }
};
var init = function () {
    setTimeout(function () {
        var flexItem = document.querySelectorAll('.flex-item').length;
        var computedStyles = window.getComputedStyle(document.querySelector('.view-port'), null);
        var widthOfSlide = parseNumber(window.getComputedStyle(document.querySelector('.view-port'), null)["width"]);
        var widthOfContainer = flexItem * parseFloat(widthOfSlide);
        document.querySelector('.container').style.width = widthOfContainer + 'px';
    }, 0);
};

less.pageLoadFinished.then(function () {
    init();
});