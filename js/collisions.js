let extra_sprite_space_right= 27;
let extra_sprite_space_left = 13;
let extra_sprite_space_down  =15;

function testCollisions() {
    testWallCollisions(player);
}

function testWallCollisions(r) {
    // left and right wall collision
    if((r.pos_x + r.width - extra_sprite_space_right) > canvas.width) {
        r.speedX = -r.speedX;
        r.pos_x = canvas.width - r.width + extra_sprite_space_right;
    }
    else if((r.pos_x + extra_sprite_space_left) < 0){
        r.speedX = -r.speedX;
        r.pos_x = -extra_sprite_space_left;
    }

    // up and down collision
    if((r.pos_y + r.height -extra_sprite_space_down) > canvas.height) {
        r.speedY = -r.speedY;
        r.pos_y = canvas.height - r.height +extra_sprite_space_down;
    }
    else if(r.pos_y < 0){
        r.speedY = -r.speedY;
        r.pos_y = 0;
    }
}