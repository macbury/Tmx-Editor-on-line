function GameObject (options) {
  $.extend(this, options);
}

$.extend(GameObject.prototype, {
  width: 32,
  height: 32,
  x: 0,
  y: 0,
  z: 0,
});