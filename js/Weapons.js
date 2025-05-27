("use strict");

export default class Weapon{
    constructor(name,type,ammoCapacity,usesStamina=false,altFire=null,fireMode="semi",fireRate=600,reloadTime=1000){
        this.name=name;
        this.type=type;//melee or gun
        this.ammoCapacity=ammoCapacity;
        this.currentAmmo=ammoCapacity;
        this.usesStamina=usesStamina;
        this.altFire=altFire;
        this.fireMode=fireMode;//semi or auto
        this.canShoot=true;//used to control semi-auto timing
        this.fireRate=fireRate;//rounds per min
        this.fireCooldown=60000/fireRate;//ms per shot
        this.lastShotTime=0;
        this.timeSinceLastShot=this.fireCooldown;
        this.reloading=false;
        this.reloadTimer=0;
        this.reloadTime=reloadTime;
    }
    update(delta){
        if(this.reloading){
            this.reloadTimer+=delta;
            if(this.reloadTimer>=this.reloadTime){
                this.currentAmmo=this.ammoCapacity;
                this.reloading=false;
                this.reloadTimer=0;
            }
        }else{
            this.timeSinceLastShot+=delta;
        }
    }
    reload(){
        if(!this.reloading&&this.currentAmmo<this.ammoCapacity){
            this.reloading=true;
            this.reloadTimer=0;
        }
    }
    canFire(player){
        if(this.reloading){
            return;
        }
        const now=Date.now();
        if(now-this.lastShotTime<this.fireCooldown){
            return;
        }

        if(this.type==="melee"){
            return player.stamina>=10;
        }else{
            return this.currentAmmo>0;
        }
    }
    fire(player,alt=false){
        const now=Date.now();

        if(!this.canFire(player)){
            return;
        }

        if(this.type===melee){
            if(player.stamina>=10){
                player.stamina-=10;
                console.log("melee");
            };
        }else{
            if(alt&&this.altFire==="double"&&this.currentAmmo>=2){
                this.currentAmmo-=2;
                console.log(`${this.name} alt fire`)
            }else if(this.currentAmmo>0){
                this.currentAmmo--;
                console.log(`${this.name} fired! Ammo Left: ${this.currentAmmo}`)
            }
        }

        this.timeSinceLastShot=0;
        player.shakeTime=100;//screen shake
        this.doHitscan(player);
        this.canShoot=false;
        this.lastShotTime=now;
    }
    doHitscan(player){
        const maxRange=1000;
        const dx=Math.cos(player.angle),dy=Math.sin(player.angle);

        for(let dist=0;dist<maxRange;dist+=2){
            const x=player.x+dx*dist,y=player.y+dy*dist;

            //check against enemies
            for(const enemy of enemies){
                const ex=enemy.x,ey=enemy.y,d=Math.hypot(x-ex,y-ey);
                
                if(d<10){
                    enemy.takeDamage(25);//customizable per weapon
                    return;
                }
            }
        }
    }
}