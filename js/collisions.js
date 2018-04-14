// IF THIS HAPPENSE WITH THE ENEMIES IT SHOULD BE CHANGED AND PUT AS AN ATTRIBUTE OF THE CLASS
let extra_sprite_space_right= 27;
let extra_sprite_space_left = 13;
let extra_sprite_space_down  =15;


function testCollisions() {
    testWallCollisionsPlayer(player);
    testWallCollisionsEnemies();
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
        testCollisionPlayerEnemy(player, enemy);
    });
}


function testCollisionPlayerEnemy(p, e) {
    if((e.pos_y < p.pos_y && p.pos_y < e.pos_y + e.height) || 
       (e.pos_y < p.pos_y + p.height && p.pos_y + p.height < e.pos_y + e.height)) 
    {
        // collision p left side e
        if((e.pos_x < p.pos_x + p.width && p.pos_x + p.width < e.pos_x + e.width) || 
           (p.pos_x < e.pos_x && e.pos_x < p.pos_x + p.width)) 
        {
            //p.pos_x = e.pos_x - p.width - extra_sprite_space_right;
            e.pos_x = p.pos_x + p.width + extra_sprite_space_right;
            e.speedX = Math.abs(e.speedX);
            //e.speedY = -e.speedY;
            p.speedX = 0;
            console.log("collision left");
        }
        // collision p right side e
        else if((e.pos_x < p.pos_x && p.pos_x < e.pos_x + e.width) || 
                (p.pos_x < e.pos_x + e.width && e.pos_x + e.width < p.pos_x + p.width)) 
        {
            //p.pos_x = e.pos_x + e.width + extra_sprite_space_right;
            e.pos_x = p.pos_x - e.width - extra_sprite_space_right;
            e.speedX = -Math.abs(e.speedX);
            //e.speedY = -e.speedY;
            p.speedX = 0;
            console.log("collision");
        }        
    }
}