function StageManager(context) {
  this.runningStage = null;
  this.context = context;
}

$.extend(StageManager.prototype, {
  start: function(stage){
    this.end();
    this.context.log("Starting Stage:");
    this.context.log(stage);
    this.runningStage = stage;
    this.runningStage.setup(this.context)
    this.runningStage.start();
  },
  
  stage: function(){
    return this.runningStage;
  },
  
  process: function(deltaTime){
    if (this.runningStage) {
      this.runningStage.process(deltaTime);
    }
  },
  
  end: function(){
    if (this.runningStage) {
      this.context.log("Ending Stage:");
      this.context.log(this.runningStage());
      this.runningStage.end();
    }
    this.runningStage = null;
  },
});