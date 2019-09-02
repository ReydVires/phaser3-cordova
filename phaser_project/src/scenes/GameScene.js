import { Bird } from "../class/Bird";
import { Pipe } from "../class/Pipe";

export class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene');
    }

    init(config){
        console.log("GameScene");
        this.config = config;
    }

    create(){
        this.background = this.add
            .tileSprite(0, 0, 360, 640, "background")
            .setOrigin(0);

        this.tileGround = this.add
            .tileSprite(0, this.config.height, 360, 115, "ground")
            .setOrigin(0, 1)
            .setDepth(2);

        this.scoreText = this.add
            .bitmapText(this.config.centerX, 40, "font", this.config.score)
            .setOrigin(0.5)
            .setDepth(4);
        
        // Set ground collider
        this.ground = this.physics.add.sprite(this.config.centerX, this.config.centerY + 210, null);
        this.ground.setImmovable()
            .setOrigin(0.5)
            .setSize(this.config.width, 16)
            .setVisible(false);
        this.ground.body.setAllowGravity(false);

        this.pipes = this.add.group({classType: Pipe});

        this.bird = new Bird(this, 50, 100, "bird");
        this.bird.body.setBounce(0, 0.15);
        
        // Interact with other collider
        this.physics.add.overlap(this.bird, this.pipes, this.deadBird.bind(this));
        this.physics.add.collider(this.bird, this.ground, () => {
            this.deadBird();
            this.time.addEvent({
                delay: 700,
                callback: () => {
                    this.config.score = -1;
                    this.scene.restart();
                }
            });
        });

        this.addNewRowPipes();
        
        this.spawnPipes = this.time.addEvent({
            delay: 1700,
            callback: () => { this.addNewRowPipes(); },
            loop: true
        });
    }

    update(){
        if (!this.bird.getDead()){
            this.bird.update();
            if (this.bird.y < -(this.bird.displayHeight / 2)){
                this.deadBird();
            }
            this.pipes.getChildren().forEach((pipe) => {
                if (pipe.x < -pipe.displayWidth){
                    pipe.destroy();
                }
            });
            this.moveBackground(-0.7);
        }
        else {
            this.pipes.getChildren().forEach((pipe) => {
                pipe.body.setVelocityX(0);
            });
        }

    }

    moveBackground(speed){
        let newPosX = this.background.tilePositionX - speed;
        this.background.setTilePosition(newPosX);
        this.tileGround.setTilePosition(newPosX);
    }

    addNewRowPipes(){
        this.config.score++;
        this.scoreText.setText(this.config.score);
        this.saveHighscore(this.config);

        let hole = Math.floor(Math.random() * 5) + 1;

        let wideType = Math.random() < 0.69;
        for (let i = 0; i < 10; i++) {
            if (wideType){
                if (i !== hole && i !== hole + 1 && i !== hole + 2){
                    if (i === hole - 1){
                        this.addPipe(400, i * 60, 0);
                    }
                    else if (i === hole + 3){
                        this.addPipe(400, i * 60, 1);
                    }
                    else {
                        this.addPipe(400, i * 60, 2);
                    }
                }
            }
            else {
                if (i !== hole && i !== hole + 1){
                    if (i === hole - 1){
                        this.addPipe(400, i * 60, 0);
                    }
                    else if (i === hole + 2){
                        this.addPipe(400, i * 60, 1);
                    }
                    else {
                        this.addPipe(400, i * 60, 2);
                    }
                }
            }
        }
    }

    addPipe(x, y, frame){
        this.pipes.add(new Pipe(this, x, y, 'pipe', frame));
    }

    deadBird(){
        this.spawnPipes.remove();
        this.bird.setTexture("bird_dead");
        this.bird.setDead(true);
        this.tweens.add({
            targets: this.bird,
            props: { angle: 30 },
            duration: 350,
            ease: "Sine"
        });
    }

    saveHighscore(gameConfig){
        let { db, score } = gameConfig; // destructuring object
        let highscore = db.getData("highscore");
        if (score > highscore){
            db.saveData("highscore", score);
        }
    }

}