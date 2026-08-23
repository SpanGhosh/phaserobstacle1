import * as Phaser from 'phaser';
import type { Bullet, GameState } from '../types/game.js';
import { handleBulletObstacleCollision } from '../systems/damage/bulletObstacle.js';

export function createBullet(scene: Phaser.Scene, x: number, y: number, game: GameState): Bullet {
    const bullet = scene.add.rectangle(
        x,
        y,
        12,
        4,
        0xffff00
    ) as Bullet;
    bullet.damage = 25;
    bullet.type = 'metal';
    scene.physics.add.existing(bullet);
    for (const obstacle of game.obstacles) {
        game.scene.physics.add.collider(
            bullet,
            obstacle,
            () => handleBulletObstacleCollision(
                bullet,
                obstacle,
                game
            )
        );
    }
    bullet.body.setAllowGravity(false);
    bullet.body.setVelocityX(600);

    return bullet;
}