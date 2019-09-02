import { LocalDatabase } from "../class/LocalDatabase";

export class BootScene extends Phaser.Scene {
    constructor(){
        super('BootScene');
    }

    init(){
        console.log("BootScene");
    }

    create(){
        // Initialize config & global variable
        let gameConfig = this.sys.game.config;
        gameConfig.gameTitle = "Project Template";
        gameConfig.gameVersion = "0.0.1";
        gameConfig.centerX = gameConfig.width / 2;
        gameConfig.centerY = gameConfig.height / 2;
        
        gameConfig.emitter = new Phaser.Events.EventEmitter();
        gameConfig.score = -1;
        let db = new LocalDatabase(`${gameConfig.gameTitle}_${gameConfig.gameVersion}`);
        gameConfig.db = db;
        db.getData("highscore", true, 0);
        
        this.scene.start('PreloadScene', gameConfig);
    }

}