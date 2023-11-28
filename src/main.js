import BackgroundImg from './assets/bg.png'
import AppleImg from './assets/apple.png'

import '../style.css'
import Phaser from 'phaser'


const sizes = {
    width: 1000,
    height: 700
}

class GameScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('background', BackgroundImg);
        this.load.image('apple', AppleImg);
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.add.image(500, 350, 'apple').setOrigin(0, 0);
    }

    update() {

    }
}



const config = {
    type : Phaser.WEBGL,
    width : sizes.width,
    height : sizes.height,
    canvas:gameCanvas,
    scene:[GameScene]
}

const game = new Phaser.Game(config);