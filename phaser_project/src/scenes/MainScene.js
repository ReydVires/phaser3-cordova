import { UIBlock } from "../class/UIBlock";

export class MainScene extends Phaser.Scene {
    constructor(){
        super('MainScene');
    }

    init(config){
        console.log("MainScene");
        this.config = config;
        // TODO: Menu & GameOve Scene
    }

    create(){
        let gameTitle = this.add.text(0, 0, "Flappy Bird", {
            color: 'black',
            fontSize: '24px',
            stroke: '#000',
            strokeThickness: 1
        })
        .setOrigin(0.5);

        let score = this.config.db.getData("highscore");
        let highscoreData = "HIGHSCORE\n" + score;
        this.add.text(this.config.centerX, 100, highscoreData, {
            color: 'black',
            fontSize: '28px',
            align: 'center'
        })
        .setOrigin(0.5);
        
        this.add.text(this.config.centerX, this.config.centerY + 20, "Tap to Play!", {
            color: 'black',
            fontSize: '22px'
        })
        .setOrigin(0.5);

        // Define control keyboard
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.spaceKey = this.input.keyboard.addKey(keyCodes.SPACE);

        // Define mouse input
        this.input.on('pointerdown', (pointer) => {
            this.scene.start('GameScene', this.config);
        });

        // Set UI panel
        let bird = this.add.sprite(0, 0, 'bird');
        let panel = new UIBlock();
        bird.setScale(5);
        panel.add(bird);
        panel.add(gameTitle);
        panel.setXY(this.config.centerX, this.config.centerY - 70);
        gameTitle.y -= 50;
        
        // Add tween to panel
        this.tweens.add({
            targets: panel,
            props: {
                y: this.config.centerY - 50
            },
            duration: 500,
            yoyo: true,
            repeat: -1
        });

    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)){
            this.scene.start('GameScene', this.config);
        }
    }
}