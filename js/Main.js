("use strict");

import Engine from "./Engine.js";
import Game from "./Game.js";
import Player from "./Player.js";

class Main{
    constructor(){
        this.canvas=document.getElementById("_canvas");
        this.ctx=this.canvas.getContext("2d");
        this.engine=new Engine();
        this.game=new Game();

        var en=new Player()
    }
    update(f){
        this.engine.update((time)=>{
            //console.log(time)
        });
    }
    draw(){}
}

window.addEventListener("load",()=>{
    var main=new Main();
});