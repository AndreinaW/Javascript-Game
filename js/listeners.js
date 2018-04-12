// Add the listener to the main, window object, and update the states
window.addEventListener('keydown', function(event){
  switch(event.keyCode){
    case 37:
    inputStates.left = true;
      break;  
    case 38:
      if(player.on_the_ground && player.speedY == 0 && !inputStates.up){
        
        player.speedY  = -player.jump_speed;
        
        player.jumped = true;
        player.on_the_ground = false;
        currentDirection = DIR_UP;

      }
      inputStates.up = true;
      break;
    case 39:
    inputStates.right = true;
      break;
    case 40:
    inputStates.down = true;
      break;
    case 32:
    inputStates.space = true;
      break;

    }
  }, false);
  // If the key is released, change the states object
  window.addEventListener('keyup', function(event){
    if (event.keyCode === 37) {
      inputStates.left = false;
    }else if (event.keyCode === 38) {
      inputStates.up = false;
    } else if (event.keyCode === 39) {
      inputStates.right = false;
    } else if (event.keyCode === 40) {
      inputStates.down = false;
    } else if (event.keyCode === 32) {
      inputStates.space = false;
    }
  }, false);
  