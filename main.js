// import modules
require('prototype.spawn');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');


module.exports.loop = function () {
    // var room1 = Game.rooms['W8N3'];
    // var a = room1.controller.pos;
    // var rn = room1.name;
    // var x = a.x;
    // var y = a.y;//asdasdasd
    // var aa = new RoomPosition(x - 1, y, rn);

    // console.log(room.createConstructionSite(x, y, "extension"));

    // console.log();
    // T = Game.map.getRoomTerrain('W8N3');
    // console.log(T.get(29, 21));
    //
    // const AA = new RoomPosition(10, 16, rn);
    // const BB = new RoomPosition(15, 16, rn);
    //
    // // const Path1 = room1.findPath(AA, BB, {ignoreCreeps: true});
    // // const Path2 = room1.findPath(BB, AA);
    //
    // // console.log(Path1[0].direction);
    //

    // const B = Game.creeps['Samuel'];
    // B.memory.role = 'aaa';
    // B.memory.working = false;
    // B.moveTo(19, 18);


    const A = Game.creeps['Benjamin'];
    // A.memory.role = 'aaa';
    // A.memory.working = false;
    //
    // // A.memory.pathMoving = false;
    // // A.moveTo(15, 24);
    //
    //
    // const AA = new RoomPosition(15, 24, A.room.name);
    // const AA1 = new RoomPosition(16, 23, A.room.name);
    // const BB = new RoomPosition(35, 24, A.room.name);
    //
    // var PathAB = A.room.findPath(AA, BB);
    // // // // PathAB.shift();
    // // // // PathAB.shift();

    // console.log(PathAB[0].x, PathAB[0].y, PathAB[PathAB.length -1].x, PathAB[PathAB.length -1].y);
    // // console.log(A.pos.isEqualTo(15,24));
    // // console.log(!(1===3));
    //
    //
    // A.moveAndRepairByPath(AA, PathAB);
    // // A.moveByPath(A.room.findPath(A.pos, BB, {ignoreCreeps: true}));
    // // A.moveByPath(PathAB);



    // var a = true;
    // var i = 1;
    // while(a){
    //     i++;
    //     if (i>5){
    //         a = false;
    //     }
    // }
    // console.log(i);



    // A.room.findPath(creep.pos, BB)

    // for (const cr of [A, B]) {
    //     // console.log(A);
    //     if (cr.memory.working === 0) {
    //         cr.moveByPath(room1.findPath(cr.pos, BB, {ignoreCreeps: true}));
    //     }
    //     if (cr.memory.working === 1) {
    //         cr.moveByPath(room1.findPath(cr.pos, AA, {ignoreCreeps: true}));
    //     }
    //     if (cr.pos === BB) {
    //         cr.memory.working = 1;
    //     }
    //     if (cr.pos === AA) {
    //         cr.memory.working = 0;
    //     }
    // }
    //

    // A.moveTo(10,16);
    // B.moveTo(10,16);

    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    // setup some minimum numbers for different roles
    var minimumNumberOfHarvesters = 3;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 0;
    var minimumNumberOfRepairers = 0;

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var name = undefined;

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            // spawn one with what is available
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    } else {
        // else try to spawn a builder
        // name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
    }

    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
    }
    //     for (let roomName in Game.rooms) {
    //         // run room logic
    //         Game.rooms[roomName].memoryInitialization()
    //         Game.rooms[roomName].spawnSpawnsIfNecessary();
    //     }
};