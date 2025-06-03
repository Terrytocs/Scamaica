("use strict");

import Game from "./Game.js";

class Main{
    constructor(){
        this.canvas=document.getElementById("_canvas");
        this.canvas.width=800;
        this.canvas.height=600;
        this.ctx=this.canvas.getContext("2d");
        this.mapCanvas=document.getElementById("_mapCanvas");
        this.mapCanvas.width=800;
        this.mapCanvas.height=600;
        this.mapCtx=this.mapCanvas.getContext("2d");
        this.game=new Game(this);
        this.game.init();
    }
    update(f){}
    draw(ctx){}
}

window.addEventListener("load",()=>{
    var main=new Main();
});