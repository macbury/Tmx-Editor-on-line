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
  
  curvePoints: function(sx,sy,ex,ey, cpx1, cpy1, cpx2, cpy2, segments){
    var points = [];
    var t = 0.0;
    var x = 0.0;
    var y = 0.0;
    points.push({x: sx, y: sy});
    for(var i = 0; i <= segments; i++) {
        x = Math.pow(1 - t, 3) * sx + 3.0 * Math.pow(1 - t, 2) * t * cpx1 + 3.0 * (1 - t) * t * t * cpx2 + t * t * t * ex;
        y = Math.pow(1 - t, 3) * sy + 3.0 * Math.pow(1 - t, 2) * t * cpy1 + 3.0 * (1 - t) * t * t * cpy2 + t * t * t * ey;
        points.push({x: x, y: y});
        t += 1.0 / segments;
    }
    points.push({x: ex, py: ey});
    
    return points;
    
    /*this.context.beginPath();
    this.context.moveTo(sx, sy);
    this.context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, ex, ey);
    this.context.stroke();/*/
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