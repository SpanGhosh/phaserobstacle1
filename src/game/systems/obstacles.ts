import * as Phaser from 'phaser';
import { createObstacle } from "../entities/obstacle.js";
import { setupObstacleCollision } from "./collision.js";
import type { GameState } from '../types/game.js';

export function setupObstacleSpawner(game: GameState): void {
    game.obstacleSpawner = game.scene.time.addEvent({
        delay: Phaser.Math.Between(1000, 2200),

        callback: () => {
            const obstacle = createObstacle(game.scene);

            game.obstacles.push(obstacle);
            setupObstacleCollision(game, obstacle);
        },

        loop: true
    });
}
export function handleObstacles(game: GameState): void {
    for (const obstacle of game.obstacles) {
        if (obstacle.destructionTexture) {
            obstacle.destructionTexture.setPosition(
                obstacle.x,
                obstacle.y
            );
        }

        if (obstacle.x < -100) {
            obstacle.destroy();
        }
    }

    game.obstacles = game.obstacles.filter(
        obstacle => obstacle.active
    );
}