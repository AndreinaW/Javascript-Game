window.onload = init;

let PLAYER_SPRITESHEET_URL = "images/player_skin.png";

let canvas, ctx, player;

// spritesheet to load and loaded. When they are the same we can call requestAnimationFrame()
let num_spritesheet = 1;       // one for the player, then we count the enemies
let num_spritesheet_loaded = 0;

// levels
let levels = [];
let current_level = 0;


function init() {
    console.log("page loaded");
    addStartClickListener();

    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    loadPlayer();
    loadLevels();
}


function loadPlayer() { 
    player = new Player(PLAYER_SPRITESHEET_URL, canvas.width/2, canvas.height/2);
    player.spritesheet.onload = function() {
        player.initSprites();      
        num_spritesheet_loaded++;
    };
}


function loadLevels() {
    $.getJSON('js/levels_settings.json').done(function (data) 
    {
        let i = 0;
        data.levels.forEach(lvl => {
            // load bacground
            let level = new Level(new Environment(lvl.bckgd_type));

            // load bricks
            lvl.bricks.forEach(brick => {
                level.addPlatform(new Platform(brick.type, brick.posX, brick.posY, brick.width, brick.height));
            });

            // load enemies
            lvl.allEnemies.forEach(enemy => {
                level.addEnemy(new Enemy(enemy.type, enemy.posX, enemy.posY));           
                num_spritesheet++;
            });

            levels.push(level);

            levels[i].enemies.forEach((enemy) => {
                enemy.spritesheet.onload = function() {
                    enemy.initSprites();   
                    num_spritesheet_loaded++;
                    startGame();            // ERASE
                }
            });
            i++;
        });
    });    
}


function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveAndDrawAllObjects();
    testCollisions();
    requestAnimationFrame(animation);
}


function moveAndDrawAllObjects() {
    getCurrentLevel().moveAndDrawElements(ctx);
    player.move();
    player.draw(ctx);    
}


function startGame() {
    if(num_spritesheet_loaded == num_spritesheet) {
        requestAnimationFrame(animation);
    }
}

function getCurrentLevel() {
    return levels[current_level];
}