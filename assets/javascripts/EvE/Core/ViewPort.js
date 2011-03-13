function ViewPort (context) {
  this.context = context; // engine
  this.context.log("New ViewPort: "+["x:", this.x, "y:", this.y, "Size", this.width(), "x", this.height()].join(" "));
}

$.extend(ViewPort.prototype, {
  x: 0, //offset x
  y: 0, // offset y
  
  sprites: [],
  cached_sprites: [],
  
  layer_filter: null,
  prev_layer: 0,
  
  screenX: function(x){
    return x - this.x;
  },
  
  screenY: function(y){
    return y - this.y;
  },
  
  push: function(sprite){
    this.sprites.push(sprite);
  },
  
  width: function(){
    return this.context.width;
  },

  height: function(){
    return this.context.height;
  },  
  
  x2: function(){
    return this.x+this.width();
  },
  
  y2: function(){
    return this.y+this.height();
  },
    
  is_visible: function(sx,sy){
    return (this.x <= sx && sx <= this.x2()) && (this.y <= sy && sy <= this.y2());
  },
  
  visible_sprites: function(){
    var vs = [];
    var s = null;
    for (var i = this.sprites.length - 1; i >= 0; i--){
      s = this.sprites[i];
      
      if (this.is_visible(s.x, s.y) || this.is_visible(s.x2(), s.y2()) || this.is_visible(s.x2(), s.y) || this.is_visible(s.x, s.y2())) {
        vs.push(s);
      }
    };
    
    return vs.sort(function (a,b) {
      return b.z - a.z;
    });
  },
  
  process: function(deltaTime){    
    this.cached_sprites = this.visible_sprites();
    //this.context.context.globalAlpha = 0.2;
    for (var i = this.cached_sprites.length - 1; i >= 0; i--){      
      this.cached_sprites[i].update(deltaTime);
      this.cached_sprites[i].draw(this);
    };
    //this.context.context.globalAlpha = 1.0;
  },
  
});