
function Environment(type) {
    let CLOUDS_SRC = "images/cloud.png";
    let BACKGROUND_SRC = {
        bckgd_1: "images/bg_lvl_1.png",
        bckgd_2: "images/background_2.png"
    }

    this.bg_skin = new Image();
    this.bg_skin.src = BACKGROUND_SRC[type];

    this.cloud_skin = new Image();
    this.cloud_skin.src = CLOUDS_SRC;
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