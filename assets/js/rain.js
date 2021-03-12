/*Downloaded from https://www.codeseek.co/worldofth/rain-with-animejs-GrQrWX */
function init_rain(){
    var canvas = document.querySelector('canvas');
    var buffer = document.createElement('canvas');
    var canvasCBR = canvas.getBoundingClientRect();
    
    canvas.width = canvasCBR.width;
    canvas.height = canvasCBR.height;
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    
    var ctx = canvas.getContext('2d');
    var bufferCtx = buffer.getContext('2d');
    var canvasHeight, canvasWidth;
    var animations = [];
    var numberOfDrops = 600;
    
    var createDrop = function(){
      var drop = {};
      drop.color = '#fff';
      drop.y = anime.random(0, canvas.height);
      drop.draw = function(context){
        context.globalAlpha = drop.alpha;
        context.beginPath();
        context.clearRect(drop.x, drop.y, drop.width, drop.height);
        if(drop.y > canvas.height){
          drop.y -= canvas.height;
          drop.update();
        }else{
          drop.y += drop.speed;
        }
        context.rect(drop.x, drop.y, drop.width, drop.height);
        context.fillStyle = drop.color;
        context.fill();
        context.globalAlpha = 1;
      }
      drop.update = function(){
        drop.x = anime.random(0, canvas.width);
        drop.width = anime.random(1, 2);
        drop.height = anime.random(5, 10);
        drop.alpha = anime.random(0.25, 1);
        drop.speed = anime.random(8, 12);
      }
      drop.update();
      return drop;
    };
    
    var getRainDrops = function(){
      var drops = [];
      for(var i = 0; i < numberOfDrops; i++){
        drops.push(createDrop());
      }
      return drops;
    };
    
    var rainDrops = getRainDrops();
    
    anime({
      targets: rainDrops,
      duration: Infinity,
      easing: 'linear',
      update: function(){
        rainDrops.forEach(function(drop){
          drop.draw(bufferCtx);
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(buffer, 0, 0);
      }
    });
  }