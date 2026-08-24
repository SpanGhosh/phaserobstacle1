import type {
    Bullet,
    DestructionResult,
    DestructionShape,
    GameState,
    Obstacle,
} from '../../types/game.js';


// ============================================
// BULLET → OBSTACLE
// ============================================

export function handleBulletObstacleCollision(
    bullet: Bullet,
    obstacle: Obstacle,
    game: GameState
): void {
    const result = getBulletObstacleDamage(
        bullet,
        obstacle
    );

    if (result.amount <= 0) {
        return;
    }

    damageObstacle(
        obstacle,
        result,
        bullet.x,
        bullet.y
    );

    bullet.destroy();
}


// ============================================
// DAMAGE OBSTACLE
// ============================================

function damageObstacle(
    obstacle: Obstacle,
    result: DestructionResult,
    impactX: number,
    impactY: number
): void {
    obstacle.health -= result.amount;

    const damageArea =
        (result.amount / obstacle.totalHealth) *
        obstacle.area;

    removeObstacleChunk(
        obstacle,
        impactX,
        impactY,
        damageArea,
        result.shape
    );

    if (obstacle.health <= 0) {
        obstacle.destroy();
    }
}

function getBulletObstacleDamage(
    bullet: Bullet,
    obstacle: Obstacle
): DestructionResult {
    if (
        bullet.type === 'metal' &&
        obstacle.type === 'rock'
    ) {
        return {
            amount: bullet.damage,
            shape: 'rectangle'
        };
    }

    return {
        amount: 0,
        shape: 'none'
    };
}


// ============================================
// REMOVE CHUNK
// ============================================

function removeObstacleChunk(
    obstacle: Obstacle,
    impactX: number,
    impactY: number,
    damageArea: number,
    shape: DestructionShape
): void {
    if (
        shape !== 'rectangle' ||
        !obstacle.destructionTexture
    ) {
        return;
    }

    const chunkSize = Math.sqrt(damageArea);

    const localX =
        impactX - obstacle.x + obstacle.width / 2;

    const localY =
        impactY - obstacle.y + obstacle.height / 2;

    const chunk = obstacle.scene.add.rectangle(
        0,
        0,
        chunkSize,
        chunkSize,
        0xffffff
    );

    obstacle.destructionTexture.erase(
        chunk,
        localX,
        localY
    );

    obstacle.destructionTexture.render();

    chunk.destroy();
}