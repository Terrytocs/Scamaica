("use strict");

import Weapon from "./Weapons.js";

export default class Enums{
    static PlayerData={
        stamina:100,
        staminaRegen:0.4,
        dodgeCost:20,
        keys:{},
        lookAngle:0,
        headBob:0,
        enableHeadBob:false,
        enableTilt:true,
        z:0,
        zVelocity:0,
        grounded:true,
        jumpStrength:0.15,
        crouching:false,
        shakeTime:0
    };

    static Weapons={
        weapons:{
            melee:new Weapon("Fists","melee",0,true,null,"semi",60),
            machineGun:new Weapon("Machine Gun","gun",53,false,null,"auto",700),
            desertEagle:new Weapon("Desert Eagle","gun",13,false,null,"semi",300),
            sawnOff:new Weapon("Sawn-Off Shotgun","gun",2,false,"double","semi",100),
            uzi:new Weapon("Uzi","gun",32,false,null,"auto",900),
            spas12:new Weapon("Spas-12","gun",13,false,null,"auto",120)
        }
    };
}