/**
 * @author Arkadiusz Buras
 */

function Rect(x,y, width, height) {
  this.x = x;
  this.y = y;
  this.x2 = width + x;
  this.y2 = height + y;
  
}

Rect.prototype.in = function(sx,sy){
  return (this.x <= sx && sx <= this.x2) && (this.y <= sy && sy <= this.y2);
}
