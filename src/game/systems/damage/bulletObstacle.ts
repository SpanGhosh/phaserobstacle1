import type {
    Bullet,
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
    damageObstacle(
        obstacle,
        bullet.damage,
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
    damage: number,
    impactX: number,
    impactY: number
): void {

    const damageArea =
        (damage / obstacle.totalHealth) * obstacle.area;
    //simplecalc for now, we can make it more complex later
    obstacle.health -= damage;

    removeObstacleChunk(
        obstacle,
        impactX,
        impactY,
        damageArea
    );

    if (obstacle.health <= 0) {
        obstacle.destroy();
    }
}


// ============================================
// REMOVE CHUNK
// ============================================

function removeObstacleChunk(
    obstacle: Obstacle,
    impactX: number,
    impactY: number,
    damageArea: number
): void {
    const chunkSize = Math.sqrt(damageArea);
    const chunk = obstacle.scene.add.rectangle(
        impactX,
        impactY,
        chunkSize,
        chunkSize
    );
    console.log(
        'damage area',
        damageArea,
        'Impact:',
        impactX,
        impactY
    );
}