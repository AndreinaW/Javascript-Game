class Player{
    constructor(skins,width,heigth,pos_x,pos_y){
        this.skins = skins;
        this.width = width;
        //for precise, because character is a little bit smaller then the image PNG
        //for width and posX +-15
        this.height = heigth;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.speedX = 0;
        this.speedY = 0;
        this.on_the_ground = false;
        this.jumped = false;
        this.jump_speed =40;
        this.moove_speed =5;
    }
    draw(){
    // check inputStates
        this.speedX = 0;
        this.speedY +=2;
        var last_pos_y = this.pos_y;
        this.speedY=Math.min(this.speedY,10);
        currentDirection = DIR_FRONT;
        if (inputStates.left) {
            this.speedX = -this.moove_speed;
            currentDirection = DIR_LEFT;
        }
        if (inputStates.right) {
            this.speedX = this.moove_speed;
            currentDirection = DIR_RIGHT;
        }
        if (inputStates.up) {
            //this.pos_y-= 50;
            currentDirection = DIR_UP;
        }

        this.pos_x += this.speedX;
        this.pos_y += this.speedY ;

        if(this.speedY > 0){
            this.speedY = 0;
            this.on_the_ground = true;
            if(this.jumped){
                this.jumped = false;
            }
        }
        if(this.speedY < 0){

            this.speedY = 0;
        }


        player_skins[currentDirection].draw(ctx_interface, this.pos_x, this.pos_y, 1);
    
    }
}