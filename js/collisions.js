let extra_sprite_space = 15;

function testCollisions() {
    testWallCollisions(player);
}

function testWallCollisions(r) {
    // left and right wall collision
    if((r.pos_x + r.width - extra_sprite_space) > canvas.width) {
        r.speedX = -r.speedX;
        r.pos_x = canvas.width - r.width + extra_sprite_space;
    }
    else if((r.pos_x + extra_sprite_space) < 0){
        r.speedX = -r.speedX;
        r.pos_x = -extra_sprite_space;
    }

    // up and down collision
    if((r.pos_y + r.height) > canvas.height) {
        r.speedY = -r.speedY;
        r.pos_y = canvas.height - r.height;
    }
    else if(r.pos_y < 0){
        r.speedY = -r.speedY;
        r.pos_y = 0;
    }
}