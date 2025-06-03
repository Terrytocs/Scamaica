("use strict");

export default class MoveBackward {
    static methods = {
        moveBackwardInit: (player)=> {
            this.moveBackwardInit(player);
        },
        moveBackwardUpdate: (player, dt)=> {
            this.moveBackwardUpdate(player, dt);
        },
        moveBackwardTeardown: (player)=> {
            this.moveBackwardTeardown(player);
        }
    }

    // Move Backward
    static moveBackwardInit(player) {
        // Initialize move backward state
        player.vel.set(
          Math.cos(player.dir.x) * player.speed,
          Math.sin(player.dir.x) * player.speed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} is moving backward.`);
    }
    static moveBackwardUpdate(player,dt) {
        // Update logic for move backward state
        player.move(player.vel.x*dt,player.vel.y*dt) // Update position based on velocity
        console.log(`${player} is moving backward.`);
        // You can add logic here to check for transitions to other states
    }
    static moveBackwardTeardown(player) {
        // Teardown logic for move backward state
        player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} has stopped moving backward.`);
    }
}