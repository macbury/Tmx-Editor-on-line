function GameTimer (duration, callback) {
  this.duration = duration;
  this.callback = callback;
  this.lastTick = new Date();
}

$.extend(GameTimer.prototype, {
  context: null,
  lastTick: 0,
  callback: null,
  
  tick: function(){
    var self = this;
    var endTime = new Date();
    var deltaTime = endTime - this.lastTick;
    this.lastTick = endTime;
    
    this.callback(deltaTime);
    this.context = setTimeout(function () {
      self.tick();
    }, this.duration);
  },
});