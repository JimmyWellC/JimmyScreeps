// var Constructions = {
//     Extension: require('build.extension')
// };


Room.prototype.roomSpawnsCount = function () {
    return this.find(FIND_MY_SPAWNS).length
};


Room.prototype.sourceMemoryInitialization =
    function () {
        const controllerLevel = this.controller.level;
        const Terrain = Game.map.getRoomTerrain(this.name)
        if (controllerLevel === 2) {
            this.memory.containSourceId = this.find(FIND_SOURCES).map(s => s.id);
            // console.log("source:", this.memory.containSourceId);
            for (let sourceId of this.memory.containSourceId) {
                let source = Game.getObjectById(sourceId);
                let sourcePosition = source.pos;
                let x = sourcePosition.x;
                let y = sourcePosition.y;
                // let source1DistanceWall = wallCheck(Terrain, x - 1, y - 1) + wallCheck(Terrain, x, y - 1)
                //     + wallCheck(Terrain, x + 1, y - 1) + wallCheck(Terrain, x - 1, y)
                //     + wallCheck(Terrain, x + 1, y) + wallCheck(Terrain, x - 1, y + 1)
                //     + wallCheck(Terrain, x, y + 1) + wallCheck(Terrain, x + 1, y + 1);
                // var source1DistanceWall = [];
                let source1DistanceWall = {};
                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y - 1; j < y + 1; j++) {
                        //check if (i,j) is a wall
                        if (i === x && j === y) {
                            source1DistanceWall[(i, j)] = "Source";
                        } else {
                            source1DistanceWall[(i, j)] = wallCheck(Terrain, i, j)
                        }
                    }
                }



                for (let i = -5; i <= 5; i++) {
                    for (let j = -5; j <= 5; j++) {
                        if ((i === j || i === -j || i === 0 || j === 0)) {
                            this.createFlag(x + i, y + j, undefined, COLOR_RED, COLOR_RED)
                        }

                    }
                }

                for (let i = -5; i <= 5; i++) {
                    for (let j = -5; j <= 5; j++) {
                        // 排除所有的奇数点
                        if ((i + j) % 2)
                            continue;
                        // 排除中心9宫格
                        else if (i >= -1 && i <= 1 && j >= -1 && j <= 1)
                            continue;
                        // 找到开辟好的Road
                        else if (i === j || i === -j || i === 0 || j === 0)
                            continue;
                        else if () {

                        }
                        finish
                    }
                }

            }
        }
    };

wallCheck =
    function (Terrain, x, y) {
        /** Return 1 if (x,y) is not a wall.
         *  Return 0 if (x,y) is a wall. */
        if (Terrain.get(x, y) !== TERRAIN_MASK_WALL) {
            return 1
        } else {
            return 0
        }
    };


Room.prototype.spawnSpawnsIfNecessary =
    function () {
        let controllerLevel = this.controller.level,
            roomSpawnsCount = this.prototype.roomSpawnsCount;
        // console.log("room controller level:", controllerLevel);
        // console.log(roomName, "room spawn count:", roomSpawnsCount);
        if ((controllerLevel === 7 && roomSpawnsCount === 1) || (controllerLevel === 8 && roomSpawnsCount === 2)) {
            createNewSpawn(roomPicked);
        }
    };

Room.prototype.buildConstructionSite =
    function () {
        for (con in Constructions) {
            con.run(this);
        }
    };