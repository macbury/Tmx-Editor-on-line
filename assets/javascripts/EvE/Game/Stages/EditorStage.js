function EditorStage () {
  
}

$.extend(EditorStage.prototype, Stage.prototype);
$.extend(EditorStage.prototype, {
  start: function(){
    var self = this;    
    this.engine.clearColor = "#cccccc";
    this.engine.timer.duration = 10;
    $(window).resize(function () {
      var width = $('.content').width();
      var height = $('.content').height();
      $("#screen").width(width);
      $("#screen").height(height);
      $("#screen").attr("width", width);
      $("#screen").attr("height", height);
      self.engine.width = width;
      self.engine.height = height;
      
      if (self.map) {
        $('.scroller_emulator div').width(self.map.width() * self.engine.scale)
                                   .height(self.map.height() * self.engine.scale);
      }
      
    });    
    
    $(window).resize();
    
    $( "#new" ).button({
			text: false,
			icons: {
				primary: "ui-icon-document"
			}
		});
    
    $( "#save" ).button({
			text: false,
			icons: {
				primary: "ui-icon ui-icon-disk"
			}
		});
    
		$( "#open" ).button({
			text: false,
			icons: {
				primary: "ui-icon-open"
			}
    });
    $( "#brush, #layers, #scale" ).buttonset();
    
    $('#scale input').click(function () {
      self.engine.scale = $(this).val();
      $(window).resize();
    });
    
    $('#layers input').click(function () {
      self.viewport.layer_filter = $(this).val();
    });
    
    this.map = new Map({
      file_name: "maps/test_compresed.tmx",
      viewport: this.viewport,
      onLoad: function(){
        $(window).trigger("resize");
      },
    });
    
  },
  
  update: function(deltaTime){
    this.viewport.y = $('.scroller_emulator').scrollTop() * this.engine.scale;
    this.viewport.x = $('.scroller_emulator').scrollLeft() * this.engine.scale;
  },
  
  render: function(deltaTime){
  
    for (var x = this.map.columns; x >= 0; x--){      
      this.engine.drawLinePath('rgba(0, 0, 0, 0.5)', 1, [
        { x: (x * this.map.tile_size) * this.engine.scale - this.viewport.x, y: 0 },
        { x: (x * this.map.tile_size) * this.engine.scale - this.viewport.x, y: this.map.height()  * this.engine.scale - this.viewport.y }
      ]);      
    }
    
    for (var y=0; y < this.map.rows; y++) {      
      this.engine.drawLinePath('rgba(0, 0, 0, 0.5)', 1, [
        { x: 0, y: (y * this.map.tile_size) * this.engine.scale - this.viewport.y },
        { x: this.map.width() * this.engine.scale- this.viewport.x , y: y*this.map.tile_size * this.engine.scale - this.viewport.y }
      ]);  
    }
  },
  
  end: function(){
    
  },
});
