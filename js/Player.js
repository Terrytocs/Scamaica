("use strict");

import Entity from "./Entity.js";
import {PlayerEnums, PlayerWeapons} from "./Enum.js";
import PlayerStateMachine from "./PlayerStateMachine.js";
import PlayerAnimations from "./PlayerAnimations.js";

export default class Player extends Entity {
    constructor(pos,config = {}) {
        super(pos); 
        Object.assign(this,PlayerEnums.PlayerData,PlayerEnums.Weapons,config,PlayerWeapons.weapons,PlayerAnimations.data); // Assign default player data from Enums and any additional config
        this.stateMachine=new PlayerStateMachine(this); // Initialize the state machine for the player
    }
  
    update(deltaTime) {
        this.stateMachine.update(deltaTime); // Update the player's state machine
        [this.currentFrame,this.frameOffset,this.animationFrameDelay]=this.frames.get(this.animations[this.stateMachine.currentState][this.animationFrame]);

        (++this.animationTimer);
        if(this.animationTimer>this.animationFrameDelay){
            (this.animationTimer=0);
            if(this.animationFrame<this.animations[this.stateMachine.currentState].length-1){
                (++this.animationFrame);
                console.log(this.stateMachine.currentState)
            }else{
                this.animationFrame=0;
            }
        }

        this.vel.set(0,0,0);
        this.enableHeadBob = false;
        if(this.keys["w"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_FORWARD);
            this.enableHeadBob = true;
        }else if(this.keys["s"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_BACKWARD);
            this.enableHeadBob = true;
        }else if(this.keys["a"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_LEFT);
            this.enableHeadBob = true;
        }else if(this.keys["d"]){
            this.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_RIGHT);
            this.enableHeadBob = true;
        }else if(this.keys[" "]&&this.grounded){
            this.stateMachine.setState(PlayerEnums.PlayerStates.JUMPING);
        }else{
            this.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
        }

        this.headBob=this.enableHeadBob ? Math.sin(Date.now()/100)*4-this.pos.z*200 : 0; // Simple head bob effect
    }
  }