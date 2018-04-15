let PLATFORMS_SRC = {
    platform_1: "images/brick_custom_1.png",
    platform_2: "images/brick_custom_2.png"
}

class Platform{
    constructor(type, posX, posY, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.platform_skin = new Image();
        this.platform_skin.src = PLATFORMS_SRC[type];
    }


    draw(ctx){
        ctx.save();
        ctx.drawImage(this.platform_skin,this.posX,this.posY,this.width,this.height);
        ctx.restore();
    }
}