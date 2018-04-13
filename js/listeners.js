

// Add the listener to the main, window object, and update the states
window.addEventListener('keydown', function(event) {
  let code = event.keyCode;
  switch(code) {
    // Left arrow
    case 37:
      player.move_dir.left = true;
      break;

    // Right arrow
    case 39:
      player.move_dir.right = true;
      break;

    // Up arrow  
    case 38:
      if(player.on_the_ground) {    // single jump
        player.move_dir.up = true;
        player.on_the_ground = false;
        player.jumped = true;
        console.log("ground");
      }
      else if(player.jumped) {      // double jump
        player.move_dir.up = true;
        player.jumped = false;
        console.log("jumped");
      } 
      else {
        player.move_dir.up = false;
        console.log("nada");
      }      
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



window.addEventListener("keypress", function(event) {
  console.log("entreeeeee");
  /*let code = event.keyCode;
  switch(code) {
    // Up arrow  
    case 38:
        console.log("press");
      break;
  }*/
}, false);



// If the key is released, change the states object
window.addEventListener('keyup', function(event) {
  let code = event.keyCode;
  switch(code) {
    // Left arrow
    case 37:    
      player.move_dir.left = false;
      break;

    // Up arrow  
    case 38:
      /*if (!player.jumped) {
        inputStates.up = false;
      }*/
      player.move_dir.up = false;
      break;

    // Right arrow
    case 39:
      player.move_dir.right = false;
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
  