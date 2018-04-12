window.onload = init;
let canvas_interface,ctx_interface;
let player_spritesheet;
let NB_POSTURES = 4;
let SPRITE_WIDTH = 64;
let SPRITE_HEIGHT = 64;
let NB_FRAMES_PER_POSTURE = 9;
let player_skins = [];
let inputStates = {};
let DIR_LEFT = 1;//row of spritesheet
let DIR_RIGHT = 3;//row of spritesheet
let DIR_UP = 0;
let DIR_FRONT = 2;
let currentDirection = 2;
function init() {
    console.log("page loaded");

    canvas_interface = document.querySelector("#canvas_interface");
    ctx_interface = canvas_interface.getContext("2d");

    environment = new Environment("images/bg_lvl_1.png","images/cloud.png");
    
    player_spritesheet = new Image();
    player_spritesheet.src = "images/boy_sprite.png";

    player_spritesheet.onload = function(){
        for(var i = 0; i < NB_POSTURES ; i++){
            sprite = new Sprite();
            sprite.extractSprites(player_spritesheet, NB_POSTURES, (i+1), 
                                NB_FRAMES_PER_POSTURE,SPRITE_WIDTH,SPRITE_HEIGHT);
            sprite.setNbImagesPerSecond(20);
            player_skins[i] = sprite;
        }
        player = new Player(player_skins, SPRITE_WIDTH,SPRITE_WIDTH, canvas_interface.width/2,
                            canvas_interface.height - 3/2*SPRITE_HEIGHT);
        animation();
    };//onload


}


function animation() {
    ctx_interface.clearRect(0, 0, canvas_interface.width, canvas_interface.height);
    drawEnvironment();
    player.draw();
    WallCollisions(player);
    requestAnimationFrame(animation);
  }
  
function drawEnvironment(){
    environment.draw(ctx_interface);
    environment.move();
}