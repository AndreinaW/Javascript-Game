// IF THIS HAPPENSE WITH THE ENEMIES IT SHOULD BE CHANGED AND PUT AS AN ATTRIBUTE OF THE CLASS
let extra_sprite_space_right= 27;
let extra_sprite_space_left = 13;
let extra_sprite_space_down  =15;


function testCollisions() {
    testWallCollisionsPlayer(player);
    testWallCollisionsEnemies(enemy);
    testCollisionPlayerEnemies(player, enemies);
    testCollisionsPlatforms(player,platforms);
}


function testWallCollisions(r) {
    // right wall
    if((r.pos_x + r.width) > canvas.width) {
        r.speedX = -r.speedX;
        r.pos_x = canvas.width - r.width;
    }
    // left wall
    else if((r.pos_x) < 0){
        r.speedX = -r.speedX;
        r.pos_x = 0;
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


function testWallCollisionsEnemies() {
    enemies.forEach((enemy) => {
        testWallCollisions(enemy);
    });   
}


function testWallCollisionsPlayer(player) {
    // right wall
    if((player.pos_x + player.width - extra_sprite_space_right) > canvas.width) {
        player.speedX = 0;
        player.pos_x = canvas.width - player.width + extra_sprite_space_right;
    }
    // left wall
    else if((player.pos_x + extra_sprite_space_left) < 0){
        player.speedX = 0;
        player.pos_x = -extra_sprite_space_left;
    }

    // down wall
    if((player.pos_y + player.height -extra_sprite_space_down) > canvas.height) {
        player.speedY = 0;
        player.pos_y = canvas.height - player.height+extra_sprite_space_down;
        player.on_the_ground = true;
        player.jumped = false;    
    }
    // up wall
    else if(player.pos_y < 0){
        player.speedY = 0;
        player.pos_y = 0;
    }
}


function testCollisionsPlatforms(r, platforms){
    platforms.forEach(platform => {

        if(r.pos_x + extra_sprite_space_right > platform.posX &&
            (r.pos_x + extra_sprite_space_left < platform.posX + platform.width )&&
            ((r.pos_y + r.height - extra_sprite_space_down) > platform.posY)){
                //r.pos_y = platform.posY - r.height +extra_sprite_space_down;
                if((r.pos_y + extra_sprite_space_down) < platform.posY)
                {
                    r.speedY = 0;
                    r.speedY = -r.speedY;
                    r.pos_y = platform.posY - r.height + extra_sprite_space_down;
                    player.on_the_ground = true;
                    player.jumped = false;    
                }
            }
    });
}







function testCollisionPlayerEnemies(player, enemies) {
    enemies.forEach((enemy) => {
        if(rectsOverlap(player.pos_x, player.pos_y, player.width, player.height,
                        enemy.pos_x, enemy.pos_y, enemy.width, enemy.height)) {
            console.log("colision");
            //player.sprites[player.current_sprite].style.filter = "grayscale(100%)";
        }      
    });
}


// Collisions between aligned rectangles
// dans collision.js
function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false; // No vertical axis projection overlap
    return true; // If previous tests failed, then both axis projections
                // overlap and the rectangles intersect
}
