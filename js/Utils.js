("use strict");

import Level from "./Level.js";

export default class Utils {
    // Raycast against the map grid (used by player)
    static castRay(origin, direction, maxDistance, stepSize = 0.1) {
        const pos = origin.clone();
        const step = direction.clone().norm.scale(stepSize);
        let traveled = 0;

        while (traveled < maxDistance) {
            pos.add(step);
            traveled += stepSize;

            const tileX = Math.floor(pos.x);
            const tileY = Math.floor(pos.y);

            const level = Level.levels[Level.currentLevel];
            if (
                tileY < 0 || tileY >= level.length ||
                tileX < 0 || tileX >= level[0].length
            ) break;

            if (level[tileY][tileX] === 1) {
                return {
                    hit: true,
                    position: pos.clone(),
                    distance: traveled,
                    tile: { x: tileX, y: tileY },
                    hitValue: level[tileY][tileX], // <--- Add this line
        hitOffset: pos.x % 1           // or pos.z % 1 depending on wall side
                };
            }
        }

        return {
            hit: false,
            position: pos.clone(),
            distance: maxDistance
        };
    }

    // Dijkstra pathfinding on current map (used by enemies)
    static dijkstraMap(startTile) {
        const level = Level.levels[Level.currentLevel];
        const width = level[0].length;
        const height = level.length;
        const costs = Array.from({ length: height }, () => Array(width).fill(Infinity));
        const visited = Array.from({ length: height }, () => Array(width).fill(false));

        const queue = [{ x: startTile.x, y: startTile.y, cost: 0 }];
        costs[startTile.y][startTile.x] = 0;

        const directions = [
            { x: 0, y: -1 }, { x: 1, y: 0 },
            { x: 0, y: 1 }, { x: -1, y: 0 }
        ];

        while (queue.length > 0) {
            const { x, y, cost } = queue.shift();

            if (visited[y][x]) continue;
            visited[y][x] = true;

            for (const dir of directions) {
                const nx = x + dir.x;
                const ny = y + dir.y;

                if (
                    nx >= 0 && nx < width &&
                    ny >= 0 && ny < height &&
                    level[ny][nx] === 0 &&
                    cost + 1 < costs[ny][nx]
                ) {
                    costs[ny][nx] = cost + 1;
                    queue.push({ x: nx, y: ny, cost: cost + 1 });
                }
            }
        }

        return costs;
    }
}