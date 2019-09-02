export class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key){
        super(scene, x, y, key);

        // Private data        
        this.setData({
            "isDead": false,
            "isFlapping": false
        });

        // Sprite
        this.setScale(3)
            .setOrigin(0)
            .setDepth(3);

        // Physics
        scene.physics.world.enable(this);
        this.body.setGravityY(1000)
            .setSize(15, 12);

        // Input
        this.jumpKey = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        scene.input.on('pointerdown', () => {
            this.doFlapping();
        });

        // Add to current scene
        scene.add.existing(this);
        this.scene = scene;
    }
    
    update(){
        // Angle change
        if (this.angle < 30) this.setAngle(this.angle + 2);

        // Handle input
        if (this.jumpKey.isDown && !this.getData('isFlapping')){
            this.doFlapping();
        }
        else if (this.jumpKey.isUp && this.getData('isFlapping')){
            this.setData('isFlapping', false);
        }

        // Check if off the screen
        if (this.y + this.height > this.scene.config.height){
            this.setDead(true);
        }
        
    }

    getDead(){
        return this.getData('isDead');
    }

    setDead(value){
        this.setData('isDead', value);
    }

    doFlapping(){
        if (!this.getDead()){
            this.setData('isFlapping', true);
            this.body.setVelocityY(-400);
            this.scene.tweens.add({
                targets: this,
                props: { angle: -20 },
                duration: 150,
                ease: "Power0"
            });
        }
    }
}