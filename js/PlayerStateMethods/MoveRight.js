("use strict");

export default class MoveRight {
    static methods = {
        moveRightInit: (player)=> {
            this.moveRightInit(player);
        },
        moveRightUpdate: (player, dt)=> {
            this.moveRightUpdate(player, dt);
        },
        moveRightTeardown: (player)=> {
            this.moveRightTeardown(player);
        }
    }

    // Move Right
        static moveRightInit(player) {
            // Initialize move right state
            player.vel.set(
              Math.cos(player.dir.x-(Math.PI/2)) * player.speed,
              Math.sin(player.dir.x-(Math.PI/2)) * player.speed, // Assuming no vertical movement for forward motion
              0 // Assuming forward is along the x-axis
            );
            console.log(`${player} is moving right.`);
        }
        static moveRightUpdate(player,dt) {
            // Update logic for move right state
            player.pos=player.pos.sub(player.vel.scale(dt)); // Update position based on velocity
            console.log(`${player} is moving right.`);
            // You can add logic here to check for transitions to other states
        }
        static moveRightTeardown(player) {
            // Teardown logic for move right state
            player.vel.set(
              0,
              0, // Assuming no vertical movement for forward motion
              0 // Assuming forward is along the x-axis
            );
            console.log(`${player} has stopped moving right.`);
        }
}