("use strict");

import Level from "./Level.js";
import Utils from "./Utils.js";

export default class SceneRender {
    constructor(opt) {
        Object.assign(this, opt); // Assign options to the instance
        this.fov = Math.PI / 3;
    }

    render(rays) {
        const ctx=this.ctx;
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        rays.forEach((ray,i) => {
            const screenHeight=this.ctx.canvas.height;
            const halfScreenHeight=screenHeight/2;
            const distance=Utils.fixFishEye(ray.distance,ray.angle,this.player.dir.x);
            const wallHeight=((Level.tileSize*Level.scaleFactor)/distance)*halfScreenHeight;
            const halfWallHeight=wallHeight/2;
            
            
            const shade=(255-distance*0.7);
            ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 1)`;
            ctx.fillRect(i,halfScreenHeight-halfWallHeight,1,wallHeight);
        });
    }
    miniMapRender(rays){
        const ctx = this.ctx;
        const mapCtx = this.mapCtx;
        const player = this.player;
        const map = Level.levels[Level.currentLevel];
        const tileSize = Level.tileSize;

        // Draw the minimap background
        mapCtx.fillStyle = "#000";
        mapCtx.fillRect(0, 0, mapCtx.canvas.width, mapCtx.canvas.height);

        // Draw the map tiles
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (Level.isWall(x, y)) {
                    mapCtx.fillStyle = "#888"; // Wall color
                    mapCtx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }
        }

        // Draw the player position
        mapCtx.fillStyle = "#f00"; // Player color
        mapCtx.beginPath();
        mapCtx.arc(player.pos.x, player.pos.y, 5, 0, Math.PI * 2);
        mapCtx.fill();
        mapCtx.strokeStyle = "#f00"; // Player outline color
        mapCtx.beginPath();
        mapCtx.moveTo(player.pos.x, player.pos.y);
        mapCtx.lineTo(player.pos.x + Math.cos(player.dir.x) * 10, player.pos.y + Math.sin(player.dir.x) * 10);
        mapCtx.stroke();

        mapCtx.strokeStyle = "#fff"; // Ray outline color
        // Draw rays if provided
        if (rays) {
            rays.forEach(ray => {
                mapCtx.beginPath();
                mapCtx.moveTo(player.pos.x, player.pos.y);
                mapCtx.lineTo(player.pos.x+Math.cos(ray.angle)*ray.distance, player.pos.y+Math.sin(ray.angle)*ray.distance);
                mapCtx.stroke();
            });
        }
    }
}