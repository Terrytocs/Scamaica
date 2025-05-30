("use strict");

export default class MoveForward {
    static methods = {
        moveForwardInit: (player)=> {
            this.moveForwardInit(player);
        },
        moveForwardUpdate: (player, dt)=> {
            this.moveForwardUpdate(player, dt);
        },
        moveForwardTeardown: (player)=> {
            this.moveForwardTeardown(player);
        }
    }
    
    // Move Forward
    static moveForwardInit(player) {
        // Initialize move forward state
        player.vel.set(
          Math.cos(player.dir.x) * player.speed,
          Math.sin(player.dir.x) * player.speed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} is moving forward.`);
    }
    static moveForwardUpdate(player,dt) {
        // Update logic for move forward state
        player.pos=player.pos.add(player.vel.scale(dt)); // Update position based on velocity
        console.log(`${player} is moving forward.`);
        // You can add logic here to check for transitions to other states
    }
    static moveForwardTeardown(player) {
        // Teardown logic for move forward state
        player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} has stopped moving forward.`);
    }
}