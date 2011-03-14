/**
 * @author Arkadiusz Buras
 */

Waypoint.Point = 0;
Waypoint.Path = 1;

function Waypoint(x,y) {
  this.x = x;
  this.y = y;
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