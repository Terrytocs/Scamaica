("use strict");

export default class PowerSlide {
    static methods = {
        powerSlideInit: (player)=> {
            this.powerSlideInit(player);
        },
        powerSlideUpdate: (player, dt)=> {
            this.powerSlideUpdate(player, dt);
        },
        powerSlideTeardown: (player)=> {
            this.powerSlideTeardown(player);
        }
    }

    // Power slide
    static powerSlideInit(player) {
        // Initialize power slide state
        player.vel.set(
          Math.cos(player.dir.x) * player.sprintSpeed,
          Math.sin(player.dir.x) * player.sprintSpeed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} is now power sliding.`);
    }
    static powerSlideUpdate(player,dt) {
        // Update logic for power slide state
        console.log(`${player} is power sliding.`);
        // You can add logic here to check for transitions to other states
    }
    static powerSlideTeardown(player) {
        // Teardown logic for power slide state
        player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${player} has stopped power sliding.`);
    }
}