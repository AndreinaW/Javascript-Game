let extra_sprite_space = 15;    // IF THIS HAPPENSE WITH THE ENEMIES IT SHOULD BE CHANGED AND PUT AS AN ATTRIBUTE OF THE CLASS


function testCollisions() {
    testWallCollisionsPlayer(player);
}


function testWallCollisions(r) {
    // right wall
    if((r.pos_x + r.width - extra_sprite_space) > canvas.width) {
        r.speedX = -r.speedX;
        r.pos_x = canvas.width - r.width + extra_sprite_space;
    }
    // left wall
    else if((r.pos_x + extra_sprite_space) < 0){
        r.speedX = -r.speedX;
        r.pos_x = -extra_sprite_space;
    }

    // down wall
    if((r.pos_y + r.height) > canvas.height) {
        r.speedY = -r.speedY;
        r.pos_y = canvas.height - r.height;
    }
    // up wall
    else if(r.pos_y < 0){
        r.speedY = -r.speedY;
        r.pos_y = 0;
    }
}


function testWallCollisionsPlayer(player) {
    // right wall
    if((player.pos_x + player.width - extra_sprite_space) > canvas.width) {
        player.speedX = 0;
        player.pos_x = canvas.width - player.width + extra_sprite_space;
    }
    // left wall
    else if((player.pos_x + extra_sprite_space) < 0){
        player.speedX = 0;
        player.pos_x = -extra_sprite_space;
    }

    // down wall
    if((player.pos_y + player.height) > canvas.height) {
        player.speedY = 0;
        player.pos_y = canvas.height - player.height;
        player.on_the_ground = true;
        player.jumped = false;    
    }
    // up wall
    else if(player.pos_y < 0){
        player.speedY = 0;
        player.pos_y = 0;
    }
}