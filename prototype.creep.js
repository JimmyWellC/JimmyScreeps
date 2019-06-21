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
            } else {
                this.moveTo(startX, startY);
            }
        } else {
            if (this.pos.isEqualTo(endX, endY)) {
                this.memory.pathMoving = false;
            } else {
                if (this.pos.isEqualTo(startX, startY))
                    this.moveByPath(Path);
                else {
                    // console.log(!this.pos.isEqualTo(realPath[0].x, realPath[0].y));
                    while (!this.pos.isEqualTo(realPath[0].x, realPath[0].y) && realPath.length !== 1) {
                        realPath.shift();
                    }
                    if (realPath.length === 1)
                        console.log('Creep is not on the path!');
                    else
                        realPath.shift();
                    this.moveByPath(realPath);
                }
            }
        }
    }