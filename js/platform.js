class Platform{
    constructor(posX, posY, width, height, type){
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.type = type;
        this.platform_skin = new Image();
    }


    draw(ctx){
        ctx.save();
        switch (this.type) {
            case "custom_1":
                this.platform_skin.src = "images/brick_custom_1.png";
                break;
            case ("custom_2"):
                this.platform_skin.src = "images/brick_custom_2.png";
                break;
            default:
                break;
        }
        ctx.drawImage(this.platform_skin,this.posX,this.posY,this.width,this.height);
        ctx.restore();
    }
}