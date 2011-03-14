/**
 * @author Arkadiusz Buras
 */


function Brush(options) {
  $.extend(this, options);
  this.init();
}

$.extend(Brush.prototype, {
  init: function(){},
  mouseDown: function() {},
  mouseMove: function() {},
  mouseUp: function() {},
  click: function() {},
  config: function(stage){
    this.map = stage.map;
    this.viewport = stage.viewport;
    this.engine = stage.engine;
    this.stage = stage;
  },
});
