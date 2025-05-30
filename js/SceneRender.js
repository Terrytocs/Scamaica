("use strict");

import Utils from "./Utils.js"; // Assuming Utils has the castRay method
import Vec3 from "./Vec3.js"; // Assuming Vec3 is a vector class for 3D positions

export default class SceneRender {
    constructor({ ctx, player, entities, map, textures, useTexturedFloor = false, useTexturedCeiling = false }) {
        this.ctx = ctx;
        this.player = player;
        this.entities = entities;
        this.map = map;
        this.textures = textures;
        this.fov = Math.PI / 3;
        this.numRays = ctx.canvas.width;
        this.depth = 20;

        this.useTexturedFloor = useTexturedFloor;
        this.useTexturedCeiling = useTexturedCeiling;

        this.floorColor = "#333"; // Default flat floor color
        this.ceilingColor = "#555"; // Default flat ceiling color
    }

    render() {
        const { ctx, player, entities, textures, map } = this;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const canvasW = ctx.canvas.width;
        const canvasH = ctx.canvas.height;

        // Draw ceiling
        if (!this.useTexturedCeiling) {
            ctx.fillStyle = this.ceilingColor;
            ctx.fillRect(0, 0, canvasW, canvasH / 2);
        } else {
            const tex = textures.ceiling || textures.floor?.[0];
            for (let y = 0; y < canvasH / 2; y++) {
                const ratio = y / (canvasH / 2);
                const row = Math.floor(tex.height * ratio);
                ctx.drawImage(tex, 0, row, tex.width, 1, 0, y, canvasW, 1);
            }
        }

        // Draw floor
        if (!this.useTexturedFloor) {
            ctx.fillStyle = this.floorColor;
            ctx.fillRect(0, canvasH / 2, canvasW, canvasH / 2);
        } else {
            const tex = textures.floor?.[0];
            for (let y = canvasH / 2; y < canvasH; y++) {
                const ratio = (y - canvasH / 2) / (canvasH / 2);
                const row = Math.floor(tex.height * ratio);
                ctx.drawImage(tex, 0, row, tex.width, 1, 0, y, canvasW, 1);
            }
        }

        // Raycasting walls
        for (let i = 0; i < this.numRays; i++) {
            const rayAngle = player.dir - this.fov / 2 + (this.fov * i) / this.numRays;
            const dirVec = new Vec3(Math.cos(rayAngle), 0, Math.sin(rayAngle));
            const ray = Utils.castRay(player.pos.clone(), dirVec, this.depth);

            if (!ray) continue;

            const distance = ray.distance * Math.cos(rayAngle - player.dir);
            const wallHeight = (canvasH / distance) * 50;

            const texture = textures.walls[ray.hitValue % textures.walls.length];
            const texX = Math.floor((ray.hitOffset % 1) * texture.width);

            ctx.drawImage(
                texture,
                texX, 0, 1, texture.height,
                i, (canvasH - wallHeight) / 2, 1, wallHeight
            );
        }

        // Render sprites
        const visibleSprites = entities
            .filter(e => e !== player)
            .map(e => {
                const dx = e.pos.x - player.pos.x;
                const dy = e.pos.z - player.pos.z;
                const angle = Math.atan2(dy, dx) - player.dir;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return { entity: e, angle, distance };
            })
            .filter(s => s.angle > -this.fov / 2 && s.angle < this.fov / 2)
            .sort((a, b) => b.distance - a.distance);

        for (const sprite of visibleSprites) {
            const screenX = (sprite.angle + this.fov / 2) / this.fov * canvasW;
            const spriteSize = (canvasH / sprite.distance) * 30;
            const spriteFrames = textures.sprites[sprite.entity.spriteType];
            const frame = spriteFrames[sprite.entity.frame % spriteFrames.length];

            ctx.drawImage(
                frame,
                screenX - spriteSize / 2,
                (canvasH - spriteSize) / 2,
                spriteSize,
                spriteSize
            );
        }

        // HUD weapon
        const weaponFrame = textures.sprites.player[player.weaponFrame % textures.sprites.player.length];
        ctx.drawImage(
            weaponFrame,
            (canvasW - weaponFrame.width) / 2,
            canvasH - weaponFrame.height
        );
    }
}