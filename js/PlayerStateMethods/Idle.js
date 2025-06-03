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
        // Initialize idle state
        console.log(`${player} is now idle.`);
    }
    static idleUpdate(player,dt) {
        // Update logic for idle state
        console.log(`${player} is idling.`);
        // You can add logic here to check for transitions to other states
    }
    static idleTeardown(player) {
        // Teardown logic for idle state
        console.log(`${player} is no longer idle.`);
    }
}

