StructureSpawn.prototype.createCustomCreep =
    function (energy, roleName) {
        // create a worker as big as possible with the given energy
        // calculate the level of given energy.
        const energyLevel = Math.floor(energy / 50);
        if (roleName === "harvester")
            const body = createMiniMovementBody(energyLevel);


        // create creep with the created body and the given role
        return this.createCreep(body, undefined, {role: roleName, working: false, pathMoving: false});
    };

createMiniMovementBody =
    function (energyLevel) {
        let body = [];
        const temp = Math.floor(energyLevel / 4);
        if (energyLevel === 9)
            body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        else if (energyLevel % 4 === 0) {
            for (let i = 0; i < temp; i++)
                body.push(WORK);
            for (let i = 0; i < temp; i++)
                body.push(CARRY);
            for (let i = 0; i < temp; i++)
                body.push(MOVE);
        } else if (energyLevel % 4 === 1) {
            for (let i = 0; i < temp + 1; i++)
                body.push(WORK);
            for (let i = 0; i < temp - 1; i++)
                body.push(CARRY);
            for (let i = 0; i < temp; i++)
                body.push(MOVE);
        } else if (energyLevel % 4 === 3) {
            for (let i = 0; i < temp + 1; i++)
                body.push(WORK);
            for (let i = 0; i < temp; i++)
                body.push(CARRY);
            for (let i = 0; i < temp + 1; i++)
                body.push(MOVE);
        } else if (energyLevel % 4 === 2) {
            // most difficult part for the optimization.
            for (let i = 0; i < temp + 1; i++)
                body.push(WORK);
            let x;

        }

        return body;
    };


createBodyOnRoad =
    function (energy) {
        let body = [];
        while (energy > 0) {
            if (energy >= 50 && body.length < 50) {
                body.push(MOVE);//push MOVE part
                energy -= 50;
            } else break;

            if (energy >= 50 && body.length < 50) {
                body.push(CARRY);//push CARRY part
                energy -= 50;
            } else break;

            if (energy >= 100 && body.length < 50) {
                body.push(WORK);
                energy -= 100;
            } else if (energy >= 50 && body.length < 50) {
                body.push(MOVE);
                energy -= 50;
                break;
            } else break;

            if (energy >= 100 && body.length < 50) {
                body.push(WORK);
                energy -= 100;
            } else if (energy >= 50 && body.length < 50) {
                body.push(MOVE);
                energy -= 50;
                break;
            } else break;
        }
        return body;
    };


createBalancedCreep =
    function (energy) {
        // create a balanced body as big as possible with the given energy
        let body = [];
        while (energy > 0) {
            if (energy >= 50 && body.length < 50) {
                body.push(MOVE);//push MOVE part
                energy -= 50;
            } else break;

            if (energy >= 50 && body.length < 50) {
                body.push(CARRY);//push CARRY part
                energy -= 50;
            } else break;

            if (energy >= 100 && body.length < 50) {
                body.push(WORK);
                energy -= 100;
            } else if (energy >= 50 && body.length < 50) {
                body.push(MOVE);
                energy -= 50;
                break;
            } else break;

            if (energy >= 100 && body.length < 50) {
                body.push(WORK);
                energy -= 100;
            } else if (energy >= 50 && body.length < 50) {
                body.push(MOVE);
                energy -= 50;
                break;
            } else break;
        }
        return body;
    };