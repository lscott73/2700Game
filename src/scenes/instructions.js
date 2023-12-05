import Phaser from 'phaser';
import BackgroundImg from '../assets/Instructions.png';
export class instructions extends Phaser.Scene {
    constructor() {
        super({
            key: 'instructions'
        })
    }
    init() {

    }
    preload() {
        this.load.image('instructionsScreen', BackgroundImg);
    }
    create() {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'instructionsScreen');
        const startPoint = {
            x: this.game.renderer.width * 0.9 ,
            y: this.game.renderer.height * 0.8
        };

        const startRadius = 100;
        let startCircle = this.add.circle(startPoint.x, startPoint.y, startRadius, 0x0000ff, 0);
        startCircle.setInteractive();


        startCircle.on('pointerdown', () => {
            this.scene.start('Game')
        })

    }
}