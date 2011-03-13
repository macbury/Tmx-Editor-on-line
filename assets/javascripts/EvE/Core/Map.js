function Map (options) {
  $.extend(this, options);
  this.load();
}

$.extend(Map.prototype, {
  viewport: null,
  file_name: null,
  content: null,
  chipsets: {},
  tilesets: {},
  
  tiles: {},
  rows: 0,
  columns: 0,
  tile_size: 32,
  
  onLoad: function(){},
  
  load: function(){
    var self = this;
    $.ajax({
      type: "GET",
      url: self.file_name,
      dataType: "xml", 
      success: function(data){
        self.parse_map(data);
        self.onLoad();
      },
    });
  },
  
  width: function(){
    return this.columns * this.tile_size;
  },
  
  height: function(){
    return this.rows * this.tile_size;
  },
  
  
  parse_map: function(data){
    this.content = $(data).find("map");
    var self = this;
    this.rows = parseInt(this.content.attr("width"));
    this.columns = parseInt(this.content.attr("height"));
    this.tile_size = parseInt(this.content.attr("tilewidth"));
    this.content.find("tileset").each(function () {
      var chipset_id = $(this).attr("name");
      self.chipsets[chipset_id] = new Chipset({
        data: $(this),
        map: self,
        onLoad: function(){self.load_layers();},
      });
    });
    
    
  },
  
  load_layers: function(){
    var self = this;
    var layers = this.content.find("layer");
    layers.each(function(z, element){
      var layer = $(element);
      var data = layer.find("data");
      
      if (data.attr("encoding") == "base64") {
        var tiles_gids = stringToBytes(Base64.decode(data.text()));
        
        var i = 0;
        for (var row=0; row < self.rows; row++) {
          for (var column=0; column < self.columns; column++) {
            var tile_id =  tiles_gids[i] | tiles_gids[i + 1] << 8 | tiles_gids[i+2] << 16 | tiles_gids[i+3] << 24;
            //console.log("GID: "+ tile_id);
            var tile = self.tilesets[tile_id].get_sprite(tile_id, column*self.tile_size, row*self.tile_size, z);
          
            self.viewport.push(tile);
          };
        };

      }
    });
  },
  
  load_tiles_for_chipset: function(chipset_id){
    var self = this;
    var chipset = this.chipsets[chipset_id]
    $.each(this.content.find("layer"), function () {
      var layer = $(this);
      var zindex = layer.attr("zindex");
      layer.find("tile[chipset_id="+chipset_id+"]").each(function () {
        var tile = chipset.get_sprite($(this).attr("id"), $(this).attr("x"), $(this).attr("y"), zindex);        
        if (self.tiles[zindex] == null) {
          self.tiles[zindex] = [];
        };
        self.tiles[zindex].push(tile);
        self.viewport.push(tile);
      });
    });
  },
});