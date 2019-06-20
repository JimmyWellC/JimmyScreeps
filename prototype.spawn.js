StructureSpawn.prototype.createCustomCreep =
    function (energy, roleName) {
        // create a worker as big as possible with the given energy
        var body = [];
        while (energy > 10) {
            if (energy >= 100) {
                body.push(WORK);
                energy -= 100;
            } else if (energy >= 50) {
                body.push(CARRY);
                energy -= 50;
                break;
            } else break;
            if (energy >= 100) {
                body.push(WORK);
                energy -= 100;
            } else if (energy >= 50) {
                body.push(CARRY);
                energy -= 50;
                break;
            } else break;
            if (energy >= 50) {
                body.push(CARRY);
                energy -= 50;
            } else break;
            if (energy >= 50) {
                body.push(MOVE);
                energy -= 50;
            } else break;
        }
        // create creep with the created body and the given role
        return this.createCreep(body, undefined, {role: roleName, working: false, pathMoving: false});
    };


Creep.prototype.moveAndRepairByPath =
    function (startPosition, Path) {
        const startX = startPosition.x;
        const startY = startPosition.y;
        const endX = Path[Path.length - 1].x;
        const endY = Path[Path.length - 1].y;
        var realPath = Path.slice(0);

        if (this.memory.pathMoving === false) {
            if (this.pos.isEqualTo(startX, startY)) {
                this.memory.pathMoving = true;
                this.moveByPath(Path);
            } else {
                this.moveTo(startX, startY);
            }
        } else {
            if (this.pos.isEqualTo(endX, endY)) {
                this.memory.pathMoving = false;
            } else {
                // console.log(!this.pos.isEqualTo(realPath[0].x, realPath[0].y));
                // while (!this.pos.isEqualTo(realPath[0].x, realPath[0].y)) {
                //     realPath.shift();
                // }
                // realPath.shift();
                // this.moveByPath(realPath);
            }
        }
    }