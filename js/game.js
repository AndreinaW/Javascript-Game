window.onload = init;

let BCKGRD__URL = "images/bg_lvl_1.png";
let CLOUDS_URL = "images/cloud.png";
let PLAYER_SPRITESHEET_URL = "images/player_skin.png";

let canvas, ctx, player;
let enemies = [];

// spritesheet to load and loaded. When they are the same we can call requestAnimationFrame()
let num_spritesheet = 1;       // one for the player, then we count the enemies
let num_spritesheet_loaded = 0;


//LEVEL NUMBER
let lvl = 0;
let platforms = [];
let level_settings;


function init() {
    console.log("page loaded");
    addStartClickListener();

    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    environment = new Environment(BCKGRD__URL, CLOUDS_URL);


    $.getJSON('js/levels_settings.json').done(function (data) {
        data.levels[lvl].bricks.forEach(brick => {
            platforms.push(new Platform(brick.posX, brick.posY, brick.width, brick.height, brick.type, brick.src));
        });
        
        data.levels[lvl].allEnemies.forEach(enemy => {
            enemies.push(new Enemy(enemy.src, enemy.posX, enemy.posY));
            num_spritesheet++;
        });

        enemies.forEach((enemy) => {
            enemy.spritesheet.onload = function(){
                enemy.initSprites();   
                num_spritesheet_loaded++;
            }
        });                      
    });

    player = new Player(PLAYER_SPRITESHEET_URL, canvas.width/2, canvas.height/2);
    player.spritesheet.onload = function() {
        player.initSprites();      
        num_spritesheet_loaded++;
    };
}


function startGame() {
    if(num_spritesheet_loaded == num_spritesheet) {
        requestAnimationFrame(animation);
    }
}


function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveAndDrawAllObjects();
    testCollisions();
    requestAnimationFrame(animation);
}


function moveAndDrawAllObjects() {
    environment.move();
    environment.draw(ctx);
    platforms.forEach(platform => {
        platform.draw(ctx);
    });

    enemies.forEach((enemy) => {
        enemy.move();
        enemy.draw(ctx);  
    });

    player.move();
    player.draw(ctx);    
}