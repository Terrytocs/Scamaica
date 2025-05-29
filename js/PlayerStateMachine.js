("use strict");

import {PlayerEnums} from "./Enum.js";
import Vec3 from "./Vec3.js";

export default class PlayerStateMachine {
    constructor(player) {
        this.player = player; // Reference to the player instance
        this.currentState = PlayerEnums.PlayerStates.IDLE; // Initial state
        this.stateData = {
          [PlayerEnums.PlayerStates.IDLE]: {
            init: this.idleInit.bind(this),
            update: this.idleUpdate.bind(this),
            teardown: this.idleTeardown.bind(this),
            transitions:[PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.MOVE_FORWARD]: {
            init: this.moveForwardInit.bind(this),
            update: this.moveForwardUpdate.bind(this),
            teardown: this.moveForwardTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.MOVE_BACKWARD]: {
            init: this.moveBackwardInit.bind(this),
            update: this.moveBackwardUpdate.bind(this),
            teardown: this.moveBackwardTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.MOVE_LEFT]: {
            init: this.moveLeftInit.bind(this),
            update: this.moveLeftUpdate.bind(this),
            teardown: this.moveLeftTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.MOVE_RIGHT]: {
            init: this.moveRightInit.bind(this),
            update: this.moveRightUpdate.bind(this),
            teardown: this.moveRightTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.CROUCHING]: {
            init: this.crouchInit.bind(this),
            update: this.crouchUpdate.bind(this),
            teardown: this.crouchTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.JUMPING]: {
            init: this.jumpInit.bind(this),
            update: this.jumpUpdate.bind(this),
            teardown: this.jumpTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.FALLING, PlayerEnums.PlayerStates.ATTACKING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.ATTACKING]: {
            init: this.attackInit.bind(this),
            update: this.attackUpdate.bind(this),
            teardown: this.attackTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING, PlayerEnums.PlayerStates.FALLING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.SWITCHING]: {
            init: this.switchingInit.bind(this),
            update: this.switchingUpdate.bind(this),
            teardown: this.switchingTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.POWER_SLIDING]: {
            init: this.powerSlideInit.bind(this),
            update: this.powerSlideUpdate.bind(this),
            teardown: this.powerSlideTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.AIMING]: {  
            init: this.aimingInit.bind(this),
            update: this.aimingUpdate.bind(this),
            teardown: this.aimingTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.MOVE_LEFT, PlayerEnums.PlayerStates.MOVE_RIGHT, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING], // Possible transitions from this state
          },
          [PlayerEnums.PlayerStates.SPRINTING]: {
            init: this.sprintInit.bind(this),
            update: this.sprintUpdate.bind(this),
            teardown: this.sprintTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.MOVE_FORWARD, PlayerEnums.PlayerStates.MOVE_BACKWARD, PlayerEnums.PlayerStates.CROUCHING, PlayerEnums.PlayerStates.JUMPING]
          },
          [PlayerEnums.PlayerStates.FALLING]: {
            init: this.fallingInit.bind(this),
            update: this.fallingUpdate.bind(this),
            teardown: this.fallingTeardown.bind(this),
            transitions: [PlayerEnums.PlayerStates.IDLE, PlayerEnums.PlayerStates.JUMPING]
          }
          // Add more states as needed
        }; // Data specific to the current state
        this.stateData[this.currentState].init(); // Set the current state data
    }
    //change state
    setState(newState) {
        if (!this.stateData[this.currentState].transitions.includes(newState)) {
            return; // Prevent transition if it's not allowed
        }
            this.stateData[this.currentState].teardown(this.player); // Call teardown of the current state
            this.currentState = newState; // Change to the new state
            this.stateData[this.currentState].init(); // Call init of the new state
        
    }
    // update state
    update(deltaTime) {
        const currentStateData = this.stateData[this.currentState];
        if (currentStateData) {
            const nextState=currentStateData.update(deltaTime); // Call update of the current state
            if (nextState && this.stateData[this.currentState].transitions.includes(nextState)) {
              this.setState(nextState);
            }
            console.log(this.player.currentState)
        } else {
            console.warn(`No state data found for ${this.currentState}`);
        }
    }
    // Idle
    idleInit() {
        // Initialize idle state
        console.log(`${this.player} is now idle.`);
    }
    idleUpdate(dt) {
        // Update logic for idle state
        console.log(`${this.player} is idling.`);
        // You can add logic here to check for transitions to other states
    }
    idleTeardown() {
        // Teardown logic for idle state
        console.log(`${this.player} is no longer idle.`);
    }
    // Move Forward
    moveForwardInit() {
        // Initialize move forward state
        this.player.vel.set(
          Math.cos(this.player.dir.x) * this.player.speed,
          Math.sin(this.player.dir.x) * this.player.speed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} is moving forward.`);
    }
    moveForwardUpdate(dt) {
        // Update logic for move forward state
        this.player.pos=this.player.pos.add(this.player.vel.scale(dt)); // Update position based on velocity
        console.log(`${this.player} is moving forward.`);
        // You can add logic here to check for transitions to other states
    }
    moveForwardTeardown() {
        // Teardown logic for move forward state
        this.player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} has stopped moving forward.`);
    }
    // Move Backward
    moveBackwardInit() {
        // Initialize move backward state
        this.player.vel.set(
          Math.cos(this.player.dir.x) * this.player.speed,
          Math.sin(this.player.dir.x) * this.player.speed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} is moving backward.`);
    }
    moveBackwardUpdate(dt) {
        // Update logic for move backward state
        this.player.pos=this.player.pos.add(this.player.vel.scale(-dt)); // Update position based on velocity
        console.log(`${this.player} is moving backward.`);
        // You can add logic here to check for transitions to other states
    }
    moveBackwardTeardown() {
        // Teardown logic for move backward state
        this.player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} has stopped moving backward.`);
    }
    // Move Left
    moveLeftInit() {
        // Initialize move left state
        this.player.vel.set(
          Math.cos(this.player.dir.x-(Math.PI/2)) * this.player.speed,
          Math.sin(this.player.dir.x-(Math.PI/2)) * this.player.speed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} is moving left.`);
    }
    moveLeftUpdate(dt) {
        // Update logic for move left state
        this.player.pos=this.player.pos.add(this.player.vel.scale(-dt)); // Update position based on velocity
        console.log(`${this.player} is moving left.`);
        // You can add logic here to check for transitions to other states
    }
    moveLeftTeardown() {
        // Teardown logic for move left state
        this.player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} has stopped moving left.`);
    }
    // Move Right
    moveRightInit() {
        // Initialize move right state
        this.player.vel.set(
          Math.cos(this.player.dir.x-(Math.PI/2)) * this.player.speed,
          Math.sin(this.player.dir.x-(Math.PI/2)) * this.player.speed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} is moving right.`);
    }
    moveRightUpdate(dt) {
        // Update logic for move right state
        this.player.pos=this.player.pos.sub(this.player.vel.scale(dt)); // Update position based on velocity
        console.log(`${this.player} is moving right.`);
        // You can add logic here to check for transitions to other states
    }
    moveRightTeardown() {
        // Teardown logic for move right state
        this.player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} has stopped moving right.`);
    }
    // Sprint
    sprintInit() {
        // Initialize sprint state
        this.player.vel.set(
          Math.cos(this.player.dir.x) * this.player.sprintSpeed,
          Math.sin(this.player.dir.x) * this.player.sprintSpeed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} is now sprinting.`);
    }
    sprintUpdate(dt) {
        // Update logic for sprint state
        if (this.player.stamina <= 0) {
            return PlayerEnums.PlayerStates.IDLE; // Transition to idle if stamina is depleted
        }
        this.player.pos=this.player.pos.add(this.player.vel.scale(dt)); // Update position based on velocity
        this.player.stamina -= dt * 10; // Decrease stamina over time while sprinting
        console.log(`${this.player} is sprinting.`);
        // You can add logic here to check for transitions to other states
    }
    sprintTeardown() {
        // Teardown logic for sprint state
        this.player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} has stopped sprinting.`);
    }
    // Crouch
    crouchInit() {
        // Initialize crouch state
        console.log(`${this.player} is now crouching.`);
    }
    crouchUpdate(dt) {
        // Update logic for crouch state
        console.log(`${this.player} is crouching.`);
        // You can add logic here to check for transitions to other states
    }
    crouchTeardown() {
        // Teardown logic for crouch state
        console.log(`${this.player} has stopped crouching.`);
    }
    // Power slide
    powerSlideInit() {
        // Initialize power slide state
        this.player.vel.set(
          Math.cos(this.player.dir.x) * this.player.sprintSpeed,
          Math.sin(this.player.dir.x) * this.player.sprintSpeed, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} is now power sliding.`);
    }
    powerSlideUpdate(dt) {
        // Update logic for power slide state
        console.log(`${this.player} is power sliding.`);
        // You can add logic here to check for transitions to other states
    }
    powerSlideTeardown() {
        // Teardown logic for power slide state
        this.player.vel.set(
          0,
          0, // Assuming no vertical movement for forward motion
          0 // Assuming forward is along the x-axis
        );
        console.log(`${this.player} has stopped power sliding.`);
    }
    // Jump
    jumpInit() {
        // Initialize jump state
        console.log(`${this.player} is now jumping.`);
        this.player.vel.z = this.player.jumpStrength; // Set the initial jump velocity
    }
    jumpUpdate(dt) {
        // Update logic for jump state
        console.log(`${this.player} is jumping.`);
        this.player.vel.z -= this.player.jumpStrength * dt; // Apply gravity
        this.player.pos.z += this.player.vel.z * dt; // Update position based on velocity
        // You can add logic here to check for transitions to other states, like landing
    }
    jumpTeardown() {
        // Teardown logic for jump state
        console.log(`${this.player} has landed from jumping.`);
        this.player.vel.z = 0; // Reset vertical velocity
    }
    // Switching Weapons
    switchingInit() {
        // Initialize switching state
        console.log(`${this.player} is switching weapons.`);
        // You can add logic here to start the switching animation or process
    }
    switchingUpdate(dt) {
        // Update logic for switching state
        console.log(`${this.player} is switching weapons.`);
        // You can add logic here to check for transitions to other states, like after the switch is complete
    }
    switchingTeardown() {
        // Teardown logic for switching state
        console.log(`${this.player} has switched weapons.`);
        // You can add logic here to finalize the switch, like updating the current weapon index
    }
    // Attack
    attackInit() {
        // Initialize attack state
        console.log(`${this.player} is attacking.`);
        // You can add logic here to start the attack animation or process
    }
    attackUpdate(dt) {
        // Update logic for attack state
        console.log(`${this.player} is attacking.`);
        // You can add logic here to check for transitions to other states, like after the attack is complete
    }
    attackTeardown() {
        // Teardown logic for attack state
        console.log(`${this.player} has finished attacking.`);
        // You can add logic here to finalize the attack, like resetting the attack cooldown
    }
    // Aiming
    aimingInit() {
        // Initialize aiming state
        console.log(`${this.player} is now aiming.`);
        // You can add logic here to start the aiming animation or process
    }
    aimingUpdate(dt) {
        // Update logic for aiming state
        console.log(`${this.player} is aiming.`);
        // You can add logic here to check for transitions to other states, like after the aim is complete
    }
    aimingTeardown() {
        // Teardown logic for aiming state
        console.log(`${this.player} has stopped aiming.`);
        // You can add logic here to finalize the aim, like resetting the aim state
    }
    // Falling
    fallingInit() {
      console.log(`${this.player} is falling.`);
    }
    fallingUpdate(dt) {
        this.player.vel.z -= this.player.gravity * dt;
        this.player.pos.z += this.player.vel.z * dt;
    
        if (this.player.pos.z <= 0) {
            this.player.pos.z = 0;
            this.setState(PlayerEnums.PlayerStates.IDLE);
        }
    }
    fallingTeardown() {
        this.player.vel.z = 0;
        console.log(`${this.player} has stopped falling.`);
    }
  }