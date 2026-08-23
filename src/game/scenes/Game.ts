import * as Phaser from 'phaser';
import { EventBus } from '../EventBus.js';
import { createGround } from '../entities/ground.js';
import { createObstacle } from '../entities/obstacle.js';
import { createPlayer } from '../entities/player.js';
import { setupCollision, setupObstacleCollision } from '../systems/collision.js';
import { setupCursors, setupJumpKey } from '../systems/input.js';
import { setupObstacleSpawner, handleObstacles } from '../systems/obstacles.js';
import { handlePlayerMovement, handlePlayerJump } from '../systems/player.js';
import type { GameState } from '../types/game.js';

function create(this: Phaser.Scene) {
    const game = createGameState(this);

    setupCollision(game);
    setupObstacleSpawner(game);
    EventBus.emit('current-scene-ready', game.scene);
}


function update() {
    if (!gameState) {
        return;
    }

    handlePlayerMovement(gameState);
    handlePlayerJump(gameState);
    handleObstacles(gameState);
}

let gameState: GameState | null = null;


function createGameState(scene: Phaser.Scene): GameState {
    const game: GameState = {
        scene,
        player: createPlayer(scene),
        ground: createGround(scene),
        obstacles: [],
        cursors: setupCursors(scene),
        jumpKey: setupJumpKey(scene),
        obstacleSpawner: null as Phaser.Time.TimerEvent | null
    };

    gameState = game;

    return game;
}
export {
    create,
    update
};