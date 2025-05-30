("use strict");

export default class Map{
    static currentLevel=1;

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
        const level = Map.levels[Map.currentLevel];
        if (!level || y < 0 || y >= level.length || x < 0 || x >= level[0].length) {
            return 1; // Treat out-of-bounds as a wall
        }
        return level[y][x];
    }

    // Check if given position is a wall
    static isWall(x, y) {
        return Map.get(x, y) === 1;
    }
}