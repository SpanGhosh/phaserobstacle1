import type { Ground } from "../types/game.js";


export function createGround(scene: Phaser.Scene): Ground {
    const ground = scene.add.rectangle(
        512,
        700,
        1024,
        100,
        0x228b22
    ) as Ground;

    scene.physics.add.existing(ground, true);

    return ground;
}