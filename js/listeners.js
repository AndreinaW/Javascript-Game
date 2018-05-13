
function addListeners() {
  addStartClickListener();
  addRestartClickListener();
  addAudioOnOffClickListener();
  addPlayPauseClickListener();

  addKeysListeners();
}


function addStartClickListener() {
  document.querySelector("#bt_start").addEventListener('click', function(event) {
    changeDisplay(document.querySelector("#gameScreen"), "block");
    changeDisplay(document.querySelector("#startScreen"), "none");
    startGame();
  });
}


function addRestartClickListener() {
  document.querySelector("#bt_restart").addEventListener('click', function(event) {
    changeDisplay(document.querySelector("#popup"), "none");
    restartGame();
  });
}


function addAudioOnOffClickListener() { 
  let bt = document.querySelector("#bt_audioOnOff");
  bt.addEventListener('click', function(event) 
  {
    if(currentGameState !=  gameStates.gameOver) {
      mute_audio = !mute_audio; 
      if(!mute_audio) {
        addRemoveCssClass(bt, "bt_audioOn", "bt_audioOff");
      } 
      else {
        addRemoveCssClass(bt, "bt_audioOff", "bt_audioOn");
      }
      playAudio("theme");   
    }
  });
}


function addPlayPauseClickListener() { 
  let bt_audio = document.querySelector("#bt_audioOnOff");
  let bt_play = document.querySelector("#bt_playPause");
  
  bt_play.addEventListener('click', function(event) 
  {
    // pause
    if(currentGameState ==  gameStates.playing) { 
      addRemoveCssClass(bt_play, "bt_play", "bt_pause");
      addRemoveCssClass(bt_audio, "bt_audioOff", "bt_audioOn");
      mute_audio = true;
      playAudio("theme");
      currentGameState = gameStates.paused;
    } 
    // plays
    else if(currentGameState == gameStates.paused) {
      addRemoveCssClass(bt_play, "bt_pause", "bt_play");
      addRemoveCssClass(bt_audio, "bt_audioOn", "bt_audioOff");
      mute_audio = false;
      playAudio("theme");
      currentGameState = gameStates.playing;
      requestAnimationFrame(animation);
    }
  });
}



function addKeysListeners() 
{
  // Add the listener to the main, window object
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

      case 77:
      let bt = document.querySelector("#bt_audioOnOff");
        mute_audio = !mute_audio; 
        if(!mute_audio) {
          addRemoveCssClass(bt, "bt_audioOn", "bt_audioOff");
        } 
        else {
          addRemoveCssClass(bt, "bt_audioOff", "bt_audioOn");
        }
        playAudio("theme");
        break; 
    }
  }, false);
}


function addRemoveCssClass(element, addClass, removeClass) {
  element.classList.add(addClass);
  element.classList.remove(removeClass);
}