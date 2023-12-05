import Phaser from 'phaser';
const sizes = {
    width: 1000,
    height: 700
}
import BackgroundImg from '../assets/Win.png';

export default class win extends Phaser.Scene {
    constructor() {
        super({ key: 'win' });
    }

    preload() {

        this.load.image('winScreen', BackgroundImg);
    }
    create() {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'winScreen');
        const startPoint = {
            x: this.game.renderer.width / 2,
            y: this.game.renderer.height * 0.55
        }

        const startRadius = 200;
        let startCircle = this.add.circle(startPoint.x, startPoint.y, startRadius, 0x0000ff, 0);
        startCircle.setInteractive();


        startCircle.on('pointerdown', () => {
            this.scene.start('loadscreen')
        })


    }

}
