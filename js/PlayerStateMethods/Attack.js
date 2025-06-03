("use strict");

export default class Attack {
    static methods = {
        attackInit: (player)=> {
            this.attackInit(player);
        },
        attackUpdate: (player, dt)=>  {
            this.attackUpdate(player, dt);
        },
        attackTeardown: (player)=> {
            this.attackTeardown(player);
        }
    }

    // Attack
    static attackInit(player) {
        // Initialize attack state
        console.log(`${player} is attacking.`);
        // You can add logic here to start the attack animation or process
    }
    static attackUpdate(player,dt) {
        // Update logic for attack state
        console.log(`${player} is attacking.`);
        // You can add logic here to check for transitions to other states, like after the attack is complete
    }
    static attackTeardown(player) {
        // Teardown logic for attack state
        console.log(`${player} has finished attacking.`);
        // You can add logic here to finalize the attack, like resetting the attack cooldown
    }
}