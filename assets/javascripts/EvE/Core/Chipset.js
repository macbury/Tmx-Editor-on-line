function Chipset (options) {
  var self = this;
  $.extend(this, options);
  this.firstGid = parseInt(this.data.attr("firstgid"));
  this.tileWidth = parseInt(this.data.attr("tilewidth"));
  this.tileHeight = parseInt(this.data.attr("tileheight"));
  this.load();
}

$.extend(Chipset.prototype, {
  image: null,
  tiles: {},
  data: null,
  width: 0,
  height: 0,
  tileWidth: null,
  tileHeight: null,
  firstGid: 0,
  map: null,
  prefix: "/tilesets/",
  
  load: function(){
    var image = new Image();
    var self = this;
    image.onload = function () {
      self.image = image;
      self.width = image.width;
      self.height = image.height;
      self.build_tiles();
      self.onLoad();
    }
    this.width = parseInt(this.data.find("image").attr("width"));
    this.height = parseInt(this.data.find("image").attr("height"));
    image.src = this.prefix + this.data.find("image").attr("source");
  },
  
  build_tiles: function(){
    var columns = Math.round(this.width / this.tileWidth);
    var rows = Math.round(this.height / this.tileHeight);
    
    var i = this.firstGid;
    for (var row=0; row < rows; row++) {
      for (var column=0; column < columns; column++) {
        this.tiles[i] = { x: column * this.tileWidth, y: row * this.tileHeight };
        this.map.tilesets[i] = this;
        i += 1;
      };
    };    
  },
  
  get_sprite: function(tile_id, x,y, z){
    var tile = this.tiles[tile_id];
    return new Sprite({
      image: this.image,
      width: this.tileWidth,
      height: this.tileHeight,
      sx: tile.x,
      sy: tile.y,
      x: parseInt(x),
      y: parseInt(y),
      z: parseInt(z),
      sWidth: this.tileWidth,
      sHeight: this.tileHeight,
    });
  },
});