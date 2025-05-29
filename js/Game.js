("use strict");

import Engine from "./Engine.js";
import Player from "./Player.js";
import Vec3 from "./Vec3.js";
import Controls from "./Controls.js";

export default class Game{
    constructor(ctx){
        this.ctx=ctx;
        this.entities=[];
        this.engine=new Engine();
        
        this.update((deltaTime)=>{
            this.entities.forEach((entity)=>{
                entity.update(deltaTime);
            });
        });
        this.draw((ctx)=>{
            //console.log(ctx);
        });
        this.engine.start();
    }
    update(f){
        this.engine.update((deltaTime)=>{
            f(deltaTime);
        });
    }
    draw(f){
        this.engine.draw(()=>{
            f(this.ctx);
        });
    }
    init(){
        this.player=new Player(new Vec3(0, 0, 0));
        this.controls=new Controls(this.player,this.ctx.canvas);
        this.entities.push(this.player);
    }
}