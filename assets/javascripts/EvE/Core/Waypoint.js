/**
 * @author Arkadiusz Buras
 */

function Waypoint(x,y) {
  this.x = x;
  this.y = y;
  this.children = [];
  this.parent = null;
}

Waypoint.prototype.addChild = function (waypoint) {
  waypoint.parent = this;
  this.children.push(waypoint);
}