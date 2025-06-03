("use strict");

import {EntityEnums} from "./Enum.js";
import Level from "./Level.js";
import Vec3 from "./Vec3.js";

export default class Entity {
    constructor(pos) {
        Object.assign(this,EntityEnums.EntityData); // Assign default entity data from Enums
        this.pos = pos; // Position of the entity
    }
    
}

