function Sprite (options) {
  $.extend(this, options);
  this.load_image();
}

$.extend(Sprite.prototype, {
  image: null,
  x: 0,
  y: 0,
  z: 0,
  width: 0,
  height: 0,
  file_name: null,
  
  sx: null,
  sy: null,
  sWidth: null,
  sHeight: null,
  
  frameIndex: 0,
  previousIndex: 0,
  animation: null,
  animations: null,
  frames: [], 
  animate: false,
  
  delay: 100,
  dt: 0,
  
  x2: function(){
    return this.x + this.width;
  },
  
  y2: function(){
    return this.y + this.height;
  },
  
  load_image: function(){
    var self = this;
    if (this.file_name) {
      var img = new Image();
      img.onload = function () {
        self.image = img;
        
        if (self.width == 0 || self.height == 0) {
          self.width = img.width;
          self.height = img.height;
        }        
        
        if (self.animations) {
          var tilesX = Math.round(img.width / self.sWidth);
          var tilesY = Math.round(img.height / self.sHeight);
          
          for (var y=0; y < tilesY; y++) {
            for (var x=0; x < tilesX; x++) {
              self.frames.push({
                x: x * self.sWidth,
                y: y * self.sHeight
              });
            };
          };
        }
        
      };
      
      img.src = this.file_name;
    }
  },
  
  play: function(animation){
    if (animation) {
      this.animation = animation;
    }
    this.animate = true;
  },
  
  stop: function(){
    this.animate = false;
    this.frameIndex = 0;
  },
  
  update: function(deltaTime){
    if (this.animations && this.animate) {
      this.dt += deltaTime;
      if (this.dt > this.delay) {
        this.dt = 0;
        this.previousIndex = this.frameIndex;
        this.frameIndex += 1;
        
        if (this.frameIndex >= this.animations[this.animation].length || this.frameIndex < 0) {
          this.frameIndex = 0;
        }
      };
    };
  },
  
  currentFrame: function(){
    return this.frames[this.animations[this.animation][this.frameIndex]];
  },
  
  draw: function(viewport){
    if (this.image) {
      if (this.sx != null || this.sy != null) {
        viewport.context.cropAndDrawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, viewport.screenX(this.x), viewport.screenY(this.y), this.width, this.height);
      } else if (this.animations == null) {
        viewport.context.drawImage(this.image, viewport.screenX(this.x), viewport.screenY(this.y), this.width, this.height);
      } else {
        viewport.context.cropAndDrawImage(this.image, this.currentFrame().x, this.currentFrame().y, this.sWidth, this.sHeight, viewport.screenX(this.x), viewport.screenY(this.y), this.width, this.height);
      }
    }
  },
});