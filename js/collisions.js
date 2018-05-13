
function testCollisions() {
    let level = getCurrentLevel();

    testCollisionsWallsPlayer(player);
    testCollisionsPlatformsPlayer(player, level.platforms);

    //testCollisionWallEnemies(getCurrentLevel().enemies);
    testCollisionsPlayerEnemies(player, level);
    testCollisionPlayerCoins(player,level);
}


function testCollisionsWallsPlayer(player) {
    // right wall
    if((player.pos_x + player.width) > canvas.width) {
        player.speedX = 0;
        player.pos_x = canvas.width - player.width;
    }
    // left wall
    else if((player.pos_x) < 0){
        player.speedX = 0;
        player.pos_x = 0;
    }


    // down wall. It's a hole, he dies if he falls into it
    if(player.pos_y > canvas.height) { 
        if(!player.hasFallen) {
            playAudio("player_falls");
            player.decreaseLife();

            if (player.isDead()) {
                currentGameState = gameStates.gameOver;
            }          
            player.hasFallen = true;
            // the player is reset after the sound finishes
        }
    }
    // up wall
    else if(player.pos_y < 0){
        player.speedY = 0;
        player.pos_y = 0;
    }
}



function testCollisionsWallsEnemies(enemies) {
    enemies.forEach((enemy) => {
        testCollisionsWalls(enemy);
    });   
}


function testCollisionsWalls(r) {
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



function testCollisionsPlatformsPlayer(r, platforms){
    platforms.forEach(platform => {

        if(r.pos_x + r.width > platform.posX &&
            (r.pos_x < platform.posX + platform.width )&&
            ((r.pos_y + r.height) > platform.posY)) {
                if(r.pos_y < platform.posY)
                {
                    r.speedY = 0;
                    r.speedY = -r.speedY;
                    r.pos_y = platform.posY - r.height ;
                    player.on_the_ground = true;
                    player.jumped = false;
                }
                if(r.pos_y < platform.posY + platform.height/2){
                    r.speedY = 0;
                    r.speedY = -r.speedY;
                    player.jumped = false;
                }
            }
    });
}


function testCollisionPlayerCoin(p, c){
    //objects character collision function
    if((p.pos_y + p.height < c.pos_y ) ||
        (p.pos_y > c.pos_y + c.height) ||
        (p.pos_x > c.pos_x + c.width) ||
        (p.pos_x + p.width < c.pos_x)){
            return false;
    }
    return true;
}

function testCollisionPlayerCoins(player, level){
    level.coins.forEach((coin) => {
        if(testCollisionPlayerCoin(player,coin)){
            playAudio("coin_pickup");
            level.removeCoin(coin);
            level.incrementCollectedCoins();

            if(level.isCompleted()) {
                currentGameState = gameStates.levelCompleted;
            }
        }
    });
}

function testJumpOnEnemy(p, e){
    var jumpedOn = false;
    //player bottom collision with enemy top side
    if((p.pos_y + p.height > e.pos_y -5)&&
        (p.pos_y + p.height < e.pos_y + e.height/2)&&
        (p.pos_x + p.width > e.pos_x)&&
        (p.pos_x < e.pos_x + e.width)){
            p.pos_y = e.pos_y - p.height - 10;
            e.pos_x = p.pos_x + p.width + e.width;
            jumpedOn = true;
        }
    return jumpedOn;
}

function testCollisionPlayerEnemy(p, e){
    //objects character collision function
    if((p.pos_y + p.height < e.pos_y ) ||
        (p.pos_y > e.pos_y + e.height) ||
        (p.pos_x > e.pos_x + e.width) ||
        (p.pos_x + p.width < e.pos_x)){
            return false;
        }
    else{
        e.speedX = -e.speedX;
        if(e.pos_x < p.pos_x + p.width) {
            p.pos_x = e.pos_x + e.width + 2*p.width;
            p.pos_y = p.pos_y - p.height/2;
        }
        else {
            p.pos_x = e.pos_x - 2*p.width;
            p.pos_y = p.pos_y - p.height/2;
        }
    }
    return true;
}

function testCollisionsPlayerEnemies(player, level) {
    level.enemies.forEach((enemy) => {
        if(testJumpOnEnemy(player, enemy)) {
            playAudio("enemy_killed");
            enemy.decreaseLife();

            if(enemy.isDead()) {                
                level.removeEnemy(enemy);
            }
        }
        else if(currentGameState == gameStates.playing && testCollisionPlayerEnemy(player, enemy)) {
            playAudio("player_hit");
            player.decreaseLife();

            if (player.isDead()) {
                currentGameState = gameStates.gameOver;
            }          
        }        
    });
}
