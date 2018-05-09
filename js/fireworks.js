
function randomFloat (min, max) {
	return min + Math.random()*(max-min);
}


/*
 * A single explosion particle
 */
function Particle ()
{
	this.scale = 1.0;
	this.x = 0;
	this.y = 0;
	this.radius = 20;
	this.color = "#000";
	this.velocityX = 0;
	this.velocityY = 0;
	this.scaleSpeed = 0.5;
	this.useGravity = false;
  
	this.update = function(ms) {
		// shrinking      
		this.scale -= this.scaleSpeed * ms / 1000.0;
      
		if (this.scale <= 0.5) {
          // particle is dead, remove it
          return true;
		}
		
		// moving away from explosion center
		this.x += this.velocityX * ms/1000.0;
		this.y += this.velocityY * ms/1000.0;
      
		// and then later come downwards when our
		// gravity is added to it. We should add parameters 
		// for the values that fake the gravity
		if(this.useGravity) {
		  this.velocityY += Math.random()*4 +4;
		}
		return false;
	};
	
	this.draw = function(context2D) {
		// translating the 2D context to the particle coordinates
		context2D.save();
		context2D.translate(this.x, this.y);
		context2D.scale(this.scale, this.scale);
		
		// drawing a filled circle in the particle's local space
		context2D.beginPath();
		context2D.arc(0, 0, this.radius, 0, Math.PI*2, true);
		//context2D.closePath();
		
		context2D.fillStyle = this.color;
		context2D.fill();
		
		context2D.restore();
	};
}



function Fireworks ()
{
	this.delta = 0;
	this.oldTime=0;
	this.particles = [];
	this.isActive = false;
	this.hasFinished = false;

	// Delta = time between two consecutive frames,
	// for time-based animation
	this.moveAndDraw = function(ctx, currentTime) 
	{
		this.delta = currentTime - this.oldTime;
		this.oldTime = currentTime;

		for (var i = 0; i < this.particles.length; i++) {
			var particle = this.particles[i];
			var deleteParticle = particle.update(this.delta);

			if(deleteParticle) {
				this.removeFromArray(particle);
			}
			particle.draw(ctx);
		}

		this.hasFinished = (this.particles.length == 0);
	}

	this.removeFromArray = function(object) {
		var idx = this.particles.indexOf(object);
		if (idx !== -1) {
		    this.particles.splice(idx, 1);
		}
	}

	this.reset = function() {
		this.delta = 0;
		this.oldTime=0;
		this.isActive = false;
		this.hasFinished = false;
		this.particles.length = 0;
	}


	/*
	 * Advanced Explosion effect
	 * Each particle has a different size, move speed and scale speed.
	 * 
	 * Parameters:
	 * 	x, y - explosion center
	 * 	color - particles' color
	 */
	this.createExplosion = function(x, y, color) {
		var minSize = 10;
		var maxSize = 30;
		var count = 10;
		var minSpeed = 60.0;
		var maxSpeed = 200.0;
		var minScaleSpeed = 1.0;
		var maxScaleSpeed = 4.0;
		
		for (var angle=0; angle<360; angle += Math.round(360/count))
		{
			var particle = new Particle();
			
			particle.x = x;
			particle.y = y;
			
	        // size of particle
			particle.radius = randomFloat(1, 3);
			
			particle.color = color;
			
	        // life time, the higher the value the faster particle 
	        // will die
			particle.scaleSpeed = randomFloat(0.3, 0.5);
	      
	        // use gravity
	        particle.useGravity = true;
			
			var speed = randomFloat(minSpeed, maxSpeed);
			
			particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
			
			this.particles.push(particle);
		}
	}


	this.startDoubleExplosion = function(x, y) {
		this.createExplosion(x, y, this.getRandomColor());
		this.createExplosion(x, y, this.getRandomColor());
		playAudio("fireworks");
	}

	this.startFireworks = function(maxWidth, maxHeight) {
		var nb_explosions = 6;
		for(var i = 0; i < nb_explosions; i++) {
			this.startDoubleExplosion(randomFloat(0, maxWidth), randomFloat(0, maxHeight));
		}
		this.isActive = true;
	}

	this.getRandomColor = function() {
		return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	}	
}