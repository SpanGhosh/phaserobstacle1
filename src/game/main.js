import { create, update } from './scenes/Game';
import { AUTO, Game } from 'phaser';

const config = {
    type: AUTO,

    width: 1024,
    height: 768,

    parent: 'game-container',

    backgroundColor: '#028af8',

    physics: {
        default: 'arcade',

        arcade: {
            gravity: {
                y: 1000
            },

            debug: true
        }
    },

    scene: {
        create,
        update
    }
};

const StartGame = (parent) =>
{
    return new Game({
        ...config,
        parent
    });
};

export default StartGame;