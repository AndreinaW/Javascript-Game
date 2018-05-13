function Level(environment) {
    let COIN_ICON_SRC = {
        not_collected: "images/total_coins.png",
        collected: "images/coins_collected.png"        
    }

    this.environment = environment;
    this.platforms = [];
    this.enemies = [];
    this.coins = [];
    this.total_coins = 0;
    this.collected_coins = 0;

    this.coinIcon = {
        not_collected: new Image(),
        collected: new Image()
    }
    this.coinIcon.not_collected.src = COIN_ICON_SRC.not_collected;
    this.coinIcon.collected.src = COIN_ICON_SRC.collected;


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
        this.total_coins++;
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

        this.drawTotalCoins(ctx);

        ctx.restore();
    }


    this.drawTotalCoins = function(ctx) {    
        let x = 80;
        ctx.save();
        for(let i = 0; i < this.total_coins ; i++) {
            if(i < this.collected_coins) {
                ctx.drawImage(this.coinIcon.collected, x, 0);
            } else {
                ctx.drawImage(this.coinIcon.not_collected, x, 0);
            }             
            x += 23;
        }        
        ctx.restore();    
    }


    this.incrementCollectedCoins = function() {
        this.collected_coins++;
    }

    this.isCompleted = function() {
        return this.coins.length === 0;
    }
}