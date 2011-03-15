/**
 * @author Arkadiusz Buras
 */

Waypoint.Point = 0;
Waypoint.Path = 1;

Waypoint.parseCords = function (text) {
  var cords = text.split(":");
  if (cords.length == 2 ) {
    return { x: parseInt(cords[0]), y: parseInt(cords[1]) };
  } else {
    return { x: 0, y: 0 };
  }
}

function Waypoint(x,y) {
  this.x = x;
  this.y = y;
  this.cpx = 0;
  this.cpy = 0;
  this.children = [];
  this.parent = null;
  this.id = 0;
  this.name = "Watpoint";
  this.type = Waypoint.Point;
}

Waypoint.prototype.dump = function () {
  var out = {};
  out = $.extend(out, {
    x: this.x,
    y: this.y,
    control_point: {
      x: this.cpx,
      y: this.cpy,
    },
    id: this.id,
    name: this.name,
    type: this.type,
    children: []
  });
  
  
  for (var i=0; i < this.children.length; i++) {
    var waypoint = this.children[i];
    out["children"].push(waypoint.id);
  };
  
  if(this.parent) {
    out["parent"] = this.parent.id;
  }
  return out;
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
