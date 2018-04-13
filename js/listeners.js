// VER SI QUITAR INPUT STATE



// Add the listener to the main, window object, and update the states
window.addEventListener('keydown', function(event) {
  let code = event.keyCode;
  switch(code) {
    // Left arrow
    case 37:
      inputStates.left = true;
      //player.speedX = -player.move_speed;
      //player.currentDirection = player.sprite_left;
      break;

    // Up arrow  
    case 38:
      if(player.on_the_ground && player.speedY == 0 && !inputStates.up) {
        player.speedY  = -player.jump_speed;
        player.jumped = true;
        player.on_the_ground = false;
      } 
      else if(player.jumped && inputStates.up) {
        player.speedY = -player.jump_speed;
        player.jumped = false;
      }
      inputStates.up = true;
     // player.speedY  = -player.jump_speed;
      //player.currentDirection = player.sprite_up;
      break;

    // Right arrow
    case 39:
      inputStates.right = true;
      //player.speedX = player.move_speed;
      //player.currentDirection = player.sprite_right;
      break;

    // Down arrow
    /*case 40:
      inputStates.down = true;
      break;*/

    /*case 32:
      inputStates.space = true;
      break;*/
  }
}, false);


// If the key is released, change the states object
window.addEventListener('keyup', function(event) {
  let code = event.keyCode;
  switch(code) {
    // Left arrow
    case 37:    
      inputStates.left = false;
      //player.speedX = 0;
      break;

    // Up arrow  
    case 38:
      if (!player.jumped) {
        inputStates.up = false;
      }
      break;
    
    // Right arrow
    case 39:
      inputStates.right = false;
      break;

    // Down arrow
    /*case 40:
      inputStates.down = false;
      break;
*/
    /*case 32:
      inputStates.space = false;
      break;*/
  }
}, false);
  