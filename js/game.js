window.onload = init;

let canvas, ctx, player;

// spritesheet to load and loaded. When they are the same we can call requestAnimationFrame()
let num_spritesheet = 1;       // one for the player, then we count the enemies
let num_spritesheet_loaded = 0;

// levels
let levels = [];
let current_level = 0;

// game states
let gameStates = {
    playing: 0,
    paused: 1,
    gameOver: 2,
    levelCompleted: 3,
    restarted: 4
};
let currentGameState = gameStates.playing;

//audio
let game_audio_theme,jump_audio,enemy_killed_audio,coin_pickup_audio,player_touched_audio;
let mute_audio = false;


function init() {
    console.log("page loaded");
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    addListeners();
    loadLevels();
    loadMusic();
    loadPlayer();
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
    player = new Player(0,344);
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
                level.addEnemy(new Enemy(enemy.type, enemy.posX, enemy.posY, enemy.max_x));           
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
                    if(currentGameState == gameStates.restarted) {
                        startGame();
                    }
                }
            });

            levels[i].coins.forEach((coin) => {
                coin.spritesheet.onload = function() {
                    coin.initSprites();   
                    num_spritesheet_loaded++;
                    if(currentGameState == gameStates.restarted) {
                        startGame();
                    }
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

    switch (currentGameState) {
        case gameStates.playing:
            requestAnimationFrame(animation);
            break;

        case gameStates.gameOver:
            gameOver();
            break;

        case gameStates.levelCompleted:
            //requestAnimationFrame(animation);
            levelCompleted();
            break;
    }
}


function moveAndDrawAllObjects() {
    getCurrentLevel().moveAndDrawElements(ctx);
   // if(currentGameState != gameStates.levelCompleted) {
        player.move();
    //}
    player.draw(ctx); 
    player.drawHearts(ctx);   
}


function startGame() {
    if((num_spritesheet_loaded == num_spritesheet)) {
        currentGameState = gameStates.playing;
        requestAnimationFrame(animation);        
    }
}


function restartGame() {
    num_spritesheet = 0;
    num_spritesheet_loaded = 0;
    current_level = 0;
    levels.length = 0;
    loadLevels();
    player.reset(0, 334);
    currentGameState = gameStates.restarted;
}


function gameOver() {
    changeDisplay(document.querySelector("#popup"), "flex");
    changeDisplay(document.querySelector("#bt_restart"), "block");
    document.querySelector("#popup_title").innerHTML =  "Game Over!";
}


function levelCompleted() {
    changeDisplay(document.querySelector("#popup"), "flex");
    changeDisplay(document.querySelector("#bt_restart"), "none");
    document.querySelector("#popup_title").innerHTML =  "You did it!";
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
            case "coin_pickup":
                coin_pickup_audio.play();
                break;
            default:
                break;
        }
    }
    if(mute_audio)
        game_audio_theme.pause();
}


function changeDisplay(element, type) {
    switch (type) {
        case "none":
            element.style =  "display: none;";
            break;
        case "block":
            element.style =  "display: block;";
            break;
        case "flex":
            element.style =  "display: flex;";
            break;
    }
}