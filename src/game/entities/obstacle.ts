import * as Phaser from 'phaser';
import type { Obstacle } from '../types/game.js';

export function createObstacle(scene: Phaser.Scene): Obstacle {
    const width = Phaser.Math.Between(40, 100);
    const height = Phaser.Math.Between(40, 120);

    const groundTop = 650;

    const x = 1050;
    const y = groundTop - height / 2;

    const obstacle = scene.add.rectangle(
        x,
        y,
        width,
        height,
        0x000000
    ) as Obstacle;
    obstacle.totalHealth = 100;
    obstacle.health = obstacle.totalHealth;
    obstacle.type = 'rock';
    obstacle.area= width * height;

    scene.physics.add.existing(obstacle);

    obstacle.body.setAllowGravity(false);
    obstacle.body.setImmovable(true);
    obstacle.body.setVelocityX(-300);

    return obstacle;
}