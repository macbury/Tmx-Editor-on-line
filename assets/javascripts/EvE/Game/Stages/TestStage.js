var TestStage = {
  context: null,
  viewport: null,
  
  start: function(context){
    var self = this;
    this.context = context;
    this.viewport = new ViewPort(this.context);
    
    $("#screen").mousedown(function (event) {
      $(this)
      .data('down', true)
          .data('x', event.clientX)
						.data('y', event.clientY)
          .data('scrollLeft', self.viewport.x)
						.data('scrollTop', self.viewport.y);
      return false;
      }).mouseup(function (event) {
  			$(this).data('down', false).css('cursor', 'default');
      }).mousemove(function (event) {
        if ($(this).data('down') == true) {
  				self.viewport.x = $(this).data('scrollLeft') + $(this).data('x') - event.clientX;
  				self.viewport.y = $(this).data('scrollTop') + $(this).data('y') - event.clientY;
        }
        
  			//console.log("x: "+Math.round(event.pageX/(32*engine.map.actual_scale))+ " y:"+Math.round(event.pageY/(32*engine.map.actual_scale)));
      }).mouseleave(function (event) {
    	 $(this).data('down', false);
    });
    
    for (var x=0; x < 100; x++) {
      for (var y=0; y < 100; y++) {        
        this.viewport.push(new Sprite({
          x: x * 32,
          y: y * 32,
          file_name: "images/cross.png",
          z: 0
        }));
      }
      
    };
    
    for (var i=0; i < 20; i++) {
      var warrior = new Sprite({
      x: i*32,
      y: 32,
      width: 32,
      height: 32,
      sWidth: 32,
      sHeight: 32,
      file_name: "images/warrior.png",
      z: 1,
      animation: "down",
      delay: 150,
      animations: {
        down: [1,0,1,2],
        left: [4,3,4,5],
        right: [7,6,7,8],
        up: [10,9,10,11]
      }
    });
    
    this.viewport.push(warrior);
    };
  },
  
  update: function(deltaTime){
    
  },
  
  render: function(deltaTime){
    this.viewport.process(deltaTime);
  },
  
  end: function(){
    
  },
}