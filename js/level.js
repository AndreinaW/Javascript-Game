function Level(environment) {
    this.environment = environment;
    this.platforms = [];
    this.enemies = [];
    this.coins = [];


    this.addPlatform = function(p) {
        this.platforms.push(p);
    }

    this.addEnemy = function(e) {
        this.enemies.push(e);
    }

    this.addCoin = function(c) {
        this.coins.push(c);
    }


    this.moveAndDrawElements = function(ctx) {
        ctx.save();
        this.environment.move();
        this.environment.draw(ctx);
        this.platforms.forEach(platform => {
            platform.draw(ctx);
        });

        this.enemies.forEach((enemy) => {
            if(testCollisionPlayerEnemies(player,enemy)){
                console.log("collision");
                playAudio("touched");
            }
            else if(testJumpOnEnemy(player,enemy)){
                playAudio("enemy_killed");
                enemy.decreaseLive();
                console.log(enemy.live);
            }

            enemy.move();
            enemy.draw(ctx);  
        });

        this.coins.forEach((coin) => {
            coin.draw(ctx);  
        });

        ctx.restore();
    }


    this.isLevelCompleted = function() {
        return this.coins.length === 0;
    }
}