("use strict");

export default class Fall {
    static methods = {
        fallInit: (player)=> {
            this.fallInit(player);
        },
        fallUpdate: (player, dt)=> {
            this.fallUpdate(player, dt);
        },
        fallTeardown: (player)=> {
            this.fallTeardown(player);
        }
    }

    // Falling
    static fallInit(player) {
        console.log(`${player} is falling.`);
      }
    static fallUpdate(player,dt) {
          player.vel.z -= player.gravity * dt;
          player.pos.z += player.vel.z * dt;
      
          if (player.pos.z <= 0) {
              player.pos.z = 0;
              setState(PlayerEnums.PlayerStates.IDLE);
          }
      }
    static fallTeardown(player) {
          player.vel.z = 0;
          console.log(`${player} has stopped falling.`);
      }
}