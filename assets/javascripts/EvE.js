function EvE (element_id) {
  this.context = $(element_id)[0].getContext("2d");
  this.width = $(element_id).width();
  this.height = $(element_id).height();
  this.setup();
  this.run();
}

$.extend(EvE.prototype, {
  timer: null,
  debug: false,
  frames: 0,
  stageManager: null,
  
  scale: 1.0,
  drawCall: 0,
  lastDrawCall: 0,
  
  clearColor: "#000",
  
  log: function(msg){
    if (this.debug && console != undefined) {
      console.log(msg);
    }
  },
  
  //setup main game thread
  setup: function(){
    this.log("Preparing Engine...");
    var self = this;
    self.stageManager = new StageManager(self);
    
    this.timer = new GameTimer(10, function (deltatime) {
      self.process(deltatime);
    });
    
    setInterval(function () {
      if (self.debug) {
        document.title = "EvE " + self.frames + " FPS, Draw: "+self.lastDrawCall;
        self.frames = 0;
      }
    }, 1000);
    
  },
  
  run: function(){
    this.log("Starting Engine...");
    this.timer.tick();
  },
  
  process: function(deltaTime){
    this.clearRect(0,0, this.width, this.height);
    this.fillRect(this.clearColor, 0,0, this.width, this.height);
    
    this.stageManager.process(deltaTime);
    this.lastDrawCall = this.drawCall;
    this.drawCall = 0;
    this.frames += 1;
  },
});