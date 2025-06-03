("use strict");

export default class Aim {
    static methods = {
        aimInit: (player)=> {
            this.aimInit(player);
        },
        aimUpdate: (player, dt)=> {
            this.aimUpdate(player, dt);
        },
        aimTeardown: (player)=> {
            this.aimTeardown(player);
        }
    }

    // Aiming
        static aimInit(player) {
            // Initialize aiming state
            console.log(`${player} is now aiming.`);
            // You can add logic here to start the aiming animation or process
        }
        static aimUpdate(player,dt) {
            // Update logic for aiming state
            console.log(`${player} is aiming.`);
            // You can add logic here to check for transitions to other states, like after the aim is complete
        }
        static aimTeardown(player) {
            // Teardown logic for aiming state
            console.log(`${player} has stopped aiming.`);
            // You can add logic here to finalize the aim, like resetting the aim state
        }
}