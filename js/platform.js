
function Platform(type, posX, posY, width, height) {
    let PLATFORMS_SRC = {
        platform_1: "images/brick_custom_1.png",
        platform_2: "images/brick_custom_2.png",
        platform_3: "images/platform_1.png",
        platform_4: "images/platform_1.1.png",
        platform_5: "images/platform_3.png",
        platform_6: "images/platform_4.png",
    }

    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.platform_skin = new Image();
    this.platform_skin.src = PLATFORMS_SRC[type];

    this.draw = function(ctx) {
        ctx.save();
        ctx.drawImage(this.platform_skin,this.posX,this.posY,this.width,this.height);
        ctx.restore();
    }

}