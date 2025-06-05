("use strict");

export default class Level{
    static currentLevel=1;

    static tileSize=32;

    static scaleFactor=4;

    static levels={
        1:[
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ]};

    static get(x, y) {
        const level = this.levels[this.currentLevel];
        return level[y][x];
    }

    static outOfBounds(x, y) {
        const level = this.levels[this.currentLevel];
        return y < 0 || y >= level.length || x < 0 || x >= level[0].length;
    }

    // Check if given position is a wall
    static isNotWall(x, y) {
        return this.get(x, y) === 0;
    }

    static isWall(x, y) {
        return this.get(x, y) !== 0;
    }
}