/**
 * @author Arkadiusz Buras
 */

Waypoint.Point = 0;
Waypoint.Path = 1;

function Waypoint(x,y) {
  this.x = x;
  this.y = y;
  this.cpx = 0;
  this.cpy = 0;
  this.children = [];
  this.parent = null;
  this.id = 0;
  this.name = "W";
  this.type = Waypoint.Point;
}

Waypoint.prototype.addChild = function (waypoint) {
  waypoint.parent = this;
  this.children.push(waypoint);
}

Waypoint.prototype.havePath = function() {
  var have = false;
  
  for (var i=0; i < this.children.length; i++) {
    if (this.children[i].type == Waypoint.Path) {
      have = true;
      break;
    };
  }
  /*
  if (this.parent && this.parent.type == Waypoint.Path) {
    have = true;
  };*/
  
  if (this.type == Waypoint.Path) {
    have = true;
  };
  
  return have;
}
