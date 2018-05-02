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

    this.removeEnemy = function(e) {
        let index = this.enemies.indexOf(e);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }
    }

    this.removeCoin = function(c) {
        let index = this.coins.indexOf(c);
        if(index > -1){
            this.coins.splice(index,1);
        }
    }

    this.addCoin = function(c) {
        this.coins.push(c);
    }


    this.moveAndDrawElements = function(ctx) {
        ctx.save();
        this.environment.draw(ctx);
        this.platforms.forEach(platform => {
            platform.draw(ctx);
        });

        this.enemies.forEach((enemy) => {
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