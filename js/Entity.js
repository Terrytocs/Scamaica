("use strict");

import Map from "./Map.js";

export default class Entity{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.dir=0;
        this.speed=0.04;
        this.hp=100;
        
    }

    move(dx,dy){
        let nx=this.x+dx,ny=this.y+dy;
        if(Map.levels[Map.currentLevel][Math.floor(this.y)][Math.floor(nx)]===0){
            this.x=nx;
        }
        if(Map.levels[Map.currentLevel][Math.floor(ny)][Math.floor(this.x)]===0){
            this.y=ny;
        }
    }
}