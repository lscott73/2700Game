import './style.css'
import Phaser from 'phaser'

const sizes = {
    width: 1000,
    height: 700
}

const config = {
    type : Phaser.WEBGL,
    width : sizes.width,
    height : sizes.height,
    canvas:gameCanvas
}

const game = new Phaser.Game(config);