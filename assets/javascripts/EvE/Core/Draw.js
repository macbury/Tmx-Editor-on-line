$.extend(EvE.prototype, {
  
  clearRect: function(x,y, width, height){
    this.context.clearRect(x,y, width, height);
    this.drawCall += 1;
  },
  
  fillRect: function(color, x,y, width, height){
    this.context.fillStyle = color;
    this.context.fillRect(x,y, width, height);
    this.drawCall += 1;
  },
  
  drawImage: function(image, x,y, width, height){
    if (this.scale != 1.0) {
      width = width * this.scale;
      height = height * this.scale;
      x = x * this.scale;
      y = y *this. scale;
    };
    this.context.drawImage(image, x, y, width, height);
    this.drawCall += 1;
  },
  
  cropAndDrawImage: function(image, sx, sy, sWidth, sHeight, x, y, width, height){
    if (this.scale != 1.0) {
      width = width * this.scale;
      height = height * this.scale;
      x = x * this.scale;
      y = y * this.scale;
    }
    this.context.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
    this.drawCall += 1;
  },
  
  drawCurve: function(color, width,sx,sy,ex,ey, cpx1, cpy1, cpx2, cpy2){
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(sx, sy);
    this.context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, ex, ey);
    this.context.stroke();
  },
  
  drawLinePath: function(color, width, points){
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
    this.context.beginPath();
    for (var i=0; i < points.length; i++) {
      if (i == 0) {
        this.context.moveTo(points[i].x, points[i].y);
      } else{
        this.context.lineTo(points[i].x, points[i].y);
      }      
    }
    this.context.stroke();
    this.drawCall += 1;
  },
});