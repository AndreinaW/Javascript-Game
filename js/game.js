window.onload = init;

let BCKGRD__URL = "images/bg_lvl_1.png";
let CLOUDS_URL = "images/cloud.png";
let PLAYER_SPRITESHEET_URL = "images/boy_sprite.png";

let canvas, ctx, player, enemy;

//LEVEL NUMBER
let lvl = 0;
let platforms = [];
let level_settings;


function init() {
    console.log("page loaded");

    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    environment = new Environment(BCKGRD__URL, CLOUDS_URL);

    $.getJSON('js/levels_settings.json').done(function (data) {
        data.levels[lvl].bricks.forEach(brick => {
            platforms.push(new Platform(brick.posX, brick.posY, brick.width, brick.height, brick.type, brick.src));
        });
    });


    player = new Player(PLAYER_SPRITESHEET_URL, canvas.width/2, canvas.height/2);
    player.spritesheet.onload = function() {
        player.initSprites();
        requestAnimationFrame(animation);
    };

    enemy = new Enemy(PLAYER_SPRITESHEET_URL, 100, 100);
    enemy.spritesheet.onload = function() {
        enemy.initSprites();
        requestAnimationFrame(animation);
    };
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
    player.move();
    player.draw(ctx);    

    enemy.move();
    enemy.draw(ctx);
}
