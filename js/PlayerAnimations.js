("use strict");

import { PlayerEnums } from "./Enum.js";

export default class PlayerAnimations{
    static data={
        frames:new Map([
            //IDLE
            ["idle-1",[[0,0,72,120],[144,239,144,240],60]],
            ["idle-2",[[0,0,72,120],[144,235,144,240],60]],

            //MOVING
            ["move-1",[[0,0,72,120],[144,239,144,240],10]],
            ["move-2",[[0,0,72,120],[145,235,144,240],10]],
            ["move-3",[[0,0,72,120],[150,235,144,240],10]],
            ["move-4",[[0,0,72,120],[155,239,144,240],10]],
            ["move-5",[[0,0,72,120],[150,235,144,240],10]],
            ["move-6",[[0,0,72,120],[145,235,144,240],10]],

            //Reload
            ["reload-1",[[0,0,72,120],[145,235,144,240],10]],
            ["reload-2",[[0,0,72,120],[145,235,144,240],10]],
            ["reload-3",[[0,0,72,120],[145,235,144,240],10]],
            ["reload-4",[[0,0,72,120],[145,235,144,240],10]],
            ["reload-5",[[0,0,72,120],[145,235,144,240],10]],

            //Pistol
            ["pistol-1",[[0,0,72,120],[145,235,144,240],10]],
            ["pistol-2",[[0,0,72,120],[145,235,144,240],10]],
            ["pistol-3",[[0,0,72,120],[145,235,144,240],10]],
            ["pistol-4",[[0,0,72,120],[145,235,144,240],10]],
        ]),
        animations:{
            //IDLE
            [PlayerEnums.PlayerStates.IDLE]:["idle-1","idle-2"],

            //MOVING
            [PlayerEnums.PlayerStates.MOVE_FORWARD]:["move-1","move-2","move-3","move-4","move-5","move-6"],
            [PlayerEnums.PlayerStates.MOVE_BACKWARD]:["move-1","move-2","move-3","move-4","move-5","move-6"],
            [PlayerEnums.PlayerStates.MOVE_LEFT]:["move-1","move-2","move-3","move-4","move-5","move-6"],
            [PlayerEnums.PlayerStates.MOVE_RIGHT]:["move-1","move-2","move-3","move-4","move-5","move-6"],

            //RELOADING
            [PlayerEnums.PlayerStates.RELOADING]:["reload-1","reload-2","reload-3","reload-4","reload-5"],

            //ATTACKING
            [PlayerEnums.PlayerStates.PISTOL_FIRE]:["pistol-1","pistol-2","pistol-3","pistol-4"],
        }
    };
}