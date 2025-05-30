("use strict");

export default class WeaponSwitch {
    static methods = {
        weaponSwitchInit: (player)=> {
            this.weaponSwitchInit(player);
        },
        weaponSwitchUpdate: (player, dt)=> {
            this.weaponSwitchUpdate(player, dt);
        },
        weaponSwitchTeardown: (player)=> {
            this.weaponSwitchTeardown(player);
        }
    }

    // Switching Weapons
    static weaponSwitchInit(player) {
        // Initialize switching state
        console.log(`${player} is switching weapons.`);
        // You can add logic here to start the switching animation or process
    }
    static weaponSwitchUpdate(player,dt) {
        // Update logic for switching state
        console.log(`${player} is switching weapons.`);
        // You can add logic here to check for transitions to other states, like after the switch is complete
    }
    static weaponSwitchTeardown(player) {
        // Teardown logic for switching state
        console.log(`${player} has switched weapons.`);
        // You can add logic here to finalize the switch, like updating the current weapon index
    }
}