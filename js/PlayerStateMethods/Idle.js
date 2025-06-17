("use strict");

export default class Idle{
    static methods={
        idleInit: (player)=>{
            this.idleInit(player);
        },
        idleUpdate: (player,dt)=>{
            this.idleUpdate(player,dt)
        },
        idleTeardown: (player)=>{
            this.idleTeardown(player);
        }
    }
    // Idle
    static idleInit(player) {
        player.animationFrame=0;
    }
    static idleUpdate(player,dt) {
        
    }
    static idleTeardown(player) {
        
    }
}

