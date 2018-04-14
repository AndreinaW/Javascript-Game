/*document.querySelector("#buttonStart").addEventListener('click', function(event) {
    canvas.style =  "display: inline;";
});*/


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
      }
      else if(player.jumped) {      // double jump
        player.move_dir.up = true;
        player.jumped = false;
      } 
      else {
        player.move_dir.up = false;
      }      
      break;
  }
}, false);



// If the key is released, change the states object
window.addEventListener('keyup', function(event) {
  let code = event.keyCode;
  switch(code) {
    // Left arrow
    case 37:    
      player.move_dir.left = false;
      break;

    // Right arrow
    case 39:
      player.move_dir.right = false;
      break;

    // Up arrow  
    case 38:
      player.move_dir.up = false;
      break;    
  }
}, false);
  