("use strict");

import {EnemyEnums} from "./Enum.js";

export default class EnemyStateMachine {
    constructor(enemy,player) {
        this.enemy = enemy; // Reference to the enemy instance
        this.player = player; // Reference to the player instance
        this.currentState = EnemyEnums.EnemyStates.IDLE; // Initial state of the enemy
        this.stateData = {
            [EnemyEnums.EnemyStates.IDLE]: {
                init: this.idleInit.bind(this),
                update: this.idleUpdate.bind(this),
                teardown: this.idleTeardown.bind(this),
                transitions: [EnemyEnums.EnemyStates.PATROLLING, EnemyEnums.EnemyStates.ATTACKING], // Possible transitions from idle state
            },
            [EnemyEnums.EnemyStates.PATROLLING]: {
                init: this.patrollingInit.bind(this),
                update: this.patrollingUpdate.bind(this),
                teardown: this.patrollingTeardown.bind(this),
                transitions: [EnemyEnums.EnemyStates.IDLE, EnemyEnums.EnemyStates.ATTACKING],
            },
            [EnemyEnums.EnemyStates.ATTACKING]: {
                init: this.attackingInit.bind(this),
                update: this.attackingUpdate.bind(this),
                teardown: this.attackingTeardown.bind(this),
                transitions: [EnemyEnums.EnemyStates.IDLE, EnemyEnums.EnemyStates.DYING],
            },
            [EnemyEnums.EnemyStates.DYING]: {
                init: this.dyingInit.bind(this),
                update: this.dyingUpdate.bind(this),
                teardown: this.dyingTeardown.bind(this),
                transitions: [],
            },
        }; // Data specific to the current state
        this.stateData[this.currentState].init(); // Initialize the current state
    }

    canTransitionTo(newState) {
        return this.stateData[this.currentState]?.transitions.includes(newState);
    }

    setState(newState){
        // Change to a new state if the transition is allowed
        if (!this.canTransitionTo(newState)) {return}
            this.stateData[this.currentState].teardown(); // Teardown the current state
            this.currentState = newState; // Change to the new state
            this.stateData[this.currentState].init(); // Initialize the new state
        
    }

    update(deltaTime) {
        // Update logic based on the current state
        const currentStateData = this.stateData[this.currentState];
        if(currentStateData) {
            currentStateData.update(deltaTime); // Call the update method of the current state
        }
    }

    // --- IDLE STATE ---
    idleInit() {
        // Initialization logic for the idle state
        console.log("Enemy is now idle.");
    }
    idleUpdate(deltaTime) {
        // Update logic for the idle state
        console.log("Enemy is idling.");
    }
    idleTeardown() {
        // Teardown logic for the idle state
        console.log("Enemy is leaving idle state.");
    }
    // --- PATROLLING STATE ---
    patrollingInit() {
        // Initialization logic for the patrolling state
        console.log("Enemy is now patrolling.");
    }
    patrollingUpdate(deltaTime) {
        // Update logic for the patrolling state
        console.log("Enemy is patrolling.");
    }
    patrollingTeardown() {
        // Teardown logic for the patrolling state
        console.log("Enemy is leaving patrolling state.");
    }
    // --- ATTACKING STATE ---
    attackingInit() {
        // Initialization logic for the attacking state
        console.log("Enemy is now attacking.");
    }
    attackingUpdate(deltaTime) {
        // Update logic for the attacking state
        const path = Utils.dijkstra(this.enemy.pos.toGrid(), this.player.pos.toGrid());
        if (path.length > 1) {
            this.enemy.moveToward(path[1]);
        }
        console.log("Enemy is attacking.");
    }
    attackingTeardown() {
        // Teardown logic for the attacking state
        console.log("Enemy is leaving attacking state.");
    }
    // --- DYING STATE ---
    dyingInit() {
        // Initialization logic for the dying state
        console.log("Enemy is now dying.");
    }
    dyingUpdate(deltaTime) {
        // Update logic for the dying state
        console.log("Enemy is dying.");
    }
    dyingTeardown() {
        // Teardown logic for the dying state
        console.log("Enemy has died.");
    }
}