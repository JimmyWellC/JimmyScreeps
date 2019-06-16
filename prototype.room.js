// var Constructions = {
//     Extension: require('build.extension')
// };


Room.prototype.roomSpawnsCount = function () {
    return this.find(FIND_MY_SPAWNS).length
};


Room.prototype.memoryInitialization=
    function () {
        let controllerLevel = this.controller.level;
        if (controllerLevel===2){
            this.memory.containSources = this.find(FIND_SOURCES).map(s => s.id);
            // console.log("source:", this.memory.containSources);
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