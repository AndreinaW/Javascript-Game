class Sprite{
    constructor(){
        this.sprite_array = [];
        this.current_frame = 0;
        this.delay_between_frames = 10;
        this.then = performance.now();
        this.totalTimeSinceLastRedraw = 0;
    }

    extractSprites(spritesheet,nb_postures,posture_to_extract,nb_frames_per_posture,
        sprite_width, sprite_height) {
        // number of sprites per row in the spritesheet
        var nb_sprites_per_row = Math.floor(spritesheet.width / sprite_width);

        var start_index = (posture_to_extract-1) * nb_frames_per_posture;
        var end_index = start_index + nb_frames_per_posture;
        
        for(var index = start_index; index < end_index; index++) {
            // Computation of the x and y position that corresponds to the sprite
            // index
            // x is the rest of index/nbSpritesPerRow * width of a sprite
            var x = (index % nb_sprites_per_row) * sprite_width;
            // y is the divisor of index by nbSpritesPerRow * height of a sprite
            var y = Math.floor(index / nb_sprites_per_row) * sprite_height;
      
            // build a spriteImage object
            var s = new SpriteImage(spritesheet, x, y, sprite_width, sprite_height);
      
            this.sprite_array.push(s);
        }

    }
    draw(ctx, x, y){
        // Use time based animation to draw only a few images per second
        var now = performance.now();
        var delta = now - this.then;
        
        // draw currentSpriteImage
        var current_sprite_image = this.sprite_array[this.current_frame];
        // x, y, scale. 1 = size unchanged
        current_sprite_image.draw(ctx, x, y, 1);
        
        // if the delay between images is elapsed, go to the next one
        if (this.totalTimeSinceLastRedraw > this.delay_between_frames) {
           // Go to the next sprite image
          this.current_frame++; 
          this.current_frame %=  this.sprite_array.length;
          
          // reset the total time since last image has been drawn
          this.totalTimeSinceLastRedraw = 0;
        } else {
          // sum the total time since last redraw
         this. totalTimeSinceLastRedraw += delta;
        }
        
        this.then = now;
      }
      
    setNbImagesPerSecond(nb){
        // elay in ms between images
        this.delay_between_frames = 1000 / nb;
      };
}

// ------------------------
// Sprite utility functions
// ------------------------
function SpriteImage(img, x, y, width, height) {
    this.img = img;  // the whole image that contains all sprites
    this.x = x;      // x, y position of the sprite image in the whole image
    this.y = y;
    this.width = width;   // width and height of the sprite image
    this.height = height;
    // xPos and yPos = position where the sprite should be drawn,
    // scale = rescaling factor between 0 and 1
    this.draw = function(ctx_interface, xPos, yPos, scale) {
        ctx_interface.drawImage(this.img,
                     this.x, this.y, // x, y, width and height of img to extract
                     this.width, this.height,
                     xPos, yPos,     // x, y, width and height of img to draw
                     this.width*scale, this.height*scale);
    };
 }
 