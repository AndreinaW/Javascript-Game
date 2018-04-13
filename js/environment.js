function Environment(bg_skin_src, clouds_src) {
    this.bg_skin = new Image();
    this.bg_skin.src = bg_skin_src;

    this.cloud_skin = new Image();
    this.cloud_skin.src = clouds_src;
    this.speed = 0.3;
    this.x = 0;
    this.y = 0; 
        

    this.draw = function(ctx) {
        ctx.save();
        ctx.drawImage(this.bg_skin,0,0,canvas.width,canvas.height);

        ctx.drawImage(this.cloud_skin,this.x-canvas.width/2,this.y,canvas.width/2,canvas.height/2);
        ctx.drawImage(this.cloud_skin,this.x-canvas.width - canvas.width/2,this.y,canvas.width,canvas.height);
        ctx.restore();
    }
    

    this.move = function(){
        this.x +=this.speed;
            if (this.x >= canvas.width*2+canvas.width/2 ){
            this.x = 0;
        }
    }
}