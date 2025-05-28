("use strict");

import {WeaponEnums} from "./Enum.js";

export default class WeaponStateMachine {
    constructor(weapon) {
        this.weapon = weapon; // Reference to the weapon instance
        this.currentState = WeaponEnums.WeaponStates.IDLE; // Initial state
        this.stateData = {
          [WeaponEnums.WeaponStates.IDLE]: {
            init: this.idleInit.bind(this),
            update: this.idleUpdate.bind(this),
            teardown: this.idleTeardown.bind(this),
            transitions: [WeaponEnums.WeaponStates.FIRING, WeaponEnums.WeaponStates.RELOADING], // Possible transitions from this state
          },
          [WeaponEnums.WeaponStates.FIRING]: {
            init: this.firingInit.bind(this),
            update: this.firingUpdate.bind(this),
            teardown: this.firingTeardown.bind(this),
            transitions: [WeaponEnums.WeaponStates.IDLE, WeaponEnums.WeaponStates.COOLDOWN], // Possible transitions from this state
          },
          [WeaponEnums.WeaponStates.COOLDOWN]: {
            init: this.cooldownInit.bind(this),
            update: this.cooldownUpdate.bind(this),
            teardown: this.cooldownTeardown.bind(this),
            transitions: [WeaponEnums.WeaponStates.IDLE, WeaponEnums.WeaponStates.FIRING, WeaponEnums.WeaponStates.RELOADING], // Possible transitions from this state
          },
          [WeaponEnums.WeaponStates.RELOADING]: {
            init: this.reloadingInit.bind(this),
            update: this.reloadingUpdate.bind(this),
            teardown: this.reloadingTeardown.bind(this),
            transitions: [WeaponEnums.WeaponStates.IDLE, WeaponEnums.WeaponStates.FIRING, WeaponEnums.WeaponStates.COOLDOWN], // Possible transitions from this state
          },
          [WeaponEnums.WeaponStates.SWITCHING]: {
            init: this.switchingInit.bind(this),
            update: this.switchingUpdate.bind(this),
            teardown: this.switchingTeardown.bind(this),
            transitions: [WeaponEnums.WeaponStates.IDLE, WeaponEnums.WeaponStates.FIRING, WeaponEnums.WeaponStates.RELOADING], // Possible transitions from this state
          },
        }; // Data specific to the current state
        this.stateData[this.currentState].init(weapon, null); // Initialize the current state
    }
    //change state
    setState(newState) {
        if (this.stateData[this.currentState].transitions.includes(newState)) {
            this.stateData[this.currentState].teardown(this.weapon, null); // Teardown the current state
            this.currentState = newState; // Change to the new state
            this.stateData[this.currentState].init(this.weapon, null); // Initialize the new state
        } else {
            console.warn(`Transition from ${this.currentState} to ${newState} not allowed.`);
        }
    }
    // update state
    update(deltaTime, input) {}
    // --- IDLE STATE ---
    idleInit(weapon, player) {}
    idleUpdate(weapon, player, delta) {}
    idleTeardown(weapon, player) {}
  
    // --- FIRING STATE ---
    firingInit(weapon, player) {}
    firingUpdate(weapon, player, delta) {}
    firingTeardown(weapon, player) {}
  
    // --- COOLDOWN STATE ---
    cooldownInit(weapon, player) {}
    cooldownUpdate(weapon, player, delta) {}
    cooldownTeardown(weapon, player) {}
  
    // --- RELOADING STATE ---
    reloadingInit(weapon, player) {}
    reloadingUpdate(weapon, player, delta) {}
    reloadingTeardown(weapon, player) {}

    // --- SWITCHING STATE ---
    switchingInit(weapon, player) {}
    switchingUpdate(weapon, player, delta) {}
    switchingTeardown(weapon, player) {}
  }
  