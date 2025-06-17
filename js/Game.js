("use strict");

import Engine from "./Engine.js";
import Level from "./Level.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import SceneRender from "./SceneRender.js";
import Vec3 from "./Vec3.js";
import Controls from "./Controls.js";
import Textures from "./Textures.js";
import Utils from "./Utils.js";

export default class Game{
    constructor(main){
        Object.assign(this, Textures.textures); // Load textures from Textures class
        this.ctx=main.ctx;
        this.mapCtx=main.mapCtx;
        this.entities=[];
        this.enemyEntities=[];
        this.engine=new Engine();

        this.init();
        
        this.update((deltaTime)=>{
            this.entities.forEach((entity)=>{
                entity.update(deltaTime);
            });
        });
        this.draw((ctx)=>{
            const rays=Utils.getRays(this.player, this.ctx.canvas.width);
            this.sceneRender.render(rays, this.player); // Render the scene with rays and player
            this.sceneRender.miniMapRender(rays); // Render minimap
        });
        this.engine.start();

        
    }
    update(f){
        this.engine.update((deltaTime)=>{
            f(deltaTime);
        });
    }
    draw(f) {
        this.engine.draw(() => {
            // Clear screen
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            
            // Optional: custom draw hooks
            f(this.ctx);
        });
    }
    init() {
        this.player = new Player(new Vec3(1.5, 1.5, 0).scale(Level.tileSize));
        this.controls = new Controls(this.player, this.ctx.canvas);
    
        // Add player to entity list
        this.entities.push(this.player);
    
        // Spawn enemies from map
        const map = Level.levels[Level.currentLevel];
        for (let z = 0; z < map.length; z++) {
            for (let x = 0; x < map[z].length; x++) {
                if (Level.get(x,z) === 2) { // 2 means enemy spawn
                    const enemy = new Enemy(new Vec3(x, 0, z), {
                        player: this.player // Pass player reference for enemy AI
                    });
                    this.entities.push(enemy);
                    this.enemyEntities.push(enemy); // Keep track of enemies separately
                }
            }
        }

        // Initialize scene rendering
        this.sceneRender = new SceneRender({
            ctx: this.ctx,
            mapCtx: this.mapCtx,
            player: this.player,
            entities: this.entities,
            map: Level,
            textures: this.loadedTextures, // <- make sure to preload your textures
            useTexturedFloor: true,
            texturedCeiling: false
        });
    }
}