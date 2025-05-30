("use strict");

export default class MoveLeft {
    static methods = {
        moveLeftInit: (player)=> {
            this.moveLeftInit(player);
        },
        moveLeftUpdate: (player, dt)=> {
            this.moveLeftUpdate(player, dt);
        },
        moveLeftTeardown: (player)=> {
            this.moveLeftTeardown(player);
        }
    }

    // Move Left
    static moveLeftInit(player) {
        // Initialize move left state
        player.vel.set(
          Math.cos(player.dir.x-(Math.PI/2)) * player.speed,
          Math.sin(player.dir.x-(Math.PI/2)) * player.speed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} is moving left.`);
    }
    static moveLeftUpdate(player,dt) {
        // Update logic for move left state
        player.pos=player.pos.add(player.vel.scale(-dt)); // Update position based on velocity
        console.log(`${player} is moving left.`);
        // You can add logic here to check for transitions to other states
    }
    static moveLeftTeardown(player) {
        // Teardown logic for move left state
        player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} has stopped moving left.`);
    }
}