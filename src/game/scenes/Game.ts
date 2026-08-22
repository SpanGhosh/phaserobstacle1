import * as Phaser from 'phaser';
import { EventBus } from '../EventBus.js';


// ============================================
// TYPES
// ============================================

type Player = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
};

type Ground = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.StaticBody;
};

type Obstacle = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
};

type GameState = {
    scene: Phaser.Scene;
    player: Player;
    ground: Ground;
    obstacles: Obstacle[];
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    jumpKey: Phaser.Input.Keyboard.Key;
    obstacleSpawner: Phaser.Time.TimerEvent;
};


// ============================================
// GAME LIFECYCLE
// ============================================

function create(this: Phaser.Scene) {
    const game = createGameState(this);

    setupCollision(game);
    setupInput(game);
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


// ============================================
// GAME STATE
// ============================================

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


// ============================================
// PLAYER
// ============================================

function createPlayer(scene: Phaser.Scene): Player {
    const player = scene.add.rectangle(
        200,
        600,
        50,
        70,
        0xff0000
    ) as Player;

    scene.physics.add.existing(player);

    player.body.setCollideWorldBounds(true);

    return player;
}


// ============================================
// GROUND
// ============================================

function createGround(scene: Phaser.Scene): Ground {
    const ground = scene.add.rectangle(
        512,
        700,
        1024,
        100,
        0x228b22
    ) as Ground;

    scene.physics.add.existing(ground, true);

    return ground;
}


// ============================================
// OBSTACLE
// ============================================

function createObstacle(scene: Phaser.Scene): Obstacle {
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

    scene.physics.add.existing(obstacle);

    obstacle.body.setAllowGravity(false);
    obstacle.body.setImmovable(true);
    obstacle.body.setVelocityX(-300);

    return obstacle;
}


// ============================================
// COLLISION
// ============================================

function setupCollision(game: GameState): void {
    game.scene.physics.add.collider(
        game.player,
        game.ground
    );
}
function setupObstacleCollision(
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

// ============================================
// INPUT
// ============================================

function setupInput(game: GameState): void {
    // Input is already created in createGameState().
}


// ============================================
// KEYBOARD
// ============================================

function setupCursors(
    scene: Phaser.Scene
): Phaser.Types.Input.Keyboard.CursorKeys {
    return scene.input.keyboard.createCursorKeys();
}


function setupJumpKey(
    scene: Phaser.Scene
): Phaser.Input.Keyboard.Key {
    return scene.input.keyboard.addKey('SPACE');
}


// ============================================
// PLAYER MOVEMENT
// ============================================

function handlePlayerMovement(game: GameState): void {
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

function handlePlayerJump(game: GameState): void {
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


// ============================================
// OBSTACLE
// ============================================
function setupObstacleSpawner(game: GameState): void {
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
function handleObstacles(game: GameState): void {
    for (const obstacle of game.obstacles) {
        if (obstacle.x < -100) {
            obstacle.destroy();
        }
    }

    game.obstacles = game.obstacles.filter(
        obstacle => obstacle.active
    );
}

function stopGame(game: GameState): void {
    game.obstacleSpawner.remove();
    game.obstacles.forEach(obstacle => obstacle.body.setVelocityX(0));
    console.log('GAME OVER');
}
// ============================================
// EXPORT
// ============================================

export {
    create,
    update
};