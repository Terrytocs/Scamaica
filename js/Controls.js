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
        this.canvas.addEventListener("contextmenu", (event) => event.preventDefault()); // Prevent right-click context menu
        this.canvas.addEventListener("wheel", (event) => this.handleMouseWheel(event)); // Handle mouse wheel for zooming or scrolling
    }
    handleMouseWheel(event) {
        // Handle mouse wheel for zooming or scrolling
        event.preventDefault(); // Prevent default scrolling behavior
        const zoomAmount = event.deltaY * 0.01; // Adjust sensitivity as needed
        this.player.camera.zoom += zoomAmount; // Adjust camera zoom level
        if (this.player.camera.zoom < 0.1) {
            this.player.camera.zoom = 0.1; // Prevent zooming out too far
        } else if (this.player.camera.zoom > 5) {
            this.player.camera.zoom = 5; // Prevent zooming in too far
        }
        console.log(`Camera zoom level: ${this.player.camera.zoom}`);
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
            this.player.stateMachine.setState(PlayerEnums.PlayerStates.AIM);
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
        event.preventDefault(); // Prevent default action for key presses
        
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
            case "Control":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.CROUCHING);
                break;
            case " ":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.JUMPING);
                break;
            case "Shift":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.SPRINTING);
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
            case "Control":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
                break;
            case " ":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
                break;
            case "Shift":
                this.player.stateMachine.setState(PlayerEnums.PlayerStates.IDLE);
                break;
            default:
                break;
        }
    }
}