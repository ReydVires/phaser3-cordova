export class Pipe extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame){
        super(scene, x, y, key, frame);
        
        // Image
        this.setScale(3)
            .setOrigin(0)
            .setDepth(1);
        
        // Physics
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false) // Will not affected with gravity
            .setVelocityX(-200)
            .setSize(20, 20)
            .setImmovable();
        
        // Add to current scene
        scene.add.existing(this);
    }
}