function WallCollisions(r){
    if( (r.pos_x + r.width - 15 ) > canvas_interface.width){
        r.speedX = -r.speedX;
        r.pos_x = canvas_interface.width - r.width +15;
    }

    if((r.pos_x + 15) < 0){
        r.speedX = -r.speedX;
        r.pos_x = -15;
    }

    if((r.pos_y + r.height) > canvas_interface.height) {
        r.speedY = -r.speedY;
        r.pos_y = canvas_interface.height - r.height;
      }
    if(r.pos_y < 0){
        r.speedY = -r.speedY;
        r.pos_y = 0;
    }
}