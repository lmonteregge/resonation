
var zoomInLimit = 25, zoomOutLimit = 90;

const update = function () {

    // Zoom in
    if ( keyboard.pressed("E") ) {
        if ( camera.fov > zoomInLimit ) {
            camera.fov -= 1;
            camera.updateProjectionMatrix();
        }
    }
    // Zoom out
    if ( keyboard.pressed("Q") ) {
        if ( camera.fov < zoomOutLimit ) {
            camera.fov += 1;
            camera.updateProjectionMatrix();
        }
    }


    // Youtube controls
    // Play/Pause
    if ( keyboard.pressed("K") ) {
        if (ytButtonDelay) {
            let playerState = ytPlayer.getPlayerState();
            if ( playerState == 1 ) { 
                ytPlayer.pauseVideo(); 
                ytPlayer2.pauseVideo(); 
            }
            else { 
                ytPlayer.playVideo(); 
                ytPlayer2.playVideo(); 
            }
            ytButtonDelay = false;
            // Delay amount of times key pressed
            setTimeout(function() { ytButtonDelay = true; }, 400);  // Delay in milliseconds
        }
        
    }
    // Mute/Unmute
    if( keyboard.pressed("M") ) {  // M key 
        if (ytButtonDelay) {
            // let mute_toggle = $(this);
            
            if(ytPlayer.isMuted()){
                ytPlayer.unMute();
                ytPlayer2.unMute();
                // mute_toggle.text('volume_up');
            }
            else{
                ytPlayer.mute();
                ytPlayer2.mute();
                // mute_toggle.text('volume_off');
            }    
            ytButtonDelay = false;
            // Delay amount of times key pressed
            setTimeout(function() { ytButtonDelay = true; }, 400);  // Delay in milliseconds
        }
    }
    // Back 10s
    if( keyboard.pressed("J") ) {  // J key 
        if (ytButtonDelay) {
            let currentTime = ytPlayer.getCurrentTime();
            
            let newTime = currentTime - 5;
            ytPlayer.seekTo(newTime);
            ytPlayer2.seekTo(newTime);
            
            ytButtonDelay = false;
            // Delay amount of times key pressed
            setTimeout(function() { ytButtonDelay = true; }, 400);  // Delay in milliseconds
        }
    }
    // Forward 10s
    if( keyboard.pressed("L") ) {  // L key 
        if (ytButtonDelay) {
            let currentTime = ytPlayer.getCurrentTime();
            
            let newTime = currentTime + 5;
            ytPlayer.seekTo(newTime);
            ytPlayer2.seekTo(newTime);

            ytButtonDelay = false;
            // Delay amount of times key pressed
            setTimeout(function() { ytButtonDelay = true; }, 400);  // Delay in milliseconds
        }
    
    }

    // Movement controls
    if( keyboard.pressed("W") ) {  // W key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += Math.cos(camera.rotation.y) * player.speed;
    }
    if( keyboard.pressed("S") ) {  // S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= Math.cos(camera.rotation.y) * player.speed;
    }
    if( keyboard.pressed("A") ) {  // A key
        camera.position.x -= Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
        camera.position.z -= Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
    }
    if( keyboard.pressed("D") ) {  // D key
        camera.position.x -= Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
        camera.position.z -= Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }

    if( keyboard.pressed("shift") ) {  // Shift key - Float down
        // if (camera.position.y > 0.5){
        // }
        camera.position.y -= Math.sin(Math.PI/2) * player.speed;
    }
    if( keyboard.pressed("space") ) {  // Space key - Float up
        // if (camera.position.y < mainRoom.dimensions.height-0.5) {
        // }
        camera.position.y += Math.sin(Math.PI/2) * player.speed;
    }

    if( keyboard.pressed("R") ) { // R key - Reset camera height
        camera.position.y = player.height;
        camera.fov = 60;
        camera.updateProjectionMatrix();
    }

    if( keyboard.pressed("left") ) {  // Left arrow key
        if (camera.rotation.x > -Math.PI) {  // Rotate back up before sideways
            camera.rotation.x -= player.turnSpeed;
        }
        else if (camera.rotation.y > -1.5) {  // Move sideways with limit 90 degress
            camera.rotation.y -= player.turnSpeed;
        }
    }
    if( keyboard.pressed("right") ) {  // Right arrow key
        if (camera.rotation.x > -Math.PI) {  // Rotate back up before sideways
            camera.rotation.x -= player.turnSpeed;
        }
        else if (camera.rotation.y < Math.PI/2) {  // Move sideways with limit 90 degress
            camera.rotation.y += player.turnSpeed;
        }
    }
    if( keyboard.pressed("up") ) {  // Up arrow key
        // Tilt back up
        if ( camera.rotation.x > -Math.PI ) {
            camera.rotation.x -= player.turnSpeed;
        }
    }
    if( keyboard.pressed("down") ) {  // Down arrow key
        // Tilt down
        if ( camera.rotation.y < -0.05 ) {
            camera.rotation.y += player.turnSpeed;
        }
        else if ( camera.rotation.y > 0.05 ) {
            camera.rotation.y -= player.turnSpeed;
        }
        else if ( camera.rotation.x < -Math.PI/2 ) {
            camera.rotation.x += player.turnSpeed;
        }
    }

    // Painting controls
    if( keyboard.pressed("T") ) {  // T key
        // Paintings
        movingWallPieces(leftWall);
        movingWallPieces(rightWall);
    }
    if( keyboard.pressed("G") ) {  // G key
        // Paintings
        movingWallPieces(leftWall, false);
        movingWallPieces(rightWall, false);
    }
    // Camera tilt up/down
    if( keyboard.pressed("Y") ) {  // Y key

    }
    if( keyboard.pressed("H") ) {  // H key

    }
    


    // Video controls
    // if( keyboard.pressed("P") ) {  // P key - Toggle video play
    //     if (keyboardWaitDelay) {
    //         let currentVideo = videos[currentVideoIndex].video;
    //         if (currentVideo.paused) { currentVideo.play(); }
    //         else{ currentVideo.pause(); }
    //         keyboardWaitDelay = false;

    //         // Delay amount of times key pressed
    //         setTimeout(function() { keyboardWaitDelay = true; }, 400);  // Delay in milliseconds
    //     }
    // }
    // if( keyboard.pressed("M") ) {  // M key - Toggle video mute
    //     if (keyboardWaitDelay) {
    //         let currentVideo = videos[currentVideoIndex].video;
    //         currentVideo.muted = !currentVideo.muted;
    //         keyboardWaitDelay = false;
            
    //         // Delay amount of times key pressed
    //         setTimeout(function() { keyboardWaitDelay = true; }, 400);  // Delay in milliseconds
    //     }
    // }
    // if( keyboard.pressed("O") ) {  // O key - Stop video
    //     if (keyboardWaitDelay) {
    //         let currentVideo = videos[currentVideoIndex].video;
    //         currentVideo.currentTime = 0;
    //         currentVideo.pause();
    //         keyboardWaitDelay = false;
            
    //         // Delay amount of times key pressed
    //         setTimeout(function() { keyboardWaitDelay = true; }, 400);  // Delay in milliseconds
    //     }
    // }
    // if( keyboard.pressed("L") ) {  // L key - Select Next video
    //     if (keyboardWaitDelay) {
    //         // let currentVideo = videos[currentVideoIndex].video;
    //         // currentVideo.pause();
    //         if (currentVideoIndex < videos.length-1) {
    //             currentVideoIndex++;
    //         }
    //         else {
    //             currentVideoIndex = 0;
    //         }
    //         // videos[currentVideoIndex].video.play();  // Autoplay new video
    //         keyboardWaitDelay = false;
            
    //         // Delay amount of times key pressed
    //         setTimeout(function() { keyboardWaitDelay = true; }, 400);  // Delay in milliseconds
    //     }
    // }
    // if( keyboard.pressed("K") ) {  // K key - Select Previous video
    //     if (keyboardWaitDelay) {
    //         // let currentVideo = videos[currentVideoIndex].video;
    //         // currentVideo.pause();
    //         if (currentVideoIndex > 0) {
    //             currentVideoIndex--;
    //         }
    //         else {
    //             currentVideoIndex = videos.length-1;
    //         }
    //         // videos[currentVideoIndex].video.play();  // Autoplay new video
    //         keyboardWaitDelay = false;
            
    //         // Delay amount of times key pressed
    //         setTimeout(function() { keyboardWaitDelay = true; }, 400);  // Delay in milliseconds
    //     }
    // }


}