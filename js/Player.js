("use strict");

import Entity from "./Entity.js";
import {PlayerEnums, PlayerWeapons} from "./Enum.js";
import PlayerStateMachine from "./PlayerStateMachine.js";

export default class Player extends Entity {
    constructor(pos,config = {}) {
        super(pos); 
        Object.assign(this,PlayerEnums.PlayerData,PlayerEnums.Weapons,config,PlayerWeapons.weapons); // Assign default player data from Enums and any additional config
        this.stateMachine=new PlayerStateMachine(this); // Initialize the state machine for the player
        this.currentState=this.stateMachine.currentState; // Set the current state of the player
    }
  
    update(deltaTime) {
        this.stateMachine.update(deltaTime); // Update the player's state machine
    }
  }