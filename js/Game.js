("use strict");

import Engine from "./Engine.js";
import Map from "./Map.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import SceneRender from "./SceneRender.js";
import Vec3 from "./Vec3.js";
import Controls from "./Controls.js";
import Textures from "./Textures.js";

export default class Game{
    constructor(ctx){
        Object.assign(this, Textures.textures); // Load textures from Textures class
        this.ctx=ctx;
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
            //console.log(ctx);
        });
        //this.engine.start();

        
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
    
            // Delegate full scene rendering
            this.sceneRender.render();
            
            // Optional: custom draw hooks
            f(this.ctx);
        });
    }
    init() {
        this.player = new Player(new Vec3(2, 0, 2));
        this.controls = new Controls(this.player, this.ctx.canvas);
    
        // Add player to entity list
        this.entities.push(this.player);
    
        // Spawn enemies from map
        const map = Map.levels[Map.currentLevel];
        for (let z = 0; z < map.length; z++) {
            for (let x = 0; x < map[z].length; x++) {
                if (Map.get(x,z) === 2) { // 2 means enemy spawn
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
            player: this.player,
            entities: this.entities,
            map: Map,
            textures: this.loadedTextures, // <- make sure to preload your textures
            useTexturedFloor: true,
            texturedCeiling: false
        });
    }
}