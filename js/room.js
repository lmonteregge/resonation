class Room {
    constructor(dimensions=[20,10,20], centerPoint=[0,0,0]){
        this.dimensions = {
            width:dimensions[0],
            height:dimensions[1],
            length:dimensions[2]
        };
        this.points = {
            center: {
                x: centerPoint[0],
                y: centerPoint[1],
                z: centerPoint[2]
            }
        };
        this.walls = {
            north:  {wall:null, wallType:null, gallery: [], galleryText: []},
            south:  {wall:null, wallType:null, gallery: [], galleryText: []},
            west:   {wall:null, wallType:null, gallery: [], galleryText: []},
            east:   {wall:null, wallType:null, gallery: [], galleryText: []}
        }
        this.floors = { floor: null, ceiling:null };
        this.lights = [];
    }

    setNorthWall(type=null) {
        if (type == true) {
            let wall = createWall(this.dimensions.width, this.dimensions.height);
            wall.position.x = this.points.center.x;
            wall.position.z = this.points.center.z;  // Center point
            wall.rotation.y -= Math.PI;
            wall.position.z += this.dimensions.length/2;
            this.walls.north.wall = wall;
        }
        if (type == 'door') {
            let doorWidth = this.dimensions.width/4;
            let door = createBox(doorWidth, this.dimensions.height, 0.2, 0xffffff);
            door.position.x = this.points.center.x;
            door.position.z = this.points.center.z;  // Center point
            door.rotation.y -= Math.PI;
            door.position.x += (this.dimensions.width/3) + (door.geometry.parameters.width/2);
            door.position.z += this.dimensions.length/2;
            this.walls.north.wall = door;
        }
        if (type == 'block') {
            let blockWidth = this.dimensions.width/2;
            let block = createBox(blockWidth, this.dimensions.height, 0.2, 0xffffff);
            block.position.x = this.points.center.x;
            block.position.z = this.points.center.z;  // Center point
            block.rotation.y -= Math.PI;
            block.position.z += this.dimensions.length/2;
            this.walls.north.wall = block;
        }
        this.walls.north.wallType = type;

    }

    setSouthWall(type=null) {
        if (type == true) {
            let wall = createWall(this.dimensions.width, this.dimensions.height);
            wall.position.x = this.points.center.x;
            wall.position.z = this.points.center.z;  // Center point
            wall.position.z -= this.dimensions.length/2;
            this.walls.south.wall = wall;
        }
        if (type == 'door') {
            let doorWidth = this.dimensions.width/4;
            let door = createBox(doorWidth, this.dimensions.height, 0.2, 0xffffff);
            door.position.x = this.points.center.x;
            door.position.z = this.points.center.z;  // Center point
            door.position.x -= (this.dimensions.width/4) + (door.geometry.parameters.width/2);
            door.position.z -= this.dimensions.length/2;
            this.walls.south.wall = door;
        }
        if (type == 'block') {
            let blockWidth = this.dimensions.width/2;
            let block = createBox(blockWidth, this.dimensions.height, 0.2, 0xffffff);
            block.position.x = this.points.center.x;
            block.position.z = this.points.center.z;  // Center point
            block.rotation.y -= Math.PI;
            block.position.z -= this.dimensions.length/2;
            this.walls.south.wall = block;
        }
        this.walls.south.wallType = type;

    }

    setWestWall(type=null) {
        if (type == true) {
            let wall = createWall(this.dimensions.length, this.dimensions.height);
            wall.position.x = this.points.center.x;
            wall.position.z = this.points.center.z;  // Center point
            wall.rotation.y -= Math.PI/2;
            wall.position.x += this.dimensions.width/2;
            this.walls.west.wall = wall;
        }
        if (type == 'door') {
            let doorWidth = this.dimensions.length/4;
            let door = createBox(doorWidth, this.dimensions.height, 0.2, 0xffffff);
            door.position.x = this.points.center.x;
            door.position.z = this.points.center.z;  // Center point
            door.rotation.y -= Math.PI/2;
            door.position.x += this.dimensions.width/2;
            door.position.z -= doorWidth + (door.geometry.parameters.width/2);
            this.walls.west.wall = door;
        }
        if (type == 'block') {
            let blockWidth = this.dimensions.length/2;
            let block = createBox(blockWidth, this.dimensions.height, 0.2, 0xffffff);
            block.position.x = this.points.center.x;
            block.position.z = this.points.center.z;  // Center point
            block.rotation.y -= Math.PI/2;
            block.position.x += this.dimensions.width/2;
            this.walls.west.wall = block;
        }
        this.walls.south.wallType = type;

    }

    setEastWall(type=null) {
        if (type == true) {
            let wall = createWall(this.dimensions.length, this.dimensions.height);
            wall.position.x = this.points.center.x;
            wall.position.z = this.points.center.z;  // Center point
            wall.rotation.y += Math.PI/2;
            wall.position.x -= this.dimensions.width/2;
            this.walls.east.wall = wall;
        }
        if (type == 'door') {
            let doorWidth = this.dimensions.length/4;
            let door = createBox(doorWidth, this.dimensions.height, 0.2, 0xffffff);
            door.position.x = this.points.center.x;
            door.position.z = this.points.center.z;  // Center point
            door.rotation.y += Math.PI/2;
            door.position.x -= this.dimensions.width/2;
            door.position.z += doorWidth + (door.geometry.parameters.width/2);
            this.walls.east.wall = door;
        }
        if (type == 'block') {
            let blockWidth = this.dimensions.length/2;
            let block = createBox(blockWidth, this.dimensions.height, 0.2, 0xffffff);
            block.position.x = this.points.center.x;
            block.position.z = this.points.center.z;  // Center point
            block.rotation.y += Math.PI/2;
            block.position.x -= this.dimensions.width/2;
            this.walls.east.wall = block;
        }
        this.walls.south.wallType = type;

    }

    createWalls(north=false, south=false, west=false, east=false) {
        this.setNorthWall(north);
        this.setSouthWall(south);
        this.setWestWall(west);
        this.setEastWall(east);
    }
    createFloors(floor=true, ceiling=true) {
        if (floor) {
            let f = createFloor(this.dimensions.width, this.dimensions.length);
            f.position.x = this.points.center.x;
            f.position.z = this.points.center.z;  // Center point
            this.floors.floor = f;
        }

        if (ceiling) {
            let c = createFloor(this.dimensions.width, this.dimensions.length);
            c.position.x = this.points.center.x;
            c.position.z = this.points.center.z;  // Center point
            c.position.y += this.dimensions.height;
            c.rotation.x += Math.PI;
            this.floors.ceiling = c;
        }

    }

    renderWalls() {
        for (var i in this.walls) {
            let wall = this.walls[i].wall;
            if (wall != null) {
                scene.add(wall);
            }
        }
    }
    renderFloors() {
        for (var i in this.floors) {
            let x = this.floors[i];
            if (x){
                scene.add(x);
            }
        }
    }
    
    addLights() {
        // Light
        let ceilingLight = createLight();
        console.log(this.points.center)
        ceilingLight.position.set(this.points.center.x, this.dimensions.height, this.points.center.y)
        scene.add(ceilingLight);
    }

    addToNorthWall(object, placard=null) {
        this.walls.north.gallery.push(object);
        this.walls.north.galleryText.push(placard);
    }
    addToSouthWall(object, placard=null) {
        this.walls.south.gallery.push(object);
        this.walls.south.galleryText.push(placard);
    }
    addToWesthWall(object, placard=null) {
        this.walls.west.gallery.push(object);
        this.walls.west.galleryText.push(placard);
    }
    addToEastWall(object, placard=null) {
        this.walls.east.gallery.push(object);
        this.walls.east.galleryText.push(placard);
    }
    renderNorthWallPieces() {

        console.log("Rendering north wall");

        
        // if (this.walls.north.wallType == true || this.walls.north.wallType == 'block') {
        if (this.walls.north.wallType != null) {
            
            if (this.walls.north.gallery.length) {
                let width = this.walls.north.wall.geometry.parameters.width;
                for (let i = 0; i < this.walls.north.gallery.length; i++) {
                    let piece = this.walls.north.gallery[i];
                    // let placard = this.walls.north.galleryText[i];
                    
                    let positionX = -(width/2) + ((width/(this.walls.north.gallery.length+1)) * (i+1));
                    // var positionY = (player.height/2) + (piece.geometry.parameters.height/2);
                    piece.position.x = this.points.center.x;
                    piece.position.y = player.height;
                    piece.position.z = this.points.center.z;
                    
                    piece.position.x += positionX;
                    // piece.position.y += piece.position.y;
                    piece.position.z += (this.dimensions.length/2)-0.01;
                    
                    piece.rotation.y += Math.PI;
                    scene.add( piece );
            
                    let placard = this.walls.north.galleryText[i];
                    if (placard) {
                        placard.position.x += piece.position.x;
                        placard.position.y += placard.geometry.parameters.height/2;
                        // placard.position.y += positionY + (piece.geometry.parameters.height/2) + (placard.geometry.parameters.height/2);
                        placard.position.z += piece.position.z;
    
                        placard.rotation.y += piece.rotation.y;
                        scene.add( placard );
                    }
                }
            }

        }
        // }
        // else if (this.walls.north.wallType == 'door') {
        //     console.log("North painting on Door");
        // }

    }
    renderSouthWallPieces() {

        if (this.walls.south.wallType) {
            if (this.walls.south.gallery.length) {
                let width = this.walls.south.wall.geometry.parameters.width;
                for (let i = 0; i < this.walls.south.gallery.length; i++) {
                    let piece = this.walls.south.gallery[i];
                    let positionX = -(width/2) + ((width/(this.walls.south.gallery+1)) * (i+1));
                    // var positionY = (player.height/2) + (piece.geometry.parameters.height/2);
                    let positionY = (player.height);
                    piece.position.x = this.points.center.x;
                    piece.position.y = player.height;
                    piece.position.z = this.points.center.z;
                    
                    piece.position.x += positionX;
                    piece.position.y += positionY;
                    piece.position.z -= (width/2)-0.01;
                    scene.add( piece );
                    
                    let placard = this.walls.south.galleryText[i];
                    if (placard) {
                        placard.rotation.y += piece.rotation.y;
                        placard.position.x += piece.position.x;
                        // placard.position.y += positionY + (piece.geometry.parameters.height/2) + (placard.geometry.parameters.height/2);
                        placard.position.y += placard.geometry.parameters.height/2;
                        placard.position.z -= piece.position.z;
                        scene.add( placard );
                    }
                }
            }
        }

    }
    renderWestWallPieces() {
        
        if (this.walls.west.wallType) {
            if (this.walls.west.gallery.length) {
                let width = this.walls.west.wall.geometry.parameters.width;
                for (let i = 0; i < this.walls.west.gallery.length; i++) {
                    let piece = this.walls.west.gallery[i];
                    let positionZ = -(width/2) + ((width/(this.walls.west.gallery.length+1)) * (i+1));
                    // var positionY = (player.height/2) + (piece.geometry.parameters.height/2);
                    let positionY = (player.height);
                    piece.position.x = this.points.center.x;
                    piece.position.y = player.height;
                    piece.position.z = this.points.center.z;
            
                    piece.rotation.y += Math.PI/2;
                    piece.position.x += (width/2)-0.01;
                    piece.position.y += positionY;
                    piece.position.z += positionZ;
                    scene.add( piece );
            
                    let placard = this.walls.west.galleryText[i];
                    if (placard) {
                        placard.rotation.y += piece.rotation.y;
                        placard.position.x += piece.position.x;
                        // placard.position.y += positionY + (piece.geometry.parameters.height/2) + (placard.geometry.parameters.height/2);
                        placard.position.y += placard.geometry.parameters.height/2;
                        placard.position.z += positionZ;
                        scene.add( placard );
                    }
                }
            }
        }

    }
    renderEastWallPieces() {

        if (this.walls.east.wallType) {
            if (this.walls.east.gallery.length) {
                let width = this.walls.east.wall.geometry.parameters.width;
                for (let i = 0; i < this.walls.east.gallery.length; i++) {
                    let piece = this.walls.east.gallery[i];
                    let positionZ = -(width/2) + ((width/(this.walls.east.gallery.length+1)) * (i+1));
                    // var positionY = (player.height/2) + (piece.geometry.parameters.height/2);
                    let positionY = (player.height);
                    piece.position.x = this.points.center.x;
                    piece.position.y = player.height;
                    piece.position.z = this.points.center.z;
            
                    piece.rotation.y -= Math.PI/2;
                    piece.position.x -= (width/2)-0.01;
                    piece.position.y += positionY;
                    piece.position.z += positionZ;
                    scene.add( piece );
            
                    let placard = this.walls.east.galleryText[i];
                    if (placard) {
                        placard.rotation.y += piece.rotation.y;
                        placard.position.x += piece.position.x;
                        // placard.position.y += positionY + (piece.geometry.parameters.height/2) + (placard.geometry.parameters.height/2);
                        placard.position.y += placard.geometry.parameters.height/2;
                        placard.position.z += positionZ;
                        scene.add( placard );
                    }
                }
            }
        }

    }

    renderWallPieces() {
        this.renderNorthWallPieces();
        this.renderSouthWallPieces();
        this.renderWestWallPieces();
        this.renderEastWallPieces();

    }

    // moveAlongY(x=0) {
    //     for (var i in this.walls) {
    //         let wall = this.walls[i];
    //         console.log(wall);
    //         // wall.position.y += x;
    //     }
    // }

}