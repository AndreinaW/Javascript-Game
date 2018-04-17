let ENEMIES_SRC = {
    enemy_1: "images/enemy_1.png",
    enemy_2: "images/enemy_2.png",
    enemy_3: "images/enemy_3.png",
    enemy_4: "images/enemy_4.png"
}


function Enemy(type, pos_x, pos_y ,max_x,extra_space_left,extra_space_right) {
    let SPRITE_WIDTH = 36;
    let SPRITE_HEIGHT = 36;
    let NB_POSTURES = 4;
    let NB_FRAMES_PER_POSTURE = 3;

    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.max_x = max_x;
    this.min_x = pos_x;
    this.width = SPRITE_WIDTH - extra_space_right;//real width of enemy without right free space of img
    this.height = SPRITE_HEIGHT;
    this.move_speed = 2;
    this.speedX = this.move_speed;
    this.speedY = 0;
    this.live = 2;

    this.extra_space_left = extra_space_left;
    this.extra_space_right = extra_space_right;

    // Sprites attributes
    this.sprite_left = 1;   //row of spritesheet
    this.sprite_right = 2;  //row of spritesheet
    this.sprite_up = 3;
    this.sprite_front = 0;

    this.sprites = [];
    this.spritesheet = new Image();
    this.spritesheet.src = ENEMIES_SRC[type];
    this.current_sprite = this.sprite_left;
    

    this.draw = function(ctx) {
        ctx.save();
        this.sprites[this.current_sprite].draw(ctx, this.pos_x, this.pos_y, 1);
        ctx.restore();
    }


    this.move = function() {
        if(this.pos_x > this.max_x){
            this.speedX = -this.speedX;
            this.pos_x = this.max_x ;
        }  
        else if(this.pos_x < this.min_x){
            this.speedX = -this.speedX;
            this.pos_x = this.min_x;
        }        
        this.pos_x += this.speedX;
        this.pos_y += this.speedY;

        if(this.speedX > 0){
            this.current_sprite = this.sprite_right;
        } else {
            this.current_sprite = this.sprite_left;
        }
    }


    this.initSprites = function() {   
        // sprite extraction
        for(let i = 0; i < NB_POSTURES ; i++){
            sprite = new Sprite();
            sprite.extractSprites(this.spritesheet, NB_POSTURES, (i+1), NB_FRAMES_PER_POSTURE, SPRITE_WIDTH, SPRITE_HEIGHT,
                                    this.extra_space_left,this.extra_space_right);
            sprite.setNbImagesPerSecond(8);
            this.sprites[i] = sprite;
        }
    }


    this.decreaseLive = function() {
        this.live--;
    }


    this.isDead = function() {
        return this.live === 0;
    }
}