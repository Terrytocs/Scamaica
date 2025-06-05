("use strict");

import Level from "./Level.js";
import Utils from "./Utils.js";
import Textures from "./Textures.js";

export default class SceneRender {
    constructor(opt) {
        Object.assign(this, opt); // Assign options to the instance
        this.fov = Math.PI / 3;
    }

    render(rays,player) {
        const ctx=this.ctx;
        const screenHeight=ctx.canvas.height;
        const halfScreenHeight=Math.floor(screenHeight/2);
        const screenWidth=ctx.canvas.width;

        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,screenWidth, screenHeight);

        rays.forEach((ray,i) => {
            const distance=Utils.fixFishEye(ray.distance,ray.angle,this.player.dir.x);
            const wallHeight=((Level.tileSize*Level.scaleFactor)/distance)*halfScreenHeight;
            const halfWallHeight=Math.floor(wallHeight/2);
            
            //WALLS
            const shade=ray.vertical?(255-distance*0.7): (255-distance*0.5);
            ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 1)`;
            ctx.fillRect(i,(halfScreenHeight-halfWallHeight)+player.headBob,1,wallHeight);
            //console.log(player.headBob);

            // CEILING
            const ceilingIntensity = 200 - (i / ctx.canvas.width) * 50; 
            ctx.fillStyle = `rgb(${ceilingIntensity}, ${ceilingIntensity + 30}, 255)`;
            ctx.fillRect(i, player.headBob, 1, (halfScreenHeight - halfWallHeight));

            // FLOOR
            const floorIntensity = 100 - (i / ctx.canvas.width) * 30;
            const r = Math.max(60, floorIntensity + 20);     // warm brown
            const g = Math.max(40, floorIntensity + 10);     // muted green for earthiness
            const b = Math.max(20, floorIntensity);          // very low blue
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(i, (halfScreenHeight + halfWallHeight)+player.headBob, 1, (halfScreenHeight - halfWallHeight));
            

            /*
            TEXTURE RENDERING (NOT WORKING YET)
            const texture=Textures.textures.types.walls[ray.wallType];
            const texWidth=texture.width;
            const texHeight=texture.height;

            const scale=(Level.tileSize*Level.scaleFactor);
            // Determine X offset into the texture
            let hitOffset = ray.vertical
            ? ray.wallHit.x
            : ray.wallHit.y;
            
            const textureX = hitOffset-Math.floor(hitOffset / scale) * scale;

            // Optional shading
            const shade = Math.max(0, 255 - distance * 0.7);
            ctx.globalAlpha = Math.min(1, shade / 255);

            ctx.drawImage(
                texture,
                textureX,
                0,
                1, 
                texHeight,
                i,
                halfScreenHeight - halfWallHeight,
                1, 
                wallHeight 
            );

            ctx.globalAlpha = 1;
            */
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