  var cMgr = (function() {
      var MgrClass = function() {};
      MgrClass.prototype.canvasElem = null;
      MgrClass.prototype.homeImgClass = null;
      MgrClass.prototype.loadHomeImage = function() {
          let img = $(this.homeImgClass);
          if (img) {
              var hCanvas = document.createElement('CANVAS');
              hCanvas.width = parseInt(getComputedStyle(img, false).width);
              hCanvas.height = parseInt(getComputedStyle(img, false).height);

              let hCtx = hCanvas.getContext('2d');
              hCtx.clearRect(0, 0, hCanvas.width, hCanvas.height);
              hCtx.drawImage(img, 0, 0, hCanvas.width, hCanvas.height);
              hCanvas.classList = 'canvas-home';
              if ($('.photo-holder canvas')) {
                  $('.photo-holder canvas').remove();
              }
              $('.photo-holder').append(hCanvas);
          }
      };

      var cInstance = new MgrClass();
      return cInstance;
  }).call({});