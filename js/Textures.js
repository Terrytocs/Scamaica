("use strict");

export default class Textures {
    static textures = {
        loadedTextures: {
            walls:[
                document.getElementById("Bricks_03_128x128"),
            ],
            sprites:{
                enemy:[],
                player:[
                    document.getElementById("PIST2"),
                ],
            },
            floor:[
                document.getElementById("Bricks_03_128x128"),
            ],
            ceiling:[
                document.getElementById("Bricks_03_128x128"),
            ],
        }
    }
}