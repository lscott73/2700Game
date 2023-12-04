export class instructions extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.INSTRUCTIONS
        })
    }
    init() {

    }
    create() {
        this.add.image(0,0., "title").setOrigin(0);

        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "playbutton").setDepth(1);

        playButton.setInteractive();
        playButton.on("pointerdown", ()=> {

        })

    }
}