module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
            // create a worker as big as possible with the given energy
            var body = [WORK, WORK,CARRY, MOVE];
            energy -= 300;
            while(energy>10){
                if (energy>100) {body.push(WORK); energy -= 100;}
                else if (energy>50) {body.push(MOVE); energy -= 50; break;}
                else break;
                if (energy>100) {body.push(WORK); energy -= 100;}
                else if (energy>50) {body.push(MOVE); energy -= 50; break;}
                else break;
                if (energy>50) {body.push(MOVE); energy -= 50;}
                else break;
                if (energy>50) {body.push(CARRY); energy -= 50;}
                else break;
            }
            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };
};