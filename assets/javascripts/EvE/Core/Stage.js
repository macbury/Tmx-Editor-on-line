function Stage () {}

$.extend(Stage.prototype, {
  engine: null,
  viewport: null,
  
  start: function(){},
  update: function(deltaTime) {},
  render: function(deltaTime) {},
  
  setup: function(engine){
    if (this.engine == null) {
      this.engine = engine;
      this.viewport = new ViewPort(this.engine)
    };
  },
  
  process: function(deltaTime){
    this.update(deltaTime);
    this.viewport.process(deltaTime);
    this.render(deltaTime);
  },
  
  end: function(){
    
  },
});