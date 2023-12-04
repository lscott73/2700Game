import Phaser from 'phaser';
const sizes = {
    width: 1000,
    height: 700
}
import BackgroundImg from 'src/assets/Game Screen.png';

export default class loadscreen extends Phaser.Scene {
    constructor() {
        super({ key: 'loadscreen' });
    }

    preload() {
        this.load.image('gameScreen', BackgroundImg);
        let loadingBar = this.add.graphics({
            fillStyle : {
                color: 0xffffff
            }
        })

        this.load.on("progress", (percent) =>{
            loadingBar.clear();
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
            this.scene.start('instructions');
        })


    }
    create() {
        this.scene.start('instructions');

    }

}
