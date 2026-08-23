
import type { GameState, Obstacle, Player } from "../types/game.js";
import { stopGame } from "./game.js";

export function setupCollision(game: GameState): void {
    game.scene.physics.add.collider(
        game.player,
        game.ground
    );
}
export function setupObstacleCollision(
    game: GameState,
    obstacle: Obstacle
): void {
    game.scene.physics.add.collider(
        obstacle,
        game.player,
        (
            obstacle: Obstacle,
            player: Player
        ) => {
            if (player.body.bottom <= obstacle.body.top) {
                return;
            }
            stopGame(game);
        }
    );
}