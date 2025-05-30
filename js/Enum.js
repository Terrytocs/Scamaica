("use strict");

import Vec3 from "./Vec3.js";
import Weapon from "./Weapons.js";

export class Enums{
    static EntityData = {
        health: 100,
        maxHealth: 100,
        dir: new Vec3(0, 0, 0),
        vel: new Vec3(0, 0, 0),
        isDead: false,
        spriteType:null,
        frame: 0,
    };

    static PlayerData = {
        jumpStrength: 10,
        stamina: 100,
        maxStamina: 100,
        currentWeaponIndex: 0,
        speed:3,
        sprintSpeed: 5,
        weaponFrame: 0,
    };
    
    static EnemyData = {
        speed: 1,
        damage: 10,
        attackRange: 2,
    };

    static WeaponStates = {
        IDLE: "idle",
        FIRING: "firing",
        COOLDOWN: "cooldown",
        RELOADING: "reloading",
        SWITCHING: "switching",
    };

    static PlayerStates={
        IDLE: "idle",
        MOVE_FORWARD: "move_forward",
        MOVE_BACKWARD: "move_backward",
        MOVE_LEFT: "move_left",
        MOVE_RIGHT: "move_right",
        CROUCHING: "crouching",
        JUMPING: "jumping",
        ATTACKING: "attacking",
        SWITCHING: "switching",
        SLIDING: "sliding",
        AIM: "aim",
        SPRINTING: "sprinting",
        FALL:"falling"
    };

    static EnemyStates = {
        IDLE: "idle",
        PATROLLING: "patrolling",
        ATTACKING: "attacking",
        DYING: "dying",
    };

    static GameState = {
        PLAYING: "playing",
        PAUSED: "paused",
        GAME_OVER: "game_over",
    };
}

export class EnemyEnums extends Enums {
    static EnemyData = {
        ...Enums.EnemyData,
    };
    static EnemyStates = {
        ...Enums.EnemyStates,
    };
}

export class EntityEnums extends Enums {
    static EntityData = {
        ...Enums.EntityData,
    };
}

export class PlayerEnums extends Enums {
    static PlayerData = {
        ...EntityEnums.PlayerData,
        
    };

    static PlayerStates = {
        ...EntityEnums.PlayerStates,
    };
}

export class WeaponEnums extends Enums {
    static WeaponStates = {
        ...EntityEnums.WeaponStates,
    };
}

export class PlayerWeapons {
    static weapons={
        melee:new Weapon("Crowbar", {
            type:"melee",
            damage: 10,
            range: 1.5,
            cooldown: 0.5,
            reloadTime: 0,
            ammo: 0, // Melee weapons typically don't use ammo
            maxAmmo: 0, // No maximum ammo for melee weapons
            isAutomatic: false,
            isReloading: false,
            isFiring: false,
            altFire: false,
            hasItem: true,// Melee weapon is in inventory by default
        }),
        pistol: new Weapon("Pistol", {
            type: "ranged",
            damage: 20,
            range: 50,
            cooldown: 0.3,
            reloadTime: 1.5,
            ammo: 12,
            maxAmmo: 12,
            isAutomatic: false,
            isReloading: false,
            isFiring: false,
            altFire: false,
            hasItem: false, // Pistol is not in inventory by default
        }),
        rifle: new Weapon("Rifle", {
            type: "ranged",
            damage: 30,
            range: 100,
            cooldown: 0.2,
            reloadTime: 2.0,
            ammo: 30,
            maxAmmo: 30,
            isAutomatic: true,
            isReloading: false,
            isFiring: false,
            altFire: false,
            hasItem: false, // Rifle is not in inventory by default
        }),
        shotgun: new Weapon("Shotgun", {
            type: "ranged",
            damage: 50,
            range: 20,
            cooldown: 1.0,
            reloadTime: 2.5,
            ammo: 8,
            maxAmmo: 8,
            isAutomatic: false,
            isReloading: false,
            isFiring: false,
            altFire: false,
            hasItem: false, // Shotgun is not in inventory by default
        }),
        loadout: [
            "melee", // Default melee weapon
            "pistol",
            "rifle",
            "shotgun",
        ],
        inventory:["Crowbar"],
    };
}