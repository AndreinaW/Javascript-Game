window.onload = init;

let PLAYER_SPRITESHEET_URL = "images/player_skin.png";

let canvas, ctx, player;

// spritesheet to load and loaded. When they are the same we can call requestAnimationFrame()
let num_spritesheet = 1;       // one for the player, then we count the enemies
let num_spritesheet_loaded = 0;

// levels
let levels = [];
let current_level = 0;

let isPlaying = true;

//audio
let game_audio_theme,jump_audio,enemy_killed_audio,coin_pickup_audio,player_touched_audio;
let mute_audio = false;


function init() {
    console.log("page loaded");
    addAllButtonsClickListeners();

    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    loadMusic();
    loadPlayer();
    loadLevels();
    playAudio("theme");
}


function loadMusic() {
    game_audio_theme = new Audio("audio/gameTheme.mp3");
    jump_audio = new Audio("audio/jump.wav");
    enemy_killed_audio = new Audio("audio/enemy_killed.wav");
    coin_pickup_audio = new Audio("audio/coin_pickup.wav");
    player_touched_audio = new Audio("audio/player_touched.mp3");    
}


function loadPlayer() { 
    player = new Player(PLAYER_SPRITESHEET_URL,0,344);
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
                level.addEnemy(new Enemy(enemy.type, enemy.posX, enemy.posY, enemy.max_x,
                                            enemy.extra_space_left,enemy.extra_space_right));           
                num_spritesheet++;
            });

            // load coins
            lvl.coins.forEach(coin => {
                level.addCoin(new Coin(coin.posX, coin.posY,0,0));           
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

            levels[i].coins.forEach((coin) => {
                coin.spritesheet.onload = function() {
                    coin.initSprites();   
                    num_spritesheet_loaded++;
                    startGame();            // ERASE or change for a loading in start page
                }
            });
            i++;
        });
    });    
}


function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    testCollisions();
    moveAndDrawAllObjects();

    if(isPlaying) {
        if(!player.isDead()) {
            requestAnimationFrame(animation);
        } 
        else {
            gameOver();
        }
    }
}


function moveAndDrawAllObjects() {
    getCurrentLevel().moveAndDrawElements(ctx);
    player.move();
    player.draw(ctx); 
    player.drawHearts(ctx);   
}


function startGame() {
    if((num_spritesheet_loaded == num_spritesheet)) {
        requestAnimationFrame(animation);
    }
}


function restartGame() {
    num_spritesheet = 0;
    num_spritesheet_loaded = 0;
    isPlaying = true;
    mute_audio = false;
    current_level = 0;
    levels.length = 0;
    loadLevels();
    player.reset(0, 334);
    startGame();
}


function gameOver() {
    document.querySelector("#popup").style =  "display: block;";
    document.querySelector("#popup_title").innerHTML =  "Game Over!";
}


function getCurrentLevel() {
    return levels[current_level];
}


function playAudio(subject) {
    if(!mute_audio) {
        switch (subject) {
            case "theme":
                game_audio_theme.loop = true;
                game_audio_theme.play();
                break;
            case "jump":
                jump_audio.play();
                break;
            case "touched":
                player_touched_audio.play();
                break;
            case "enemy_killed":
                enemy_killed_audio.play();
                break;
            default:
                break;
        }
    }
    if(mute_audio)
        game_audio_theme.pause();
}