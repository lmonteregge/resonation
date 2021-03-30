// Deprecated methods to add gallery objects

const addPainting = function (url, placardText, wall) {
    let painting = createPainting( url );
    let placard;
    if (placardText) {
        placard = createPlacard( placardText );
    }
    else { placard = null; }

    wall.gallery.push(painting);
    wall.galleryText.push(placard);

}

const addMovie = function (url, placardText, wall) {
    let movie = createMovie( url );
    let placard;
    if (placardText) {
        placard = createPlacard( placardText );
    }
    else { placard = null; }

    wall.gallery.push(movie);
    wall.galleryText.push(placard);

}



// Room

const addRoom = function () {

    // Main Room //

    let wallpaperUrl = "https://raw.githubusercontent.com/lmonteregge/resonation/main/media/background1.jpg";
    // let wallpaperUrl = "https://raw.githubusercontent.com/lmonteregge/resonation/main/media/background2.png";
    // let wallpaperUrl = "https://i.imgur.com/93MG3HS.jpg";
    // let wallpaperUrl = "media/DuckLight2.png";

    // Meshfloor
    let mainFloor = createFloor({width: mainRoom.dimensions.width, height: mainRoom.dimensions.depth-sculptureRoom.dimensions.depth, wallpaperUrl: wallpaperUrl});
    // meshFloor.receiveShadow = true;
    mainFloor.position.z += sculptureRoom.dimensions.depth/2;
    scene.add( mainFloor );

    // Mesh ceiling
    let mainCeiling = createFloor({width: mainRoom.dimensions.width, height: mainRoom.dimensions.depth, wallpaperUrl: wallpaperUrl});
    mainCeiling.rotation.x += Math.PI;
    mainCeiling.position.y += mainRoom.dimensions.height;
    scene.add( mainCeiling );
    
    // North wall - Front)
    let mainNorthWall = createWall({width: mainRoom.dimensions.width, height: mainRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    mainNorthWall.rotation.y -= Math.PI;
    mainNorthWall.position.z += mainRoom.dimensions.depth/2;
    scene.add( mainNorthWall );
    // South wall - Back)
    let mainSouthWall = createWall({width: mainRoom.dimensions.width, height: mainRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    mainSouthWall.position.z -= mainRoom.dimensions.depth/2;
    scene.add( mainSouthWall );
    // West wall - Left)
    let mainWestWall = createWall({width: mainRoom.dimensions.depth, height: mainRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    mainWestWall.rotation.y -= Math.PI/2;
    mainWestWall.position.x += mainRoom.dimensions.width/2;
    scene.add( mainWestWall );
    // East wall - Right)
    let mainEastWall = createWall({width: mainRoom.dimensions.depth, height: mainRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    mainEastWall.rotation.y += Math.PI/2;
    mainEastWall.position.x -= mainRoom.dimensions.width/2;
    scene.add( mainEastWall );


    // Sculpture room //
    // Floor
    let sFloor = createFloor({width: sculptureRoom.dimensions.width, height: sculptureRoom.dimensions.depth, wallpaperUrl: wallpaperUrl});
    sFloor.position.y -= sculptureRoom.dimensions.height;
    sFloor.position.z -= (mainRoom.dimensions.depth/2) - sculptureRoom.dimensions.depth/2;
    scene.add( sFloor );

    // North wall - Front)
    let sNorthWall = createWall({width: sculptureRoom.dimensions.width, height: sculptureRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    sNorthWall.rotation.y -= Math.PI;
    sNorthWall.position.y -= sculptureRoom.dimensions.height;
    sNorthWall.position.z -= (mainRoom.dimensions.depth/2) - sculptureRoom.dimensions.depth;
    scene.add( sNorthWall );
    // South wall - Back)
    let sSouthWall = createWall({width: sculptureRoom.dimensions.width, height: sculptureRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    sSouthWall.position.y -= sculptureRoom.dimensions.height;
    sSouthWall.position.z -= mainRoom.dimensions.depth/2;
    scene.add( sSouthWall );
    // West wall - Left)
    let sWestWall = createWall({width: sculptureRoom.dimensions.depth, height: sculptureRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    sWestWall.rotation.y -= Math.PI/2;
    sWestWall.position.x += sculptureRoom.dimensions.width/2;
    sWestWall.position.y -= sculptureRoom.dimensions.height;
    sWestWall.position.z -= (mainRoom.dimensions.depth/2) - sculptureRoom.dimensions.depth/2;
    scene.add( sWestWall );
    // East wall - Right)
    let sEastWall = createWall({width: sculptureRoom.dimensions.depth, height: sculptureRoom.dimensions.height, wallpaperUrl: wallpaperUrl});
    sEastWall.rotation.y += Math.PI/2;
    sEastWall.position.x -= sculptureRoom.dimensions.width/2;
    sEastWall.position.y -= sculptureRoom.dimensions.height;
    sEastWall.position.z -= (mainRoom.dimensions.depth/2) - sculptureRoom.dimensions.depth/2;
    scene.add( sEastWall );

}

const addToGallery = function () {

    // let cube = createBox();
    // scene.add( cube );

    // Left wall
    let painting = createPainting( 'https://raw.githubusercontent.com/jeremyt0/lichess-bot/master/readme/original_1.PNG' );
    leftWall.pieces.push( painting );

    let painting2 = createPainting( 'https://raw.githubusercontent.com/jeremyt0/lichess-bot/master/readme/challengefriendscreen.png' );
    leftWall.pieces.push( painting2 );
    
    let painting3 = createPainting( 'https://raw.githubusercontent.com/jeremyt0/lichess-bot/master/readme/light_mask_1.PNG' );
    leftWall.pieces.push( painting3 );

    // Moving painting
    // let binMan = createMovingPainting("https://raw.githubusercontent.com/lmonteregge/resonation/main/media/Bin-man-horizontal.png",24)
    // leftWall.pieces.push(binMan)


    // Right wall
    let painting4 = createPainting( 'https://raw.githubusercontent.com/jeremyt0/lichess-bot/master/readme/diagonal_solution/original_1.PNG' );
    rightWall.pieces.push( painting4 );

    
    // Centre wall (Movie)

    // Add alpha screen
    let blankScreen = createCustomPlane( {width: mainRoom.dimensions.width-1, height: mainRoom.dimensions.height-1} );
    blankScreen.position.y += mainRoom.dimensions.height/2;
    blankScreen.position.z += (mainRoom.dimensions.depth/2)-0.1;
    blankScreen.rotation.y += Math.PI;

    scene.add(blankScreen);

    // let movie = createMovie( 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' );
    // frontWall.pieces.push( movie )
    // let movie2 = createMovie( 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' );
    // frontWall.pieces.push( movie2 )
    // let testMovie = createMovie( 'https://www.dropbox.com/s/oe9q4mnq0oiz5bs/small.mp4' );
    // frontWall.pieces.push( testMovie )





}

const positionGalleryPieces = function () {
    // Left wall
    for (let i = 0; i < leftWall.pieces.length; i++) {
        let piece = leftWall.pieces[i];
        
        piece.position.y = player.height;
        piece.position.x = leftWall.position.x;
        piece.position.z += i * 2.5;
        
        piece.rotation.y += Math.PI/2;
        scene.add( piece );
    }
    // Right wall
    for (let i = 0; i < rightWall.pieces.length; i++) {
        let piece = rightWall.pieces[i];
        
        piece.position.y = player.height;
        piece.position.x = rightWall.position.x;
        piece.position.z += i * 2.5;
        
        piece.rotation.y += Math.PI/2;
        scene.add( piece );
    }
    // Front wall
    for (let i = 0; i < frontWall.pieces.length; i++) {
        let mov = frontWall.pieces[i];

        mov.position.y = player.height;
        mov.position.z = frontWall.position.z-0.1;
        mov.position.x = -((frontWall.dims.width+5)/2) + (((frontWall.dims.width+5)/(frontWall.pieces.length+1)) * (i+1));
        
        mov.rotation.y += Math.PI;
        scene.add( mov );
    }

}

const addToPodium = function () {
    const setPodiumPosition = (obj) => {
        obj.position.y -= podium.position.y;
        obj.position.z -= podium.position.z;
    }

    // let base = createBox(1,1,2, 'yellow');
    // setPodiumPosition(base)
    // podium.base = base;
    // scene.add( podium.base );


    let box1 = createBox(1,1,1, 'blue');
    setPodiumPosition(box1)
    podium.pieces.push(box1);
    scene.add(box1);
    
    let box2 = createBox(1,1,1, 'green');
    setPodiumPosition(box2)
    podium.pieces.push(box2);
    scene.add(box2);
    
    let box3 = createBox(1,1,1, 'red');
    setPodiumPosition(box3)
    podium.pieces.push(box3);
    scene.add(box3);


}






// Lights

const addLights = function () {
    // Ambient light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    // Light
    ceilingLight = createLight();
    ceilingLight.position.set(0, 3, 0);  // x,y,z


    scene.add(ceilingLight);

}
