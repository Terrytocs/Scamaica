("use strict");

export default class Jump {
    static methods = {
        jumpInit: (player)=> {
            this.jumpInit(player);
        },
        jumpUpdate: (player, dt)=> {
            this.jumpUpdate(player, dt);
        },
        jumpTeardown: (player)=> {
            this.jumpTeardown(player);
        }
    }

    // Jump
    static jumpInit(player) {
        // Initialize jump state
        console.log(`${player} is now jumping.`);
        player.vel.z = player.jumpStrength; // Set the initial jump velocity
    }
    static jumpUpdate(player,dt) {
        // Update logic for jump state
        console.log(`${player} is jumping.`);
        player.vel.z -= player.jumpStrength * dt; // Apply gravity
        player.pos.z += player.vel.z * dt; // Update position based on velocity
        // You can add logic here to check for transitions to other states, like landing
    }
    static jumpTeardown(player) {
        // Teardown logic for jump state
        console.log(`${player} has landed from jumping.`);
        player.vel.z = 0; // Reset vertical velocity
    }
}