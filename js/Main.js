("use strict");

import Game from "./Game.js";

class Main{
    constructor(){
        this.canvas=document.getElementById("_canvas");
        this.canvas.width=window.innerWidth;
        this.canvas.height=window.innerHeight;
        this.ctx=this.canvas.getContext("2d");
        this.game=new Game(this.ctx);
        this.game.init();
    }
    update(f){}
    draw(ctx){}
}

window.addEventListener("load",()=>{
    var main=new Main();
});