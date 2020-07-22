$(document).on('keydown',function(e) {
    if(e.which == 37) {
        //LEFT
        player.move_left();
        // alert('You pressed enter!');
    }
    if(e.which == 39) {
        //RIGHT
        player.move_right();
        // alert('You pressed enter!');
    }
    if(e.which == 40) {
        //DOWN
        player.dodge = true;
        len = player.length ;
        player.length = player.height ;
        player.height = len ;
        window.setTimeout(()=>{player.dodge = false; len = player.height ; player.height = player.length ; player.length = len ; },3000);
        // console.log(player.length,player.height);
        // alert('You pressed enter!');
    }
    if(e.which == 71) {
        //G
        gray_scale = true ;
        window.setTimeout(()=>{gray_scale = false; },3000);
        // console.log(player.length,player.height);
        // alert('You pressed enter!');
    }
    if(e.which == 83) {
        //S
        cameraEye[0] += 1;
        // alert('You pressed enter!');
    }
    if(e.which == 65) {
        //A
        cameraEye[0] -= 1;
        // alert('You pressed enter!');
    }
    if(e.which == 87) {
        //W
        cameraEye[1] += 1;
        // alert('You pressed enter!');
    }
    if(e.which == 90) {
        //Z
        cameraEye[1] -= 1;
        // alert('You pressed enter!');
    }
    if(e.which == 70) {
        //F
        cameraTarget[0] += 1;
        // alert('You pressed enter!');
    }
    if(e.which == 68) {
        //D
        cameraTarget[0] -= 1;
        // alert('You pressed enter!');
    }
    if(e.which == 82) {
        //R
        cameraTarget[1] += 1;
        // alert('You pressed enter!');
    }
    if(e.which == 67) {
        //C
        cameraTarget[1] -= 1;
        // alert('You pressed enter!');
    }
    if(e.which == 32) {
        //SPACE_BAR
        if(checkBase())
        {
            if(!jump_power)
                player.velocityY = 1.0;
            else
                player.velocityY = 1.5;
        }
        // alert('You pressed enter!');
    }
});
