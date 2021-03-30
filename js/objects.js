
// Objects
const createBox = function (width=1, height=1, depth=1, color=0x00ff00) {
    let cube = new THREE.Mesh( 
        new THREE.BoxGeometry(width, height, depth),
        new THREE.MeshPhongMaterial( { color: color } )
    );
    cube.position.y += height/2;
    cube.receiveShadow = true;
    cube.castShadow = true;
    return cube;
}

const createPlane = function (width=10, height=10, widthSeg=10, heightSeg=10, wireframe=false){
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height, widthSeg, heightSeg),
        new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe:wireframe })
    );
    plane.receiveShadow = true;
    plane.castShadow = true;
    return plane;
}


const createCustomPlane = function ({width=10, height=10, widthSeg=10, heightSeg=10, wireframe=false, url=null}) {
    let textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load( url, function (tex) {
        let texWidth = texture.image.width, texHeight = texture.image.height;
        // console.log(texture)
        // console.log(width, height);
        // console.log(texWidth, texHeight);

        // texture.repeat.set( height/texHeight, texWidth/width );
    } );
    texture.wrapS = THREE.RepeatWrapping; 
    texture.wrapT = THREE.RepeatWrapping;

    // texture.repeat.set( 4, 4 ); 

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height, widthSeg, heightSeg),
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            map: texture,
            side: THREE.FrontSide,
            wireframe: wireframe,
        })
    );

    return plane;
}


const createPainting = function (url) {
    let boxGeometry = new THREE.BoxGeometry(1,1,0.2);
    let textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load( url, function (tex) {
        let ratio = texture.image.width/ texture.image.height;
        let width = 2;
        let height = width/ratio;
        painting.scale.x = width;
        painting.scale.y = height;
    } );

    let painting = new THREE.Mesh(
        boxGeometry,
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            map: texture,
            side: THREE.FrontSide,
        })
    );

    return painting;
}

const createMovingPainting = function (url="https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/run.png", frames=10, duration=100) {
    console.log(url)

    let runnerGeometry = new THREE.BoxGeometry(1, 1, 0.2);
    let textureLoader = new THREE.TextureLoader();
    let runnerTexture = textureLoader.load( url, function (tex) {
        let singleFrameWidth = runnerTexture.image.width/frames;
        let ratio = singleFrameWidth/ runnerTexture.image.height;
        let width = 2;
        let height = width/ratio;
        runner.scale.x = width;
        runner.scale.y = height;
    } );

    let animator = new TextureAnimator( runnerTexture, frames, 1, frames, duration ); // texture, #horiz, #vert, #total, duration.
    animators.push(animator)

	let runner = new THREE.Mesh(
        runnerGeometry,         
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            map: runnerTexture,
            side: THREE.FrontSide,
        })
    );

    return runner;
}


const createMovie = function ( src ) {
    
    let video = document.createElement( 'video' );
    document.getElementById('videos-container').appendChild(video);

    // Video settings
    video.src = src;
    video.crossOrigin = "anonymous";
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    video.controls = true;
    video.style.maxWidth = "240px";
    // video.style.visibility = 'hidden';

    video.addEventListener("resize", ev => {
        let w = video.videoWidth/300;
        let h = video.videoHeight/300;

        video.style.width = w;
        video.style.height = h;
        video.videoWidth = w;
        video.videoHeight = h;

        videoImage.width = w*100;
        videoImage.height = h*100;

        videoImageContext.fillRect(5, 5, videoImage.width, videoImage.height)

        movieScreen.scale.x = w;
        movieScreen.scale.y = h;

        v.width = videoImage.width;
        v.height = videoImage.height;

    }, false);

	let videoImage = document.createElement( 'canvas' );

	let videoImageContext = videoImage.getContext( '2d' );
	// background color if no video present
    videoImageContext.fillStyle = 'white';

	let videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
    
    // Object plane
    let movieScreen = new THREE.Mesh(
        new THREE.PlaneGeometry( 1, 1, 1, 1),
        new THREE.MeshBasicMaterial( { 
            map: videoTexture, 
            side:THREE.DoubleSide 
        } )
    );
    
    // Custom Video object for attributes
    let v = {
        video: video, 
        imageContext: videoImageContext, 
        texture: videoTexture,
        width: 1,
        height: 1
    }
    videos.push(v);

    return movieScreen;

}
 

function createLabel(text) {
    let canvas = document.createElement("canvas");
    // document.getElementById('images-container').appendChild(canvas);
    let context = canvas.getContext("2d");
    context.font = "24pt Source Serif Pro";
    context.fillStyle = '#4682b4';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.fillRect(10, 10, canvas.width-20, canvas.height-20);
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text,canvas.width/2,canvas.height/2);

    return canvas
}

function createPlacard(text) {
    let canvas = createLabel(text);
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.8, 0.2), 
        new THREE.MeshBasicMaterial({
            map : texture,
            side: THREE.FrontSide
        })
    );
    mesh.overdraw = true;
    // mesh.doubleSided = true;

    return mesh;
}


// Dimensions
const createWall = function ({width=10, height=10, widthSeg=10, heightSeg=10, wireframe=false, wallpaperUrl="https://i.imgur.com/93MG3HS.jpg"}){
    let wall = createCustomPlane({width: width, height: height, widthSeg: widthSeg, heightSeg: heightSeg, wireframe: wireframe, url: wallpaperUrl});
    wall.position.y += height/2;
    return wall;
}

const createFloor = function ({width=10, height=10, widthSeg=10, heightSeg=10, wireframe=false, wallpaperUrl="https://i.imgur.com/93MG3HS.jpg"}){
    let floor = createCustomPlane({width: width, height: height, widthSeg: widthSeg, heightSeg: heightSeg, wireframe: wireframe, url: wallpaperUrl});
    floor.rotation.x -= Math.PI / 2;
    return floor;
}



const createLight = function () {
    let light = new THREE.PointLight(0xffffff, 1, 25);
    
    light.castShadow = true;
    // light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 1, 5000));
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    return light
}



function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}		


