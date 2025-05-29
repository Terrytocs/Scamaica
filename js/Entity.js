("use strict");

import {EntityEnums} from "./Enum.js";

export default class Entity {
    constructor(pos) {
        Object.assign(this,EntityEnums.EntityData); // Assign default entity data from Enums
        this.pos = pos; // Position of the entity
    }    
}

