import '../style.css'
import Phaser from 'phaser'
import Game from './scenes/game'

const sizes = {
    width: 1000,
    height: 700
}

const config = {
    type : Phaser.WEBGL,
    width : sizes.width,
    height : sizes.height,
    canvas:gameCanvas,
    scene:[Game]
}

const game = new Phaser.Game(config);