("use strict");

import Entity from "./Entity.js";
import {PlayerEnums, PlayerWeapons} from "./Enum.js";
import PlayerStateMachine from "./PlayerStateMachine.js";
import Vec3 from "./Vec3.js";

export default class Player extends Entity {
    constructor(pos,config = {}) {
        super(pos); 
        Object.assign(this,PlayerEnums.PlayerData,PlayerEnums.Weapons,config,PlayerWeapons.weapons); // Assign default player data from Enums and any additional config
        this.stateMachine=new PlayerStateMachine(this); // Initialize the state machine for the player
    }
  
    update(deltaTime) {
        this.stateMachine.update(deltaTime); // Update the player's state machine

        this.vel.set(0,0,0);
        if(this.keys["w"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_FORWARD);
        }
        if(this.keys["s"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_BACKWARD);
        }
        if(this.keys["a"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_LEFT);
        }
        if(this.keys["d"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_RIGHT);
        }
    }
  }