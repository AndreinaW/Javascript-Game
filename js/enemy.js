function Enemy(spritesheetSrc, pos_x, pos_y) {
    let SPRITE_WIDTH = 48;
    let SPRITE_HEIGHT = 48;
    let NB_POSTURES = 4;
    let NB_FRAMES_PER_POSTURE = 3;

    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.width = SPRITE_WIDTH;
    this.height = SPRITE_HEIGHT;
    this.move_speed = 0.1;
    this.speedX = this.move_speed;
    this.speedY = 0;
    this.live = 2;
    

    // Sprites attributes
    this.sprite_left = 1;   //row of spritesheet
    this.sprite_right = 2;  //row of spritesheet
    this.sprite_up = 3;
    this.sprite_front = 0;

    this.sprites = [];
    this.spritesheet = new Image();
    this.spritesheet.src = spritesheetSrc;
    this.current_sprite = this.sprite_front;
    

    this.draw = function(ctx) {
        ctx.save();
        this.sprites[this.current_sprite].draw(ctx, this.pos_x, this.pos_y, 1);
        ctx.restore();
    }


    this.move = function() {            
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
            sprite.extractSprites(this.spritesheet, NB_POSTURES, (i+1), NB_FRAMES_PER_POSTURE, SPRITE_WIDTH, SPRITE_HEIGHT);
            sprite.setNbImagesPerSecond(3);
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