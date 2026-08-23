import { createBullet } from "../entities/bullet.js";
import type { GameState } from "../types/game.js";

export function shoot(game: GameState) {
    createBullet(
        game.scene,
        game.player.x + 30,
        game.player.y,game
    );
}