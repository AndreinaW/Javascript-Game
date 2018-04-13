function Player(spritesheetSrc, pos_x, pos_y) {
    let SPRITE_WIDTH = 64;
    let SPRITE_HEIGHT = 64;
    let NB_POSTURES = 4;
    let NB_FRAMES_PER_POSTURE = 9;

    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.width = SPRITE_WIDTH;
    this.height = SPRITE_HEIGHT;
    this.speedX = 0;
    this.speedY = 0;
    this.move_speed = 5;
    this.on_the_ground = false;
    this.jumped = false;
    this.jump_speed =40;    
    this.currentDirection = 2;


    // Sprites attributes
    this.sprite_left = 1;   //row of spritesheet
    this.sprite_right = 3;  //row of spritesheet
    this.sprite_up = 0;
    this.sprite_front = 2;

    this.sprites = [];
    this.spritesheet = new Image();
    this.spritesheet.src = spritesheetSrc;
    

    this.draw = function(ctx) {
        ctx.save();
        this.sprites[this.currentDirection].draw(ctx, this.pos_x, this.pos_y, 1);
        ctx.restore();
    }


    // REVISAR
    this.move = function() {
        this.speedX = 0;
        this.speedY += 2;

        this.speedY = Math.min(this.speedY,10);
        
        this.currentDirection = this.sprite_front;

        if (inputStates.left) {
            this.speedX = -this.move_speed;
            this.currentDirection = this.sprite_left;
        }
        else if (inputStates.right) {
            this.speedX = this.move_speed;
            this.currentDirection = this.sprite_right;
        }
        else if (inputStates.up) {
            //this.pos_y-= 50;
            this.currentDirection = this.sprite_up;
        }

        this.pos_x += this.speedX;
        this.pos_y += this.speedY ;

        if(this.speedY > 0){
            this.speedY = 0;
            this.on_the_ground = true;
            this.jumped = false;            
        }
        else if(this.speedY < 0){
            this.speedY = 0;
        }
    }


    this.initSprites = function() {   
        // sprite extraction
        for(let i = 0; i < NB_POSTURES ; i++){
            sprite = new Sprite();
            sprite.extractSprites(this.spritesheet, NB_POSTURES, (i+1), NB_FRAMES_PER_POSTURE, SPRITE_WIDTH, SPRITE_HEIGHT);
            sprite.setNbImagesPerSecond(20);
            this.sprites[i] = sprite;
        }
    }
}