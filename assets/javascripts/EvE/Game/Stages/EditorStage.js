function EditorStage () {
  
}

$.extend(EditorStage.prototype, Stage.prototype);
$.extend(EditorStage.prototype, {
  waypoints: [],
  start: function(){
    var self = this;    
    this.waypoints = [];
    this.engine.clearColor = "#cccccc";
    this.engine.timer.duration = 10;
    this.selectedWaypoint = null;
    $("#screen").rightClick(function(e) {
      var x = parseInt((self.viewport.x + e.clientX - $('.content').position().left) / self.map.tile_size);
      var y = parseInt((self.viewport.y + e.clientY - $('.content').position().top) / self.map.tile_size);
      var px = x * self.map.tile_size;
      var py = y * self.map.tile_size;
      
      for (var i=0; i < self.waypoints.length; i++) {
        var w = self.waypoints[i];
        if (w.x == px && w.y == py) {
          self.selectedWaypoint.addChild(w);
          self.waypoints.push(w);
          break;
        }
      };
    });
    
    $("#screen").click(function(e) {

        var x = parseInt((self.viewport.x + e.clientX - $('.content').position().left) / self.map.tile_size);
        var y = parseInt((self.viewport.y + e.clientY - $('.content').position().top) / self.map.tile_size);
        
        var px = x * self.map.tile_size;
        var py = y * self.map.tile_size;
        
        var haveSelectedWaypoint = false;
        
        for (var i=0; i < self.waypoints.length; i++) {
          var w = self.waypoints[i];
          if (w.x == px && w.y == py) {
            self.selectedWaypoint = w;
            haveSelectedWaypoint = true;
            break;
          }
        };
        
        if (!haveSelectedWaypoint) {
          var waypoint = new Waypoint(px,py);
          waypoint.id = self.waypoints.length;
          if (self.selectedWaypoint) {
            self.selectedWaypoint.addChild(waypoint);
          };
          self.selectedWaypoint = waypoint;
          window.location.hash = "waypoint_"+self.selectedWaypoint.id;
          self.waypoints.push(waypoint);
          $('#waypoints').append("<li id='"+"waypoint_"+self.selectedWaypoint.id+"'>Waypoint "+waypoint.id+"</li>");

        }
        console.log(x +', '+ y);
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
    
    for (var i=0; i < this.waypoints.length; i++) {
      var waypoint = this.waypoints[i];
      var wayColor = "red";
      
      if ((this.selectedWaypoint.x == waypoint.x && this.selectedWaypoint.y == waypoint.y)) {
        wayColor = "blue";
      } else {
        wayColor = "green";
      }
      /*
      if (waypoint.parent) {
        this.engine.drawLinePath(wayColor, 2, [
          { x: this.viewport.screenX(waypoint.parent.x+16), y: this.viewport.screenY(waypoint.parent.y+16) },
          { x: this.viewport.screenX(waypoint.x+16), y: this.viewport.screenY(waypoint.y+16) }
        ]);
      }*/

      this.engine.fillRect(wayColor,  this.viewport.screenX(waypoint.x+12),  this.viewport.screenY(waypoint.y+12), 8,8);
      
      for (var a=0; a < waypoint.children.length; a++) {
        var child = waypoint.children[a];
        
        this.engine.drawLinePath(wayColor, 2, [
          { x: this.viewport.screenX(child.x+16), y: this.viewport.screenY(child.y+16) },
          { x: this.viewport.screenX(waypoint.x+16), y: this.viewport.screenY(waypoint.y+16) }
        ]);
        
        this.engine.fillRect(wayColor,  this.viewport.screenX(child.x+12),  this.viewport.screenY(child.y+12), 8,8);
      };
    };
  },
  
  end: function(){
    
  },
});
