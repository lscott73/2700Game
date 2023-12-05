import '../style.css'
import Phaser from 'phaser'
import Game from './scenes/game'
import LoadScreen from './scenes/loadscreen';
import { instructions } from './scenes/instructions';
import loss from './scenes/loss';
import win from './scenes/win';

const sizes = {
    width: 1000,
    height: 700
}

const config = {
    type : Phaser.WEBGL,
    width : sizes.width,
    height : sizes.height,
    canvas: gameCanvas,
    scene:[LoadScreen, instructions, Game, win, loss]
}

const game = new Phaser.Game(config);