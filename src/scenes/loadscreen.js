const sizes = {
    width: 1000,
    height: 700
}

export default class loadscreen extends Phaser.Scene {
    constructor() {
        super({ key: 'loadscreen' });
    }

    preload() {
        this.load.image('background', BackgroundImg);
        let loadingBar = this.add.graphics({
            fillStyle : {
                color: 0xffffff
            }
        })

        this.load.on("progress", (percent) =>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
            this.scene.start(SCENES.INSTRUCTIONS);
        })


    }
    create() {
        this.scene.start(SCENES.INSTRUCTIONS);

    }

}
