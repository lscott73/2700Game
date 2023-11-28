import BackgroundImg from '../assets/bg.png'
import AppleImg from '../assets/apple.png'
import CyanCardBack from '../assets/CyanCardBack.png';
import CyanCardFront from '../assets/CyanCardFront.png';
import MagentaCardBack from '../assets/MagentaCardBack.png';
import MagentaCardFront from '../assets/MagentaCardFront.png';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.image('background', BackgroundImg);
        this.load.image('apple', AppleImg);
        this.load.image('cyanCardBack', CyanCardBack);
        this.load.image('cyanCardFront', CyanCardFront);
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.add.image(500, 350, 'apple').setOrigin(0, 0);
        this.add.image(0, 0, 'cyanCardBack').setOrigin(0, 0).setScale(0.25);
        this.add.image(150, 0, 'cyanCardFront').setOrigin(0, 0).setScale(0.25);
    }

    update() {

    }
}