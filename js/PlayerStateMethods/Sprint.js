("use strict");

export default class Sprint {
    static methods = {
        sprintInit: (player)=> {
            this.sprintInit(player);
        },
        sprintUpdate: (player, dt)=> {
            this.sprintUpdate(player, dt);
        },
        sprintTeardown: (player)=> {
            this.sprintTeardown(player);
        }
    }

    // Sprint
    static sprintInit(player) {
        // Initialize sprint state
        player.vel.set(
          Math.cos(player.dir) * player.sprintSpeed,
          Math.sin(player.dir) * player.sprintSpeed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} is now sprinting.`);
    }
    static sprintUpdate(player,dt) {
        // Update logic for sprint state
        if (player.stamina <= 0) {
            return PlayerEnums.PlayerStates.IDLE; // Transition to idle if stamina is depleted
        }
        player.pos=player.pos.add(player.vel.scale(dt)); // Update position based on velocity
        player.stamina -= dt * 10; // Decrease stamina over time while sprinting
        console.log(`${player} is sprinting.`);
        // You can add logic here to check for transitions to other states
    }
    static sprintTeardown(player) {
        // Teardown logic for sprint state
        player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} has stopped sprinting.`);
    }
}