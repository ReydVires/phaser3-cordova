import 'phaser';
import { BootScene } from "./scenes/BootScene";
import { PreloadScene } from "./scenes/PreloadScene";
import { MainScene } from "./scenes/MainScene";
import { GameScene } from "./scenes/GameScene";

let scenes = [];

const gameConfig = {
    type: Phaser.WEBGL,
    parent: 'phaser-game',
    width: 360,
    height: 640,
    backgroundColor: '#fafafa',
    pixelArt: true,
    // zoom: 1.5,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    seed: Date.now(),
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: scenes
};

export class Game extends Phaser.Game {
    constructor(config){
        super(config);
        console.log("Game is running");
    }
}

window.addEventListener("load", () => {
    scenes.push(BootScene); // will run first
    scenes.push(PreloadScene);
    scenes.push(MainScene);
    scenes.push(GameScene);

    if (isAndroid()){
        document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    }
    else {
        onDeviceReady();
    }
    
});

function isAndroid(){
    let isOSAvailable = false;
    if (window.cordova !== undefined){
        if (window.cordova.platformId === "android"){
            isOSAvailable = true;
        }
    }
    return isOSAvailable;
}

function onDeviceReady() {
    if (isAndroid()){
        window.plugins.insomnia.keepAwake(); // external plugin
    }
    const game = new Game(gameConfig);
}
