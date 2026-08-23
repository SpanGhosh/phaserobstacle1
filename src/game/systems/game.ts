import type { GameState } from "../types/game.js";


export function stopGame(game: GameState): void {
    game.obstacleSpawner.remove();
    game.obstacles.forEach(obstacle => obstacle.body.setVelocityX(0));
    console.log('GAME OVER');
}