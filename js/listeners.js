function addStartClickListener() {
  document.querySelector("#buttonStart").addEventListener('click', function(event) {
      console.log("emnte");
      document.querySelector("#gameScreen").style =  "display: block;";
      document.querySelector("#startScreen").style =  "display: none;";
      startGame();
  });
}
function bottomButtonsListener(){
  document.querySelector("#audioSettings").addEventListener('click', function(event) {
    mute_audio = !mute_audio;
    game_audio_theme.pause();
    playAudio("theme");
    console.log("emnte");
  });
  document.querySelector("#move_left").addEventListener('mousedown', function(event) {
    player.move_dir.left = true;
  });
  document.querySelector("#move_up").addEventListener('mousedown', function(event) {
    if(player.on_the_ground) {    // single jump
      player.move_dir.up = true;
      player.on_the_ground = false;
      player.jumped = true;
      playAudio("jump");
    }
    else if(player.jumped) {      // double jump
      player.move_dir.up = true;
      player.jumped = false;
    } 
    else {
      player.move_dir.up = false;
    }  
  });
  document.querySelector("#move_right").addEventListener('mousedown', function(event) {
    player.move_dir.right = true;
  });

  document.querySelector("#move_left").addEventListener('mouseup', function(event) {
    player.move_dir.left = false;
  });
  document.querySelector("#move_up").addEventListener('mouseup', function(event) {
    player.move_dir.up = false;
  });
  document.querySelector("#move_right").addEventListener('mouseup', function(event) {
    player.move_dir.right = false;

  });


}
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
        playAudio("jump");
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
     //Space for pause    
    case 32:
      pause = !pause;
      break;
    case 77:
      mute_audio = !mute_audio;
      game_audio_theme.pause();
      playAudio("theme");
      break; 
  }
  
}, false);
  