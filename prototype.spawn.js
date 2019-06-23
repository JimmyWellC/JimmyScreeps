StructureSpawn.prototype.createCustomCreep =
    function (energy, roleName) {
        // create a worker as big as possible with the given energy
        // calculate the level of given energy.
        const energyLevel = Math.floor(energy / 50);
        let body = [];
        if (roleName === "harvester")
            body = createMiniMovementBody(energyLevel);
        else
            body = createShortMovementBody(energyLevel);

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
            const moveCount = Math.floor((energyLevel - temp - 1) / 5);
            const carryCount = energyLevel - moveCount - 2 * (temp + 1);
            for (let i = 0; i < carryCount; i++)
                body.push(CARRY);
            for (let i = 0; i < moveCount; i++)
                body.push(MOVE);
        }
        return body;
    };


createShortMovementBody =
    function (energyLevel) {
        const distance = 20;
        let body = [];
        let bestWorkCount, bestCarryCount, maxEfficiency = 0;
        for (let workCount = 1; workCount <= 2 * energyLevel / 5; workCount++) {
            let carryCount = Math.floor((2 * energyLevel - 5 * workCount) / 3);
            let efficiency = (50 * workCount * carryCount) / (2 * distance * workCount + 25 * carryCount);
            if (efficiency > maxEfficiency)
                bestWorkCount = workCount; bestCarryCount = carryCount;
        }
        const bestMoveCount = energyLevel - 2 * bestWorkCount - bestCarryCount;
        for (let i = 0; i < bestWorkCount; i++)
            body.push(WORK);
        for (let i = 0; i < bestCarryCount; i++)
            body.push(CARRY);
        for (let i = 0; i < bestMoveCount; i++)
            body.push(MOVE);
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