module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
            // create a worker as big as possible with the given energy
            var body = [];
            while(energy>0){
                if (energy>100) body.push(WORK);
                else if (energy>50) body.push(MOVE); break;
                else break;
                if (energy>100) body.push(WORK);
                else if (energy>50) body.push(MOVE); break;
                else break;
                if (energy>50) body.push(MOVE);
                else break;
                if (energy>50) body.push(CARRY);
                else break;
            }
            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };
};