
class Environment {
    constructor(bg_skin_src,clouds_src) {
        this.bg_skin = new Image();
        this.bg_skin.src = bg_skin_src;

        this.cloud_skin = new Image();
        this.cloud_skin.src = clouds_src;

        this.speed = 0.3;
        this.x = 0;
        this.y = 0;
        
    }
    draw(ctx_interface) {
            ctx_interface.save();
            ctx_interface.drawImage(this.bg_skin,0,0,canvas_interface.width,canvas_interface.height);

            ctx_interface.drawImage(this.cloud_skin,this.x-canvas_interface.width/2,this.y,canvas_interface.width/2,canvas_interface.height/2);
            ctx_interface.drawImage(this.cloud_skin,this.x-canvas_interface.width - canvas_interface.width/2,this.y,canvas_interface.width,canvas_interface.height);
            ctx_interface.restore();
    }
    move(){
        this.x +=this.speed;
            if (this.x >= canvas_interface.width*2+canvas_interface.width/2 ){
            this.x = 0;
        }
    }
  }

  
  //QWEqwe!23