("use strict");

export default class Crouch {
    static methods = {
        crouchInit: (player)=> {
            this.crouchInit(player);
        },
        crouchUpdate: (player, dt)=> {
            this.crouchUpdate(player, dt);
        },
        crouchTeardown: (player)=> {
            this.crouchTeardown(player);
        }
    }

    // Crouch
    static crouchInit(player) {
        // Initialize crouch state
        console.log(`${player} is now crouching.`);
    }
    static crouchUpdate(player,dt) {
        // Update logic for crouch state
        console.log(`${player} is crouching.`);
        // You can add logic here to check for transitions to other states
    }
    static crouchTeardown(player) {
        // Teardown logic for crouch state
        console.log(`${player} has stopped crouching.`);
    }
}