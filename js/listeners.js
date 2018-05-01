
function addAllButtonsClickListeners() {
  addStartClickListener();
  addRestartClickListener();
  addAudioOnOffClickListener();
  addPlayPauseClickListener();
}


function addStartClickListener() {
  document.querySelector("#buttonStart").addEventListener('click', function(event) {
    document.querySelector("#gameScreen").style =  "display: block;";
    document.querySelector("#startScreen").style =  "display: none;";
    startGame();
  });
}


function addRestartClickListener() {
  document.querySelector("#bt_restart").addEventListener('click', function(event) {
    document.querySelector("#popup").style =  "display: none;";
    restartGame();
  });
}


function addAudioOnOffClickListener() { 
  let bt = document.querySelector("#bt_audioOnOff");
  bt.addEventListener('click', function(event) {
    if(!mute_audio) {
      bt.classList.add("bt_audioOn");
      bt.classList.remove("bt_audioOff");
      playAudio("theme");
    } 
    else {
      bt.classList.add("bt_audioOff");
      bt.classList.remove("bt_audioOn");
      game_audio_theme.pause();      
    }
    mute_audio = !mute_audio;    
  });
}


function addPlayPauseClickListener() { 
  let bt_audio = document.querySelector("#bt_audioOnOff");
  let bt_play = document.querySelector("#bt_playPause");
  
  bt_play.addEventListener('click', function(event) 
  {
    // pause
    if(isPlaying) { 
      bt_play.classList.add("bt_play");
      bt_play.classList.remove("bt_pause");
      mute_audio = true;
    } 
    // plays
    else {
      bt_play.classList.add("bt_pause");
      bt_play.classList.remove("bt_play");      
      mute_audio = false;
      requestAnimationFrame(animation);
    }
    
    if(!mute_audio) {
      bt_audio.classList.add("bt_audioOn");
      bt_audio.classList.remove("bt_audioOff");
      playAudio("theme");
    } 
    else {
      bt_audio.classList.add("bt_audioOff");
      bt_audio.classList.remove("bt_audioOn");
      game_audio_theme.pause();      
    }

    isPlaying = !isPlaying;
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
        console.log("single");
      }
      else if(player.jumped) {      // double jump
        player.move_dir.up = true;
        player.jumped = false;
        console.log("double");
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

    case 77:
      mute_audio = !mute_audio;
      game_audio_theme.pause();
      playAudio("theme");
      break; 
  }
  
}, false);
  