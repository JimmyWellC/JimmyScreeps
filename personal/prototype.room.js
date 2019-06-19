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
                let source1DistanceWall = wallCheck(Terrain, x - 1, y - 1) + wallCheck(Terrain, x, y - 1)
                    + wallCheck(Terrain, x + 1, y - 1) + wallCheck(Terrain, x - 1, y)
                    + wallCheck(Terrain, x + 1, y) + wallCheck(Terrain, x - 1, y + 1)
                    + wallCheck(Terrain, x, y + 1) + wallCheck(Terrain, x + 1, y + 1)


            }
        }
    };

wallCheck =
    function (Terrain, x, y) {
    /** */
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