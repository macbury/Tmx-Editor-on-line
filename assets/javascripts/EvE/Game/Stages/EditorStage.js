function EditorStage (file) {
  this.file = file;
}

$.extend(EditorStage.prototype, Stage.prototype);
$.extend(EditorStage.prototype, {
  
  brush: null,
  
  snapPoint: function(p){
    var py = parseInt(p / this.map.tile_size) * this.map.tile_size + (this.map.tile_size / 2);
    
    return py;
  },
  
  tileX: function(e){
    var self = this;
    return (self.viewport.x + e.clientX - $('.content').position().left);
  },

  tileY: function(e){
    var self = this;
    return (self.viewport.y + e.clientY - $('.content').position().top);
  },

  start: function(){
    var self = this;
    this.brush = WaypointBrush;
    
    this.engine.clearColor = "#cccccc";
    this.engine.timer.duration = 10;
    this.selectedWaypoint = null;
    
    $("#files_to_open li").live("click", function(){
      $("#open_dialog").dialog("close");
      var li = $(this);
      var editor_stage = new EditorStage(li.data("data-file"));
      engine.stageManager.start(editor_stage);
    });
    
    $("#open_dialog").dialog({
      autoOpen: false,
      modal: true,
      width: 500,
      title: "Open file",
      height: 400,
      buttons: {
        "Open": function(){
          
        },
        
        "Cancel": function() {
          $(this).dialog("close");
        }
      }
    });
    
    $("#screen").mousedown(function(e){
      if(e.button != 2) {
        self.brush.mouseDown(self.tileX(e), self.tileY(e));
      }
      
    });
    
    $("#screen").live("mouseup", function(e){
      self.brush.mouseUp(self.tileX(e), self.tileY(e));
    });
    
    $("#screen").mousemove(function(e){
      self.brush.mouseMove(self.tileX(e), self.tileY(e));
    });
    
    
    $("#screen").rightClick(function(e) {
      self.brush.rightClick(self.tileX(e), self.tileY(e));
      self.brush.refresh();
    });
    
    $("#screen").click(function(e) {
      self.brush.click(self.tileX(e), self.tileY(e));
      self.brush.refresh();
    });
    
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
    
    $( "#save" ).click(function(){
      var data = {};
      data["waypoints"] = WaypointBrush.dump();
      
      var postData = $.param(data);
      
      $.post("/save", postData, function(){
        console.log("saved!");
      });
    });
    
		$( "#open" ).button({
			text: false,
			icons: {
				primary: "ui-icon-open"
			}
    });
    
    $( "#open" ).click(function(){
      $.get("/files", function(data) { 
        var data = JSON.parse(data);
        
        $("#files_to_open li").remove();
        $.each(data, function(){
          $("#files_to_open").append('<li data-file="'+this.url+'">'+this.name+'</li>');
        });
        $("#open_dialog").dialog("open");
      })
      
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
      file_name: this.file,
      viewport: this.viewport,
      onLoad: function(){
        $(window).trigger("resize");
        WaypointBrush.config(self);
        
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
    
    WaypointBrush.render();
  },
  
  end: function(){
    
  },
});
