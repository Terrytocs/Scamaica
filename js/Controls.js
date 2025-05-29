("use strict");

import {PlayerEnums} from "./Enum.js";
import Vec3 from "./Vec3.js";

export default class Controls{
    constructor(player,canvas) {
        this.player = player; // Reference to the player instance
        this.canvas = canvas; // Reference to the canvas element
        this.addEventListeners();
    }
    addEventListeners() {
        window.addEventListener("keydown", (event) => this.handleKeyDown(event));
        window.addEventListener("keyup", (event) => this.handleKeyUp(event));
        window.addEventListener("mousemove", (event) => this.handleMouseMove(event)); 
        window.addEventListener("mousedown", (event) => this.handleMouseDown(event));
        window.addEventListener("mouseup", (event) => this.handleMouseUp(event));
    }
    handleMouseMove(event) {
        // Calculate the movement based on mouse movement
        if (event.movementX || event.movementY) {
            // Update player's aim direction or camera rotation based on mouse movement
            this.player.dir += event.movementX * 0.01; // Adjust sensitivity as needed
        }
    }
    handleMouseDown(event) {
        // Handle mouse button down for firing or other actions
        if (event.button === 0) { // Left mouse button
            this.player.stateMachine.setState(PlayerEnums.PlayerStates.ATTACKING);
        }
        if (event.button === 2) { // Right mouse button
            this.player.stateMachine.setState(PlayerEnums.PlayerStates.AIMING);
        }
    }
    handleMouseUp(event) {
        // Handle mouse button up to stop firing or other actions
        if (event.button === 0) { // Left mouse button
            this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
        }
        if (event.button === 2) { // Right mouse button
            this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
        }
    }
    handleKeyDown(event) {
        switch (event.key) {
            case "w":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_FORWARD);
                break;
            case "s":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_BACKWARD);
                break;
            case "a":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_LEFT);
                break;
            case "d":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.MOVE_RIGHT);
                break;
            case "c":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.CROUCHING);
                break;
            case " ":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.JUMPING);
                break;
            default:
                break;
        }
    }
    handleKeyUp(event) {
        switch (event.key) {
            case "w":
            case "s":
            case "a":
            case "d":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
                break;
            case "c":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
                break;
            case " ":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
                break;
            case "f":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
                break;
            default:
                break;
        }
    }
}