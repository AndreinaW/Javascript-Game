class Platform{
    constructor(posX, posY, width, height, type, src){
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.type = type;
        this.platform_skin = new Image();
        this.platform_skin.src = src;
    }


    draw(ctx){
        ctx.save();
        ctx.drawImage(this.platform_skin,this.posX,this.posY,this.width,this.height);
        ctx.restore();
    }
}