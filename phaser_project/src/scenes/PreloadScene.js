export class PreloadScene extends Phaser.Scene {
    constructor(){
        super('PreloadScene');
    }

    init(config){
        console.log("PreloadScene");
        this.config = config;
    }

    preload(){
        // Progress bar
        this.createProgressbar(this.config.centerX, this.config.centerY);

        // All Assets & Audio: .pack(key, path, keyField)
        this.load.pack("imagePack", "./assets/AssetFile.json", "imagePack");
        this.load.pack("audioPack", "./assets/AssetFile.json", "audioPack");
        this.load.pack("assetsPack", "./assets/AssetFile.json", "assetsPack");
    }

    createProgressbar(x, y){
        // Create text
        const styleText = {
            fill: 'black'
        };
        const loadingText = {
            x: x,
            y: y - 15,
            text: "Now Loading...",
            style: styleText
        };
        this.make.text(loadingText)
            .setOrigin(0.5);

        // Size and position
        this.width = this.config.width - 10;
        this.height = 5;
        this.xStart = x - this.width / 2;
        this.yStart = y - this.height / 2;
        this.color = 0xaaaaaa;

        // Border size
        let borderOffset = 2;

        let borderRect = new Phaser.Geom.Rectangle(
            this.xStart - borderOffset,
            this.yStart - borderOffset,
            this.width + borderOffset * 2,
            this.height + borderOffset * 2
        );

        let border = this.add.graphics({
            lineStyle: {
                width: 2,
                color: this.color
            }
        });
        border.strokeRectShape(borderRect);

        this.progressBar = this.add.graphics();
        
        // Implementation
        this.load.on('progress', this.updateProgressbar.bind(this));

        this.load.once('complete', () => {
            this.load.off('progress', this.updateProgressbar.bind(this));
            this.progressBar.destroy();
            this.scene.start('MainScene', this.config);
        });

    }

    updateProgressbar(percentage){
        // console.log(`Now Loading: ${parseInt(percentage * 100)}%`);
        this.progressBar.clear();
        this.progressBar.fillStyle(this.color, 1);
        this.progressBar.fillRect(this.xStart, this.yStart, percentage * this.width, this.height);
    }
}