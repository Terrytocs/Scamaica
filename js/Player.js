("use strict");

import Entity from "./Entity.js";
import Enums from "./Enum.js";
import Utils from "./Utils.js";

export default class Player extends Entity{
    constructor(x,y){
        super(x,y);
        Object.assign(this,Enums.PlayerData);
        Object.assign(this,Enums.Weapons);
        
        this.loadout=[
            this.weapons.melee,
            this.weapons.machineGun,
            this.weapons.desertEagle,
            this.weapons.sawnOff,
            this.weapons.uzi,
            this.weapons.spas12
        ];

        this.currentWeaponIndex=0;


    }
    get currentWeapon(){
        return this.loadout[this.currentWeaponIndex];
    }
    switchWeapon(index){
        if(index>=0&&index<this.loadout.length){
            this.currentWeaponIndex=index;
            console.log(this.currentWeapon.name);
        }
    }
    fireWeapon(alt=false){
        const weapon=this.currentWeapon;
        if(weapon.canFire(this)){
            weapon.fire(this,alt);
        }else{
            console.log("Can't fire ",weapon.name);
        }
    }
    reloadWeapon(){
        const weapon=this.currentWeapon;
        if(weapon.type==="gun"){
            weapon.reload();
            console.log("Reloaded ",weapon.name);
        }
    }
    update(delta){
        const moveSpeed=this.speed;
        let dx=0,dy=0;

        this.currentWeapon.update(delta);

        if(this.shakeTime>0){
            this.shakeTime-=delta;
        }

        this.enableHeadBob=false;
        if(this.keys["w"]){
            dx+=Math.cos(this.dir)*moveSpeed;
            dy+=Math.sin(this.dir)*moveSpeed;
            this.enableHeadBob=true;
        }
        if(this.keys["s"]){
            dx-=Math.cos(this.dir)*moveSpeed;
            dy-=Math.sin(this.dir)*moveSpeed;
            this.enableHeadBob=true;
        }
        if(this.keys["a"]){
            dx+=Math.cos(this.dir-(Math.PI/2))*moveSpeed;
            dy+=Math.sin(this.dir-(Math.PI/2))*moveSpeed;
            this.enableHeadBob=true;
        }
        if(this.keys["d"]){
            dx-=Math.cos(this.dir-(Math.PI/2))*moveSpeed;
            dy-=Math.sin(this.dir-(Math.PI/2))*moveSpeed;
            this.enableHeadBob=true;
        }

        this.stamina=Utils.clamp(this.stamina+this.staminaRegen,0,this.staminaMax);

        //jump and gravity
        if(this.keys[" "]&&this.grounded){
            this.zVelocity=-this.jumpStrength;
            this.grounded=false;
        }

        //crouch
        this.crouching=!!this.keys["Control"];
        const crouchOffset=this.crouching?10:0;

        //apply gravity
        this.zVelocity+=0.01;//gravity
        this.z+=this.zVelocity;

        if(this.z>=0){
            this.z=0;
            this.zVelocity=0;
            this.grounded=true;
        }

        //headbob
        this.headbob=this.enableHeadBob?Math.sin(Date.now()/100)*2-this.z*200+crouchOffset:0;
    }
    getScreenOffset(){
        if(this.shakeTime>0){
            return {
                x:-2+Math.random()*4,
                y:-2+Math.random()*4
            }
        }
        return {x:0,y:0};
    }
}