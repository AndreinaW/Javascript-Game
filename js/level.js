function Level(environment) {
    this.environment = environment;
    this.platforms = [];
    this.enemies = [];
    //this.isLevelComplete = false;


    this.addPlatform = function(p) {
        this.platforms.push(p);
    }

    this.addEnemy = function(e) {
        this.enemies.push(e);
    }


    this.moveAndDrawElements = function(ctx) {
        ctx.save();
        this.environment.move();
        this.environment.draw(ctx);
        this.platforms.forEach(platform => {
            platform.draw(ctx);
        });

        this.enemies.forEach((enemy) => {
            enemy.move();
            enemy.draw(ctx);  
        });
        ctx.restore();
    }
}