let HEART_SRC = {
    heart_full: "images/heart.png",
    heart_empty: "images/heart_lost.png"
}

function Player(spritesheetSrc, pos_x, pos_y) {
    let SPRITE_WIDTH = 36;
    let SPRITE_HEIGHT = 36;
    let NB_POSTURES = 4;
    let NB_FRAMES_PER_POSTURE = 3;
    let MAX_LIFE = 3;
    this.extra_space_left = 6;//free space from left of player image
    this.extra_space_right = 12;//free space from right of player image

    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.width = SPRITE_WIDTH - this.extra_space_right;//real width of player
    this.height = SPRITE_HEIGHT;
    this.speedX = 0;
    this.speedY = 0;
    this.life = MAX_LIFE;
    this.move_speed = 4;
    this.on_the_ground = false;
    this.jumped = false;
    this.jump_speed = 10; 
    this.move_dir = {};
    
    this.life_heart = {
        full: new Image(),
        empty: new Image()
    }
    this.life_heart.full.src = HEART_SRC.heart_full;
    this.life_heart.empty.src = HEART_SRC.heart_empty;


    // Sprites attributes
    this.sprite_left = 1;   //row of spritesheet
    this.sprite_right = 2;  //row of spritesheet
    this.sprite_up = 3;
    this.sprite_front = 0;

    this.sprites = [];
    this.spritesheet = new Image();
    this.spritesheet.src = spritesheetSrc;
    this.current_sprite = this.sprite_front;
    
    this.reset = function(pos_x, pos_y) {      
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.speedX = 0;
        this.speedY = 0;
        this.life = MAX_LIFE;
        this.on_the_ground = false;
        this.jumped = false;
        this.jump_speed = 10;

        this.current_sprite = this.sprite_front;
    }

    this.draw = function(ctx) {
        ctx.save();
        this.sprites[this.current_sprite].draw(ctx, this.pos_x, this.pos_y, 1);
        ctx.restore();
    }


    this.drawHearts = function(ctx) {
        let x = 0;
        ctx.save();
        for(let i = 0; i < MAX_LIFE ; i++) {
            if(i < this.life) {
                ctx.drawImage(this.life_heart.full, x, 0);
            } else {
                ctx.drawImage(this.life_heart.empty, x, 0);
            }             
            x += 20;
        }        
        ctx.restore();
    }


    this.move = function() 
    {    
        // default. He is always falling
        this.speedX = 0;
        this.speedY += 1;
        this.current_sprite = this.sprite_front;

        this.speedY = Math.min(this.speedY, 2*this.move_speed);   // to make the descent slower

        if (this.move_dir.left) {
            this.speedX = -this.move_speed;
            this.current_sprite = this.sprite_left;
        }
        if (this.move_dir.right) {
            this.speedX = this.move_speed;
            this.current_sprite = this.sprite_right;
        }
        if (this.move_dir.up) {
            this.speedY  = -this.jump_speed;
            this.current_sprite = this.sprite_up;
            this.move_dir.up = false;   // in case they leave the key pressed       
        }
        
        this.pos_x += this.speedX;
        this.pos_y += this.speedY;

        /*if(this.speedY > 0) {
            this.speedY = 0;
        }*/
    }


    this.initSprites = function() {   
        // sprite extraction
        for(let i = 0; i < NB_POSTURES ; i++){
            sprite = new Sprite();
            sprite.extractSprites(this.spritesheet, NB_POSTURES, (i+1), NB_FRAMES_PER_POSTURE, 
                                    SPRITE_WIDTH, SPRITE_HEIGHT,this.extra_space_left,this.extra_space_right);
            sprite.setNbImagesPerSecond(10);
            this.sprites[i] = sprite;
        }
    }


    this.decreaseLife = function() {
        this.life--;
    }

    this.setDead = function() {
        this.life = 0;
    }

    this.isDead = function() {
        return this.life === 0;
    }
}