function Level(environment) {
    this.environment = environment;
    this.platforms = [];
    this.enemies = [];
    this.coins = [];
    this.total_coins = 0;
    this.collected_coins = 0;

    this.coinIcon = new Image();
    this.coinIcon.src = "images/total_coins.png";

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


    this.drawTotalCoins = function(ctx){
        ctx.save();
        ctx.drawImage(this.coinIcon,90,0);
        ctx.font="16px Verdana";
        ctx.fillText(this.collected_coins + "/"+ this.total_coins,115,16);
        ctx.restore();
    }


    this.incrementCollectedCoins = function() {
        this.collected_coins++;
    }

    this.isCompleted = function() {
        return this.coins.length === 0;
    }
}