import type { GameState } from "../types/game.js";


export function handlePlayerMovement(game: GameState): void {
    const player = game.player;
    const speed = 250;

    if (game.cursors.left.isDown) {
        player.body.setVelocityX(-speed);
    }
    else if (game.cursors.right.isDown) {
        player.body.setVelocityX(speed);
    }
    else {
        player.body.setVelocityX(0);
    }
}


// ============================================
// PLAYER JUMP
// ============================================

export function handlePlayerJump(game: GameState): void {
    const player = game.player;

    const upPressed =
        game.cursors.up.isDown;

    const spacePressed =
        game.jumpKey.isDown;

    const isOnGround =
        player.body.blocked.down;

    if (
        (upPressed || spacePressed) &&
        isOnGround
    ) {
        player.body.setVelocityY(-500);
    }
}