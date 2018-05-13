window.onload = init;

let canvas, ctx, player;

// spritesheet to load and loaded. When they are the same we can call requestAnimationFrame()
let num_spritesheet = 1;       // one for the player, then we count the enemies
let num_spritesheet_loaded = 0;

// levels
let levels = [];
let current_level = 0;
let fireworks = new Fireworks();

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
let sound = {};
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
    sound = {
        theme: new Howl({
                    src: ['audio/gameTheme.mp3'],
                    loop: true,
                    volume: 0.4
                }),
        jump: new Howl({
                    src: ['audio/jump.wav'],
                    volume: 0.5
                    }),
        player_hit: new Howl({
                        src: ['audio/player_hit.mp3'],
                        volume: 1
                    }),
        player_falls: new Howl({
                            src: ['audio/player_falls.mp3'],
                            volume: 0.4,
                            sprite: {
                                fall: [200, 700]
                            },
                            onend: function() {
                                player.resetAfterFall(0, 334);
                            }
                        }),
        enemy_hit: new Howl({src: ['audio/enemy_killed.wav']}),
        coin_pickup: new Howl({src: ['audio/coin_pickup.wav']}),
        fireworks: new Howl({src: ['audio/firework.mp3']}),
        game_over: new Howl({src: ['audio/game_over.mp3']}),
        game_over_bckg: new Howl({src: ['audio/game_over_bckg.mp3']})        
    }
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


function animation(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(currentGameState != gameStates.restarted) {
        testCollisions();
        moveAndDrawAllObjects();
    }

    switch (currentGameState) {
        case gameStates.playing:
            requestAnimationFrame(animation);
            break;

        case gameStates.gameOver:
            gameOver();
            break;

        case gameStates.levelCompleted:
            fireworks.moveAndDraw(ctx, time);
            levelCompleted();            
            requestAnimationFrame(animation);
            break;        
    }
}


function moveAndDrawAllObjects() {
    getCurrentLevel().moveAndDrawElements(ctx);
    if(currentGameState == gameStates.playing) {
        player.move();
    }
    player.draw(ctx); 
    player.drawHearts(ctx);   
}


function startGame() {
    if((num_spritesheet_loaded == num_spritesheet)) {
        playAudio("theme");
        currentGameState = gameStates.playing;
        requestAnimationFrame(animation);        
    }
}


function restartGame() {
    if(currentGameState != gameStates.gameOver) {
        current_level = 0;
    }
    currentGameState = gameStates.restarted;
    num_spritesheet = 0;
    num_spritesheet_loaded = 0;
    levels.length = 0;
    loadLevels();
    player.reset(0, 334);
    fireworks.reset();
    stopAllSounds();
}


function gameOver() {
    changeDisplay(document.querySelector("#popup"), "flex");
    changeDisplay(document.querySelector("#bt_restart"), "block");
    var title = document.querySelector("#popup_title");
    title.classList.add("big_font");
    title.classList.remove("small_font");
    title.innerHTML =  "Game Over!";
    playAudio("game_over");
}


function levelCompleted() {
    if(!fireworks.isActive) {
        changeDisplay(document.querySelector("#popup"), "flex");

        var title = document.querySelector("#popup_title");

        // if there's a next level or if it is the end of the game
        if(current_level + 1 < levels.length) {
            title.classList.add("big_font");
            title.classList.remove("small_font");
            title.innerHTML =  "You did it!";
            changeDisplay(document.querySelector("#bt_restart"), "none");
        }
        else {
            title.classList.add("small_font");
            title.classList.remove("big_font");
            title.innerHTML =  "Congrats!<br/>You finished the game!";   
            changeDisplay(document.querySelector("#bt_restart"), "block");
        }

        fireworks.startFireworks(canvas.width, canvas.height);
    }
    else if(fireworks.hasFinished) {
        
        // if there's another level
        if(current_level + 1 < levels.length) {            
            changeDisplay(document.querySelector("#popup"), "none");
            current_level++;
            fireworks.reset();    
            player.reset(0, 324);
            currentGameState = gameStates.playing;
        }
    }
}


function getCurrentLevel() {
    return levels[current_level];
}


function playAudio(subject) {
    if(!mute_audio) {
        switch (subject) {
            case "theme":
                if(!sound.theme.playing())
                    sound.theme.play();
                break;
            case "jump":
                if(currentGameState == gameStates.playing)
                    sound.jump.play();
                break;
            case "player_hit":
                if(!sound.player_hit.playing())
                    sound.player_hit.play();
                break;
            case "player_falls":
                sound.player_falls.play("fall");
                break;
            case "enemy_killed":
                sound.enemy_hit.play();
                break;
            case "coin_pickup":
                sound.coin_pickup.play();
                break;
            case "fireworks":
                sound.fireworks.play();
                break;            
            case "game_over":
                sound.theme.stop();
                sound.game_over_bckg.play();
                sound.game_over.play();
                break;
        }
    }
    else {
        sound.theme.pause();
    }
}


function stopAllSounds() {
    for(var s in sound) {
        sound[s].stop();
    }
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