import type { Player } from "../types/game.js";


export function createPlayer(scene: Phaser.Scene): Player {
    const player = scene.add.rectangle(
        200,
        600,
        50,
        70,
        0xff0000
    ) as Player;

    scene.physics.add.existing(player);

    player.body.setCollideWorldBounds(true);

    return player;
}